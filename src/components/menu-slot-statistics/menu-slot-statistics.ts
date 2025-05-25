'use strict';

import './menu-slot-statistics.scss';

import { Component } from '../../modules/component';
import { InputSelect } from '../input-select/input-select';
import { LineChart } from '../line-chart/line-chart';
import { AdvAPI } from '../../api/advApi';
import { store } from '../../modules/store';
import { Slot } from '../../api/slotApi';

/**
 * Меню ститистики слота
 */
export class MenuSlotStatistics extends Component {
    private selectMetric: InputSelect;
    private selectPeriod: InputSelect;
    private chart: LineChart;

    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'menu-slot-statistics/menu-slot-statistics', {});
    }

    /**
     * Отрисовка графика
     */
    private async renderPlot() {
        const metric = this.selectMetric.getValue() as string;
        const days = +this.selectPeriod.getValue();

        const from = new Date();
        from.setUTCDate(from.getUTCDate() - days);
        const response = await AdvAPI.getStats(
            {
                from: from,
                to: new Date(),
                activity: metric as 'click' | 'shown',
                slot: store.get<Slot>('selectedSlot').link,
            }
        );
        if (response.service.error) {
            alert('Не удалось получить статистику слота');
            return;
        }
        const dataRaw = Object.entries(response.body) as [string, string][];

        const noDataMsg = this.rootElement.querySelector('.no-data-msg');
        if (dataRaw.length < 2) {
            noDataMsg.classList.remove('hidden');
            return;
        }
        noDataMsg.classList.add('hidden');

        const data = dataRaw.map(e => [Date.parse(e[0]) / 1000, parseFloat(e[1])]) as [number, number][];
        const dataXtoLabel = Object.fromEntries(data.map((e, i) => [e[0], dataRaw[i][0]]));
        const dataY = data.map(e => e[1]);
        const sum = Math.round(dataY.reduce((a, b) => a + b, 0));
        const avg = Math.round(sum / dataY.length);

        const aggregates = this.rootElement.querySelector('.aggregates') as HTMLElement;
        aggregates.innerHTML = `<p class="metric-avg">Среднее: ${avg}</p><p class="metric-sum">Сумма: ${sum}</p>`

        const metricToYLabel = {
            'shown': 'показы',
            'click': 'клики',
            'revenue': 'доход, руб.',
            'avg-show-price': 'ср. показ, руб.',
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
                x: (days < 10) ? 1 : 5,
                y: 10,
            },
            dataLabelMap: {
                x: (n: number) => dataXtoLabel[n],
            },
        });
    }

    /**
     * Отрисовка
     */
    public render(): void {
        super.render();

        const options = this.rootElement.querySelector('.options') as HTMLElement;
        this.selectMetric = new InputSelect(options, {
            name: 'metric',
            label: 'Метрика',
            options: [
                {
                    value: 'shown',
                    label: 'Показы',
                },
                {
                    value: 'click',
                    label: 'Клики',
                },
                {
                    value: 'revenue',
                    label: 'Доход',
                },
                {
                    value: 'avg-show-price',
                    label: 'Ср. стоимость показа',
                },
            ],
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
