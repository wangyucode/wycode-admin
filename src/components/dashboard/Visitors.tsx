import * as React from 'react';
import MiniArea from '@/components/Charts/MiniArea';
import { Card } from 'antd';
import { connect } from 'dva';
import ConnectState, { Dispatch } from '@/models/connect';

const visitData = [
  { x: '2019-06-12', y: 7 },
  { x: '2019-06-13', y: 5 },
  {
    x: '2019-06-14',
    y: 4,
  },
  { x: '2019-06-15', y: 2 },
  { x: '2019-06-16', y: 4 },
  { x: '2019-06-17', y: 7 },
  {
    x: '2019-06-18',
    y: 5,
  },
  { x: '2019-06-19', y: 6 },
  { x: '2019-06-20', y: 5 },
  { x: '2019-06-21', y: 9 },
  {
    x: '2019-06-22',
    y: 6,
  },
  { x: '2019-06-23', y: 3 },
  { x: '2019-06-24', y: 1 },
  { x: '2019-06-25', y: 5 },
  {
    x: '2019-06-26',
    y: 3,
  },
  { x: '2019-06-27', y: 6 },
  { x: '2019-06-28', y: 5 },
];

interface VisitorsProps {
  dispatch: Dispatch;
  visitData: [];
}

class Visitors extends React.Component<VisitorsProps, any> {
  componentDidMount(): void {
    this.props.dispatch({ type: 'dashboard/fetchVisitors' });
  }

  render():
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | string
    | number
    | {}
    | React.ReactNodeArray
    | React.ReactPortal
    | boolean
    | null
    | undefined {
    return (
      <Card title="访问量" bordered={false}>
        <MiniArea line data={visitData} height={256} />
      </Card>
    );
  }
}

function mapStateToProps(state: ConnectState) {
  return { visitData: state.dashboard.visitorData };
}

export default connect(mapStateToProps)(Visitors);
