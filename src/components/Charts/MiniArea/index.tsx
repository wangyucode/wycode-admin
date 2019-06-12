import React from 'react';
import { Axis, Chart, Geom, Tooltip } from 'bizcharts';
import styles from '../index.less';

export interface IAxis {
  title: any;
  line: any;
  gridAlign: any;
  labels: any;
  tickLine: any;
  grid: any;
  label: any;
}

export interface IMiniAreaProps {
  color?: string;
  height?: number;
  borderColor?: string;
  line?: boolean;
  animate?: boolean;
  xAxis?: IAxis;
  forceFit?: boolean;
  scale?: { x?: any; y?: any };
  yAxis?: Partial<IAxis>;
  borderWidth?: number;
  data: Array<{
    x: number | string;
    y: number;
  }>;
}

class MiniArea extends React.Component<IMiniAreaProps> {
  render() {
    const {
      height = 1,
      data = [],
      forceFit = true,
      color = 'rgba(24, 144, 255, 0.2)',
      borderColor = '#1089ff',
      scale = { x: {}, y: {} },
      borderWidth = 2,
      line,
      xAxis,
      yAxis,
      animate = true,
    } = this.props;

    const padding: [number, number, number, number] = [0, 5, 48, 5];

    const scaleProps = {
      x: {
        type: 'cat',
        range: [0, 1],
        ...scale!.x,
      },
      y: {
        min: 0,
        ...scale!.y,
      },
    };

    const tooltip: [string, (...args: any[]) => { name?: string; value: string }] = [
      'x*y',
      (x: string, y: string) => ({
        name: x,
        value: y,
      }),
    ];

    return (
      <div className={styles.miniChart}>
        <div className={styles.chartContent}>
          {height > 0 && (
            <Chart
              animate={animate}
              scale={scaleProps}
              height={height}
              forceFit={forceFit}
              data={data}
              padding={padding}
            >
              <Axis
                key="axis-x"
                name="x"
                label={undefined}
                line={undefined}
                tickLine={undefined}
                grid={undefined}
                {...xAxis}
              />
              <Axis
                key="axis-y"
                name="y"
                label={undefined}
                line={undefined}
                tickLine={undefined}
                grid={undefined}
                {...yAxis}
              />
              <Tooltip showTitle={false} crosshairs={false} />
              <Geom
                type="area"
                position="x*y"
                color={color}
                tooltip={tooltip}
                shape="smooth"
                style={{
                  fillOpacity: 1,
                }}
              />
              {line ? (
                <Geom
                  type="line"
                  position="x*y"
                  shape="smooth"
                  color={borderColor}
                  size={borderWidth}
                  tooltip={false}
                />
              ) : (
                <span style={{ display: 'none' }} />
              )}
            </Chart>
          )}
        </div>
      </div>
    );
  }
}

export default MiniArea;
