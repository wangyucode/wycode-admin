import * as React from 'react';
import { Card, Table } from 'antd';
import ConnectState, { Dispatch } from '@/models/connect';
import { connect } from 'dva';
import { ErrorData } from '@/models/dashboard';

interface ErrorTableProps {
  dispatch: Dispatch;
  errors: ErrorData[];
}

interface ErrorTableState {
  code: number;
}

const columns = [
  {
    title: 'Path',
    dataIndex: 'path',
    render: (text: string) => (
      <a href={text} target="_blank">
        {text}
      </a>
    ),
  },
  {
    title: 'Method',
    dataIndex: 'method',
  },
  {
    title: 'Count',
    dataIndex: 'count',
  },
];

class ErrorTable extends React.Component<ErrorTableProps, ErrorTableState> {
  state: ErrorTableState = {
    code: 500,
  };

  componentDidMount(): void {
    this.props.dispatch({ type: 'dashboard/fetchErrors', payload: this.state.code });
  }

  render() {
    return (
      <Card title={`错误统计（code = ${this.state.code}）`} bordered={false}>
        <Table columns={columns} dataSource={this.props.errors} />
      </Card>
    );
  }
}

function mapStateToProps(state: ConnectState) {
  return { errors: state.dashboard.errorData };
}

export default connect(mapStateToProps)(ErrorTable);
