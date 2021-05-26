import React, { useRef, useLayoutEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
// eslint-disable-next-line
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

const FairScoreMiniChart = ({ resourceId, data }) => {
  const chart = useRef(null);
  const chartId = `chart-${resourceId}`;

  useLayoutEffect(() => {
    am4core.useTheme(am4themes_animated);

    const c = am4core.create(chartId, am4charts.RadarChart);
    c.data = data;
    // Make chart not full circle
    c.startAngle = -90;
    c.endAngle = 180;
    c.innerRadius = am4core.percent(20);

    // Set number format
    c.numberFormatter.numberFormat = '#.##';

    // Create axes
    const categoryAxis = c.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.labels.template.horizontalCenter = 'right';
    categoryAxis.renderer.labels.template.fontWeight = 500;

    categoryAxis.renderer.labels.template.fontSize = '0em';

    categoryAxis.renderer.labels.template.adapter.add(
      'fill',
      (fill, target) => '#08429e',
    );
    categoryAxis.renderer.minGridDistance = 10;

    const label = c.createChild(am4core.Label);
    label.text = 'FAIR';
    label.fontSize = 12;
    label.align = 'left';
    label.isMeasured = false;
    label.x = 0;
    label.y = 12;

    const valueAxis = c.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.max = 5;
    valueAxis.renderer.labels.template.fontSize = '0em';

    // Create series
    const series1 = c.series.push(new am4charts.RadarColumnSeries());
    series1.dataFields.valueX = 'full';
    series1.dataFields.categoryY = 'category';
    series1.clustered = false;
    series1.columns.template.fill = new am4core.InterfaceColorSet().getFor(
      'alternativeBackground',
    );
    series1.columns.template.fillOpacity = 0.08;
    series1.columns.template.cornerRadiusTopLeft = 20;
    series1.columns.template.strokeWidth = 0;
    series1.columns.template.radarColumn.cornerRadius = 20;

    const series2 = c.series.push(new am4charts.RadarColumnSeries());
    series2.dataFields.valueX = 'value';
    series2.dataFields.categoryY = 'category';
    series2.clustered = false;
    series2.columns.template.strokeWidth = 0;
    series2.columns.template.tooltipText = '{cat}\n [bold]{value}[/] / 5';
    series2.columns.template.radarColumn.cornerRadius = 20;
    series2.tooltip.disabled = true;
    series2.columns.template.adapter.add('fill', (fill, target) => {
      switch (target.dataItem.index) {
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

    chart.current = c;

    return () => {
      c.dispose();
    };
  }, []);

  return <div id={chartId} style={{ width: '120px', height: '120px' }} />;
};

export default FairScoreMiniChart;
