'use strict';

import './line-chart.scss';

import { Component } from '../../modules/component';

/**
 * Интерфейс для описания параметров компонента
 */
interface LineChartProps {
    id: string;
    width: number;
    height: number;
    scale: number;
    padding: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    }
    data: Array<[number, number]>;
    axisLabels: {
        x: string;
        y: string;
    },
    gridInterval: {
        x: number;
        y: number;
    },
    dataLabelMap?: {
        x?: (n: number) => string,
        y?: (n: number) => string,
    },
}

/**
 * Линейный график
 */
export class LineChart extends Component {
    protected rootElement: HTMLCanvasElement;

    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'line-chart/line-chart', {});
    }

    /**
     * Отрисовка
     * @param {LineChartProps} props - параметры компонента
     */
    public render(props: LineChartProps): void {
        super.render(props);

        props.dataLabelMap ||= {};
        if (!props.dataLabelMap.x) {
            props.dataLabelMap.x = String;
        }
        if (!props.dataLabelMap.y) {
            props.dataLabelMap.y = String;
        }

        // Получение значения стилей #root
        const root = document.querySelector('#root');
        const rootStyles = getComputedStyle(root);

        const colorActivePrimary = rootStyles.getPropertyValue('--active-primary');
        const colorTextPrimary = rootStyles.getPropertyValue('--text-primary');
        const colorTextSecondary = rootStyles.getPropertyValue('--text-secondary');
        const font = rootStyles.getPropertyValue('font');

        // Настройка масштаба холста
        this.rootElement.style.aspectRatio = String(props.width / props.height);
        this.rootElement.width = props.width * props.scale;
        this.rootElement.height = props.height * props.scale;

        const ctx = this.rootElement.getContext('2d');
        ctx.clearRect(0, 0, this.rootElement.width, this.rootElement.height);

        if (props.data.length < 2) {
            throw new Error('Should be at least 2 data points');
        }

        // Инициализация основных размеров
        const frameWidth = props.width - props.padding.left - props.padding.right;
        const frameHeight = props.height - props.padding.top - props.padding.bottom;

        const xDataBegin = Math.floor(Math.min(...props.data.map(e => e[0])) / props.gridInterval.x) * props.gridInterval.x;
        const xDataEnd = Math.ceil(Math.max(...props.data.map(e => e[0])) / props.gridInterval.x) * props.gridInterval.x;
        const xDataScale = frameWidth / (xDataEnd - xDataBegin);

        const yDataBegin = Math.floor(Math.min(...props.data.map(e => e[1])) / props.gridInterval.y) * props.gridInterval.y;
        const yDataEnd = Math.ceil(Math.max(...props.data.map(e => e[1])) / props.gridInterval.y) * props.gridInterval.y;
        const yDataScale = frameHeight / (yDataEnd - yDataBegin);

        // Трансформация внутреннего уровня
        ctx.setTransform(props.scale, 0, 0, props.scale, (props.padding.left - xDataBegin * xDataScale) * props.scale, this.rootElement.height - (props.padding.bottom - yDataBegin * yDataScale) * props.scale);

        ctx.fillStyle = colorTextSecondary;
        ctx.strokeStyle = colorTextSecondary;

        // Линии сетки
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = xDataBegin; x <= xDataEnd; x += props.gridInterval.x) {
            ctx.moveTo(x * xDataScale, -yDataBegin * yDataScale);
            ctx.lineTo(x * xDataScale, -yDataEnd * yDataScale);
        }
        for (let y = yDataBegin; y <= yDataEnd; y += props.gridInterval.y) {
            ctx.moveTo(xDataBegin * xDataScale, -y * yDataScale);
            ctx.lineTo(xDataEnd * xDataScale, -y * yDataScale);
        }
        ctx.stroke();

        ctx.font = font;
        ctx.fillStyle = colorTextPrimary;
        ctx.strokeStyle = colorTextPrimary;

        // Оси X и Y
        const axisLabelDist = 30; // Расстояние между последней подписью и названием оси
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(xDataBegin * xDataScale, -yDataEnd * yDataScale - axisLabelDist);
        ctx.lineTo(xDataBegin * xDataScale, -yDataBegin * yDataScale);
        ctx.lineTo(xDataEnd * xDataScale + axisLabelDist, -yDataBegin * yDataScale);
        ctx.stroke();

        // Подписи осей
        const labelMargin = 5; // Расстояние между подписями и осью
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        for (let x = xDataBegin; x <= xDataEnd; x += props.gridInterval.x) {
            ctx.fillText(props.dataLabelMap.x(x), x * xDataScale, -yDataBegin * yDataScale + labelMargin);
        }
        ctx.textAlign = 'left';
        ctx.fillText(props.axisLabels.x, xDataEnd * xDataScale + axisLabelDist, -yDataBegin * yDataScale + labelMargin);
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        for (let y = yDataBegin; y <= yDataEnd; y += props.gridInterval.y) {
            ctx.fillText(props.dataLabelMap.y(y), xDataBegin * xDataScale - labelMargin, -y * yDataScale);
        }
        ctx.textBaseline = 'bottom';
        ctx.fillText(props.axisLabels.y, xDataBegin * xDataScale - labelMargin, -yDataEnd * yDataScale - axisLabelDist);

        ctx.fillStyle = colorActivePrimary;
        ctx.strokeStyle = colorActivePrimary;

        // Линия данных
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(props.data[0][0] * xDataScale, -props.data[0][1] * yDataScale);
        for (let i = 1; i < props.data.length; i++) {
            ctx.lineTo(props.data[i][0] * xDataScale, -props.data[i][1] * yDataScale);
            ctx.stroke();
        }

        // Точки данных
        const dotRadius = 7; // Радиус точки
        for (let i = 0; i < props.data.length; i++) {
            ctx.beginPath();
            ctx.arc(props.data[i][0] * xDataScale, -props.data[i][1] * yDataScale, dotRadius, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}
