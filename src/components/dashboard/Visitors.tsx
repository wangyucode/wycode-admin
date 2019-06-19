import * as React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';
import ConnectState, { Dispatch } from '@/models/connect';
import VisitorChart from '@/components/Charts/VisitorChart';
import Trend from '@/components/Trend';
import { VisitorData } from '@/models/dashboard';
import { RadioChangeEvent } from 'antd/lib/radio';
import SelectDay from '@/components/dashboard/SelectDay';

interface VisitorsProps {
  dispatch: Dispatch;
  visitData: VisitorData[];
}

class Visitors extends React.Component<VisitorsProps> {
  day = 30;
  yesterdayPv: number = 0;
  yesterdayUv: number = 0;
  pvUp: boolean = false;
  uvUp: boolean = false;

  onDayChange = (e: RadioChangeEvent) => {
    this.day = e.target.value;
    this.props.dispatch({ type: 'dashboard/fetchVisitors', payload: this.day });
  };

  componentDidMount(): void {
    this.props.dispatch({ type: 'dashboard/fetchVisitors', payload: this.day });
  }

  render() {
    const { visitData } = this.props;
    const length = visitData.length;

    if (this.day > 7) {
      if (length >= 2) {
        this.yesterdayPv = visitData[length - 2].pv;
        this.yesterdayUv = visitData[length - 2].uv;
      }
      if (length >= 3) {
        this.pvUp = visitData[length - 2].pv > visitData[length - 3].pv;
        this.uvUp = visitData[length - 2].uv > visitData[length - 3].uv;
      }
    }
    return (
      <Card title="访问量" bordered={false} extra={<SelectDay onDayChange={this.onDayChange} />}>
        <Trend flag={this.pvUp ? 'up' : 'down'} style={{ marginRight: 16 }}>
          <span>昨日PV：{this.yesterdayPv}</span>
        </Trend>
        <Trend flag={this.uvUp ? 'up' : 'down'}>
          <span>昨日UV：{this.yesterdayUv}</span>
        </Trend>
        <VisitorChart data={this.props.visitData} height={235} />
      </Card>
    );
  }
}

function mapStateToProps(state: ConnectState) {
  return { visitData: state.dashboard.visitorData };
}

export default connect(mapStateToProps)(Visitors);
