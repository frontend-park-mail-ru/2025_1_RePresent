'use strict';

import './menu-banner-slot-statistics.scss';

import { Component, Props } from '../../modules/component';
import { InputSelect } from '../input-select/input-select';
import { LineChart } from '../line-chart/line-chart';
import { AdvAPI } from '../../api/advApi';
import { store } from '../../modules/store';
import { Slot } from '../../api/slotApi';
import { Banner } from '../../api/bannerApi';
import { reAlert } from '../../modules/re-alert';
import { Profile } from '../../api/profileApi';

/**
 * Интерфейс для описания параметров компонента
 */
export interface MenuBannerSlotStatisticsProps extends Props {
    type: 'banner' | 'slot';
}

/**
 * Меню ститистики баннера/слота
 */
export class MenuBannerSlotStatistics extends Component {
    protected props: MenuBannerSlotStatisticsProps;
    private selectMetric: InputSelect;
    private selectPeriod: InputSelect;
    private chart: LineChart;

    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'menu-banner-slot-statistics/menu-banner-slot-statistics', {});
    }

    /**
     * Отрисовка графика
     */
    private async renderPlot() {
        const metric = this.selectMetric.getValue() as string;
        const days = +this.selectPeriod.getValue();

        const from = new Date();
        from.setUTCDate(from.getUTCDate() - days);
        const to = new Date();
        to.setUTCDate(to.getUTCDate() + 1);
        const response = await AdvAPI.getStats(
            {
                from: from,
                to: to,
                activity: metric,
                banner: (this.props.type == 'banner') ? store.get<Banner>('selectedBanner').id : undefined,
                slot: (this.props.type == 'slot') ? store.get<Slot>('selectedSlot').link : undefined,
            }
        );
        if (response.service.error) {
            reAlert({
                message: 'Не удалось получить статистику',
                type: 'error',
                lifetimeS: '5',
            });
            return;
        }
        const dataRaw = Object.entries(response.body) as [string, string][];

        const noDataMsg = this.rootElement.querySelector('.no-data-msg');
        const aggregates = this.rootElement.querySelector('.aggregates');
        const chart = this.rootElement.querySelector('#chart');
        if (dataRaw.length < 2) {
            noDataMsg.classList.remove('hidden');
            aggregates.innerHTML = '';
            chart?.classList.add('hidden');
            return;
        }
        noDataMsg.classList.add('hidden');

        const msInDay = 24 * 60 * 60 * 1000;
        let data = dataRaw.map(e => [Date.parse(e[0]) / msInDay, parseFloat(e[1])]) as [number, number][];
        if (metric == 'ctr') {
            data = data.map(e => [e[0], e[1] * 100]);
        }
        const dataXtoLabel = Object.fromEntries(data.map((e, i) => {
            const date = new Date(e[0] * msInDay);
            return [e[0], `${('0' + date.getDate()).slice(-2)}.${('0' + (date.getMonth() + 1)).slice(-2)}`];
        }));
        const dataY = data.map(e => e[1]);
        const rangeY = Math.max(...dataY) - Math.min(...dataY);
        const roundCoef = 100;
        const sum = Math.round(dataY.reduce((a, b) => a + b, 0) * roundCoef) / roundCoef;
        const avg = Math.round(sum / dataY.length * roundCoef) / roundCoef;

        if (metric == 'ctr' || metric == 'avg-show-price') {
            aggregates.innerHTML = `<p class="metric-avg">Среднее: ${avg}</p>`;
        } else {
            aggregates.innerHTML = `<p class="metric-avg">Среднее: ${avg}</p><p class="metric-sum">Сумма: ${sum}</p>`;
        }

        const metricToYLabel = {
            'shown': 'показы',
            'click': 'клики',
            'ctr': 'CTR, %',
            'expenses': 'расходы, руб.',
            'avg-show-price': 'ср. показ, руб.',
            'revenue': 'доход, руб.',
        } as Record<string, string>;

        this.chart.render({
            id: 'chart',
            width: 1000,
            height: 300,
            scale: 3,
            padding: {
                left: 120,
                bottom: 30,
                right: 100,
                top: 50,
            },
            data,
            axisLabels: {
                x: 'дата',
                y: metricToYLabel[metric],
            },
            gridInterval: {
                x: (data.length < 10) ? 1 : 5,
                y: Math.max(1, 10 ** Math.floor(Math.log10(rangeY))),
            },
            dataLabelMap: {
                x: (n: number) => dataXtoLabel[n],
            },
        });

        chart?.classList.remove('hidden');
    }

    /**
     * Отрисовка
     * @param {MenuBannerSlotStatisticsProps} props - параметры компонента
     */
    public render(props: MenuBannerSlotStatisticsProps): void {
        if (store.get<Banner>('selectedBanner')?.beingCreated || store.get<Slot>('selectedSlot')?.beingCreated) {
            return;
        }

        super.render(props);

        const options = this.rootElement.querySelector('.options') as HTMLElement;
        const role = store.get<Profile>('profile').role;
        const commonMetrics = [
            {
                value: 'shown',
                label: 'Показы',
            },
            {
                value: 'click',
                label: 'Клики',
            },
            {
                value: 'ctr',
                label: 'CTR = клики / показы',
            },
        ];
        this.selectMetric = new InputSelect(options, {
            name: 'metric',
            label: 'Метрика',
            options: (role == 1) ? commonMetrics.concat([
                {
                    value: 'expenses',
                    label: 'Расходы',
                },
            ]) : commonMetrics.concat([
                {
                    value: 'avg-show-price',
                    label: 'Ср. стоимость показа',
                },
                {
                    value: 'revenue',
                    label: 'Доход',
                },
            ]),
            defaultValue: 'shown',
        });
        this.selectMetric.render();

        this.selectPeriod = new InputSelect(options, {
            name: 'period',
            label: 'Временной промежуток',
            options: [
                {
                    value: '7',
                    label: 'Неделя',
                },
                {
                    value: '30',
                    label: 'Месяц',
                },
            ],
            defaultValue: '7',
        });
        this.selectPeriod.render();

        this.chart = new LineChart(this.rootElement);

        this.selectMetric.inputElement.onchange = this.selectPeriod.inputElement.onchange = this.renderPlot.bind(this);

        this.renderPlot();
    }
}
