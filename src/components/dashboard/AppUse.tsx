import * as React from 'react';
import { Card } from 'antd';
import { connect } from 'dva';
import ConnectState, { Dispatch } from '@/models/connect';
import AppUsePie from '@/components/Charts/AppUsePie';
import SelectDay from '@/components/dashboard/SelectDay';
import { RadioChangeEvent } from 'antd/lib/radio';

interface AppUseProps {
  dispatch: Dispatch;
  useData: { app: string; use: number }[];
  loading: boolean;
}

const ActionType = 'dashboard/fetchAppUse';

class AppUse extends React.Component<AppUseProps> {
  day = 30;

  onDayChange = (e: RadioChangeEvent) => {
    this.day = e.target.value;
    this.props.dispatch({ type: ActionType, payload: this.day });
  };

  componentDidMount(): void {
    this.props.dispatch({ type: ActionType, payload: this.day });
  }

  render() {
    return (
      <Card
        title="应用分类"
        bordered={false}
        extra={<SelectDay onDayChange={this.onDayChange} />}
        loading={this.props.loading}
      >
        <AppUsePie hasLegend data={this.props.useData} height={256} lineWidth={4} inner={0.4} />
      </Card>
    );
  }
}

function mapStateToProps(state: ConnectState) {
  return {
    useData: state.dashboard.useData,
    loading: state.loading.effects[ActionType],
  };
}

export default connect(mapStateToProps)(AppUse);
