import * as React from 'react';
import { Card, Select, Table } from 'antd';
import ConnectState, { Dispatch } from '@/models/connect';
import { connect } from 'dva';
import { ErrorData } from '@/models/dashboard';
import SelectDay from '@/components/dashboard/SelectDay';
import { RadioChangeEvent } from 'antd/lib/radio';

interface ErrorTableProps {
  dispatch: Dispatch;
  errors: ErrorData[];
  loading: boolean;
}

const ActionType = 'dashboard/fetchErrors';

class ErrorTable extends React.Component<ErrorTableProps> {
  code = 500;
  day = 30;

  onDayChange = (e: RadioChangeEvent) => {
    this.day = e.target.value;
    this.fetch();
  };

  onCodeChange = (value: number) => {
    this.code = value;
    this.fetch();
  };

  fetch() {
    const { day, code } = this;
    this.props.dispatch({ type: ActionType, payload: { day, code } });
  }

  cardRight = (
    <div>
      <SelectDay onDayChange={this.onDayChange} />
      <div style={{ marginLeft: 24, display: 'inline-block' }}>
        Code：
        <Select defaultValue={500} onChange={this.onCodeChange}>
          <Select.Option value={500}>500</Select.Option>
          <Select.Option value={400}>400</Select.Option>
          <Select.Option value={404}>404</Select.Option>
          <Select.Option value={403}>403</Select.Option>
        </Select>
      </div>
    </div>
  );

  columns = [
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

  componentDidMount(): void {
    this.fetch();
  }

  render() {
    return (
      <Card title={`错误统计`} bordered={false} extra={this.cardRight} loading={this.props.loading}>
        <Table
          columns={this.columns}
          dataSource={this.props.errors}
          rowKey={data => `${data.method}:${data.path}`}
        />
      </Card>
    );
  }
}

function mapStateToProps(state: ConnectState) {
  return {
    errors: state.dashboard.errorData,
    loading: state.loading.effects[ActionType],
  };
}

export default connect(mapStateToProps)(ErrorTable);
