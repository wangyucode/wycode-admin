import ConnectState, { Dispatch } from '@/models/connect';
import * as React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';
import { Chart, Geom, Tooltip } from 'bizcharts';
import DataSet from '@antv/data-set';

interface BlogAccessProps {
  dispatch: Dispatch;
  blogAccessData: { path: string; use: number }[];
}

interface BlogAccessState {
  day: number;
}

class BlogAccess extends React.Component<BlogAccessProps, BlogAccessState> {
  state: BlogAccessState = {
    day: 30,
  };

  componentDidMount(): void {
    this.props.dispatch({ type: 'dashboard/fetchBlogAccess', payload: this.state.day });
  }

  render() {
    const tree = { name: 'root', children: this.props.blogAccessData };
    const dv = new DataSet.View()
      .source(tree, {
        type: 'hierarchy',
      })
      .transform({
        field: 'count',
        type: 'hierarchy.treemap',
        tile: 'treemapResquarify',
        as: ['x', 'y'],
      });

    const nodes = dv.getAllNodes();
    nodes.map((node: { name: string; data: { path: string; count: number }; value: any }) => {
      node.name = node.data.path;
      node.value = node.data.count;
      return node;
    });

    const scale = {
      value: {
        nice: false,
      },
    };

    const tooltip: [string, (...args: any[]) => { name?: string; value: string }] = [
      'name*value',
      (name: string, value: string) => {
        return {
          name,
          value: `访问量：${value}`,
        };
      },
    ];

    return (
      <Card title="博客访问" bordered={false}>
        <Chart
          animate={false}
          height={256}
          data={nodes}
          scale={scale}
          forceFit
          padding={[1, 1, 1, 1]}
        >
          <Tooltip showTitle={false} />
          <Geom
            type="polygon"
            position="x*y"
            color="name"
            style={{ lineWidth: 1, stroke: '#fff' }}
            tooltip={tooltip}
          />
        </Chart>
      </Card>
    );
  }
}

function mapStateToProps(state: ConnectState) {
  return { blogAccessData: state.dashboard.blogAccessData };
}

export default connect(mapStateToProps)(BlogAccess);
