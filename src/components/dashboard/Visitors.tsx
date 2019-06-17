import * as React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';
import ConnectState, { Dispatch } from '@/models/connect';
import VisitorChart from '@/components/Charts/VisitorChart';
import Trend from '@/components/Trend';
import { VisitorData } from '@/models/dashboard';

interface VisitorsProps {
  dispatch: Dispatch;
  visitData: VisitorData[];
}

interface VisitorsState {
  day: number;
  yesterdayPv: number;
  yesterdayUv: number;
  pvUp: boolean;
  uvUp: boolean;
}

class Visitors extends React.Component<VisitorsProps, VisitorsState> {
  state: VisitorsState = {
    day: 30,
    yesterdayPv: 0,
    yesterdayUv: 0,
    pvUp: true,
    uvUp: true,
  };

  componentDidMount(): void {
    this.props.dispatch({ type: 'dashboard/fetchVisitors', payload: this.state.day });
  }

  componentWillReceiveProps(nextProps: Readonly<VisitorsProps>, nextContext: any): void {
    const { visitData } = nextProps;
    const length = visitData.length;
    if (this.state.day > 7) {
      if (length >= 2) {
        this.setState({
          yesterdayPv: visitData[length - 2].pv,
          yesterdayUv: visitData[length - 2].uv,
        });
      }
      if (length >= 3) {
        this.setState({
          pvUp: visitData[length - 2].pv > visitData[length - 3].pv,
          uvUp: visitData[length - 2].uv > visitData[length - 3].uv,
        });
      }
    }
  }

  render() {
    return (
      <Card title="访问量" bordered={false}>
        <Trend flag={this.state.pvUp ? 'up' : 'down'} style={{ marginRight: 16 }}>
          <span>昨日PV：{this.state.yesterdayPv}</span>
        </Trend>
        <Trend flag={this.state.uvUp ? 'up' : 'down'}>
          <span>昨日PV：{this.state.yesterdayUv}</span>
        </Trend>
        <VisitorChart data={this.props.visitData} height={348} />
      </Card>
    );
  }
}

function mapStateToProps(state: ConnectState) {
  return { visitData: state.dashboard.visitorData };
}

export default connect(mapStateToProps)(Visitors);
