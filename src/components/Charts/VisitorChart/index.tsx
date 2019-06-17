import React from 'react';
import { Axis, Chart, Geom, Tooltip, Legend } from 'bizcharts';
import styles from '../index.less';
import DataSet from '@antv/data-set';

export interface IAxis {
  title: any;
  line: any;
  gridAlign: any;
  labels: any;
  tickLine: any;
  grid: any;
  label: any;
}

export interface VisitorChartProps {
  height?: number;
  animate?: boolean;
  data: Array<{
    pv: number;
    uv: number;
    time: string;
  }>;
}

class VisitorChart extends React.Component<VisitorChartProps> {
  render() {
    const { height = 1, data = [], animate = true } = this.props;

    const padding: [number, number, number, number] = [24, 0, 64, 36];

    const dv = new DataSet.View().source(data);

    dv.transform({
      type: 'fold',
      fields: ['pv', 'uv'],
      key: 'type',
      value: 'value',
    });

    const scaleProps = {
      time: {
        type: 'cat',
      },
      value: {
        min: 0,
      },
    };

    return (
      <div className={styles.miniChart}>
        <div className={styles.chartContent}>
          {height > 0 && (
            <Chart
              animate={animate}
              scale={scaleProps}
              height={height}
              data={dv}
              padding={padding}
              forceFit
            >
              <Axis />
              <Legend />
              <Tooltip crosshairs />
              <Geom type="area" position="time*value" color="type" shape="smooth" />
              <Geom type="line" position="time*value" shape="smooth" color="type" size={2} />
            </Chart>
          )}
        </div>
      </div>
    );
  }
}

export default VisitorChart;
