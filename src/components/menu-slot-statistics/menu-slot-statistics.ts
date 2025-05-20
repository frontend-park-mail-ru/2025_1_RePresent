'use strict';

import './menu-slot-statistics.scss';

import { Component } from '../../modules/component';
import { InputSelect } from '../input-select/input-select';
import { LineChart } from '../line-chart/line-chart';

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
    private renderPlot() {
        // TODO: API call
        const randomData = function* (count: number) {
            for (let i = 1; i <= count; i++) {
                yield [i, Math.random() * 100] as [number, number];
            }
        };

        const metric = this.selectMetric.getValue() as string;
        const days = +this.selectPeriod.getValue();
        const metricToYLabel = {
            'shows': 'показы',
            'revenue': 'доход, руб.',
            'avg-show-price': 'ср. показ, руб.',
        } as Record<string, string>;

        const data = [...randomData(days)];
        const dataY = data.map(e => e[1]);
        const sum = Math.round(dataY.reduce((a, b) => a + b, 0));
        const avg = Math.round(sum / dataY.length);

        const aggregates = this.rootElement.querySelector('.aggregates') as HTMLElement;
        aggregates.innerHTML = `<p class="metric-avg">Среднее: ${avg}</p><p class="metric-sum">Сумма: ${sum}</p>`

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
                x: (n: number) => `${n}.05`,
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
                    value: 'shows',
                    label: 'Показы',
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
            defaultValue: 'shows',
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
