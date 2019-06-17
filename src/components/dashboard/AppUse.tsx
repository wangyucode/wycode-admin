import * as React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';
import ConnectState, { Dispatch } from '@/models/connect';
import Pie from '@/components/Charts/Pie';

interface AppUseProps {
  dispatch: Dispatch;
  useData: { app: string; use: number }[];
}

interface AppUseState {
  day: number;
}

class AppUse extends React.Component<AppUseProps, AppUseState> {
  state: AppUseState = {
    day: 30,
  };

  componentDidMount(): void {
    this.props.dispatch({ type: 'dashboard/fetchAppUse', payload: this.state.day });
  }

  render() {
    return (
      <Card title="分类" bordered={false}>
        <Pie hasLegend data={this.props.useData} height={256} lineWidth={4} />
      </Card>
    );
  }
}

function mapStateToProps(state: ConnectState) {
  return { useData: state.dashboard.useData };
}

export default connect(mapStateToProps)(AppUse);
