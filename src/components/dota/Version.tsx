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
  posting: boolean;
}

interface VersionState {
  editing: boolean;
  version: string;
}

const FetchActionType = 'dota/fetchVersion';
const PostActionType = 'dota/postVersion';

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
    this.setState({ version, editing: false });
  }

  render() {
    const { date, loading, posting } = this.props;
    const { version, editing } = this.state;
    const buttonText = editing ? '保存' : '编辑';
    return (
      <Card bordered={false} loading={loading}>
        数据版本：
        <Input className={styles.version} value={version} disabled={!editing} />
        <span className={styles.date}>更新日期：{date}</span>
        <Button className={styles.edit} type="primary" loading={posting} onClick={this.editClicked}>
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
    this.props.dispatch({ type: PostActionType, payload: this.state.version });
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
    posting: state.loading.effects[PostActionType],
  };
}

export default connect(mapStateToProps)(Version);
