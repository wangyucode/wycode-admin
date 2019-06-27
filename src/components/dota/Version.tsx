import * as React from 'react';
import { connect } from 'dva';
import ConnectState, { Dispatch } from '@/models/connect';
import { Button, Card, Input } from 'antd';
import styles from './Version.less';

interface VersionProps {
  version: string;
  date: string;
  dispatch: Dispatch;
  loading: boolean;
  saving: boolean;
}

interface VersionState {
  editing: boolean;
  version: string;
}

const FetchActionType = 'dota/fetchVersion';
const SaveActionType = 'dota/SaveVersion';

class Version extends React.Component<VersionProps, VersionState> {
  state = {
    editing: false,
    version: this.props.version,
  };

  componentDidMount(): void {
    this.props.dispatch({ type: FetchActionType });
  }

  componentWillReceiveProps(nextProps: Readonly<VersionProps>, nextContext: any): void {
    const { version } = nextProps;
    this.setState({ version });
  }

  render() {
    const { date, loading, saving } = this.props;
    const { version, editing } = this.state;
    const buttonText = editing ? '保存' : '编辑';
    return (
      <Card bordered={false} loading={loading}>
        数据版本：
        <Input className={styles.version} value={version} disabled={!editing} />
        <span className={styles.date}>更新日期：{date}</span>
        <Button className={styles.edit} type="primary" loading={saving} onClick={this.editClicked}>
          {buttonText}
        </Button>
      </Card>
    );
  }

  editClicked = () => {
    if (this.state.editing) {
      this.save();
    } else {
      this.setState({ editing: true });
    }
  };

  save = () => {
    this.props.dispatch({ type: SaveActionType });
  };
}

function mapStateToProps(state: ConnectState) {
  if (!state.dota.version) {
    return {};
  }
  const { version, date } = state.dota.version;
  return {
    version,
    date,
    loading: state.loading.effects[FetchActionType],
    saving: state.loading.effects[SaveActionType],
  };
}

export default connect(mapStateToProps)(Version);
