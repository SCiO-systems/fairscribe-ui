/* eslint-disable camelcase */
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5radar from '@amcharts/amcharts5/radar';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const FairScoreMiniChart = ({ resourceId, data }) => {
	const chartId = `chart-${resourceId}`;
	console.log(resourceId, data, 'CHART');

	useLayoutEffect(() => {
		const root = am5.Root.new(chartId);

		// Set themes
		// https://www.amcharts.com/docs/v5/concepts/themes/
		root.setThemes([
			am5themes_Animated.new(root),
		]);

		const c = root.container.children.push(am5radar.RadarChart.new(root, {
			layout: root.verticalLayout,
			panX: false,
			panY: false,
			wheelX: 'panX',
			wheelY: 'zoomX',
			innerRadius: am5.percent(20),
			startAngle: -90,
			endAngle: 180,
		}));

		const dataWithColors = data.map((item, index) => {
			// eslint-disable-next-line no-param-reassign
			item.columnSettings = {
				fill: c.get('colors').getIndex(index),
			};

			return item;
		});
		// c.data = data;

		// Set number format
		// c.numberFormatter.numberFormat = '#.##';

		const xRenderer = am5radar.AxisRendererCircular.new(root, {
			// minGridDistance: 50
		});

		xRenderer.labels.template.setAll({
			radius: 10,
		});

		xRenderer.grid.template.setAll({
			forceHidden: true,
		});

		const xAxis = c.xAxes.push(am5xy.ValueAxis.new(root, {
			renderer: xRenderer,
			min: 0,
			max: 5,
			strictMinMax: true,
			numberFormat: '#\'',
			tooltip: am5.Tooltip.new(root, {}),
		}));

		const yRenderer = am5radar.AxisRendererRadial.new(root, {
			minGridDistance: 20,
		});

		yRenderer.labels.template.setAll({
			centerX: am5.p100,
			fontWeight: '500',
			fontSize: 18,
			templateField: 'columnSettings',
			text: 'FAIR',
		});

		yRenderer.grid.template.setAll({
			forceHidden: true,
		});

		const yAxis = c.yAxes.push(am5xy.CategoryAxis.new(root, {
			categoryField: 'category',
			renderer: yRenderer,
		}));

		yAxis.data.setAll(dataWithColors);

		const series1 = c.series.push(am5radar.RadarColumnSeries.new(root, {
			xAxis,
			yAxis,
			clustered: false,
			valueXField: 'full',
			categoryYField: 'category',
			fill: root.interfaceColors.get('alternativeBackground'),
		}));

		series1.columns.template.setAll({
			width: 20,
			fillOpacity: 0.08,
			strokeOpacity: 0,
			cornerRadius: 20,
		});

		series1.data.setAll(dataWithColors);

		const series2 = c.series.push(am5radar.RadarColumnSeries.new(root, {
			xAxis,
			yAxis,
			clustered: false,
			valueXField: 'value',
			categoryYField: 'category',
		}));

		series2.columns.template.setAll({
			width: am5.p100,
			strokeOpacity: 0,
			tooltipText: '{cat}\n [bold]{value}[/] / 5',
			cornerRadius: 20,
			templateField: 'columnSettings',
		});

		// series2.tooltip.disabled = true;

		series2.columns.template.adapters.add('fill', (fill, target) => {
			const index = data.findIndex((item) => item.cat === target.dataItem.dataContext.cat);
			switch (index) {
			case 0:
				return '#56d494';
			case 1:
				return '#72d2e2';
			case 2:
				return '#7b9ff5';
			case 3:
				return '#927ce1';
			default:
				return '#56d494';
			}
		});

		series2.columns.template.adapters.add('stroke', (fill, target) => {
			const index = data.findIndex((item) => item.cat === target.dataItem.dataContext.cat);
			switch (index) {
			case 0:
				return '#56d494';
			case 1:
				return '#72d2e2';
			case 2:
				return '#7b9ff5';
			case 3:
				return '#927ce1';
			default:
				return '#56d494';
			}
		});

		series2.data.setAll(dataWithColors);

		series1.appear(1000);
		series2.appear(1000);
		c.appear(1000, 100);
		// chart.current = c;

		return () => root.dispose();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div
			id={chartId}
			className="chart fair-score-mini"
			style={{ height: '120px', width: '120px' }}
		/>
	);
};

export default FairScoreMiniChart;
