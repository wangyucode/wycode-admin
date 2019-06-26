import * as React from 'react';
import { connect } from 'dva';
import ConnectState, { Dispatch } from '@/models/connect';
import { Card } from 'antd';

interface VersionProps {
  version: string;
  date: string;
  dispatch: Dispatch;
  loading: boolean;
}

const ActionType = 'dota/fetchVersion';

class Version extends React.Component<VersionProps> {
  componentDidMount(): void {
    this.props.dispatch({ type: ActionType });
  }

  render() {
    const { version, date, loading } = this.props;
    return (
      <Card bordered={false} loading={loading}>
        数据版本：{version}
        <span style={{ marginLeft: 12 }}>更新日期：{date}</span>
      </Card>
    );
  }
}

function mapStateToProps(state: ConnectState) {
  return {
    version: state.dota.version.version,
    date: state.dota.version.date,
    loading: state.loading.effects[ActionType],
  };
}

export default connect(mapStateToProps)(Version);
