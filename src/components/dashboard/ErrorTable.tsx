import * as React from 'react';
import { Card, Radio, Table } from 'antd';
import ConnectState, { Dispatch } from '@/models/connect';
import { connect } from 'dva';
import { ErrorData } from '@/models/dashboard';
import SelectDay from '@/components/dashboard/SelectDay';
import { RadioChangeEvent } from 'antd/lib/radio';

interface ErrorTableProps {
  dispatch: Dispatch;
  errors: ErrorData[];
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

class ErrorTable extends React.Component<ErrorTableProps> {
  code = 500;
  day = 30;

  onDayChange = (e: RadioChangeEvent) => {
    this.day = e.target.value;
    this.fetch();
  };

  onCodeChange = (e: RadioChangeEvent) => {
    this.code = e.target.value;
    this.fetch();
  };

  fetch() {
    const { day, code } = this;
    this.props.dispatch({ type: 'dashboard/fetchErrors', payload: { day, code } });
  }

  cardRight = (
    <div>
      <SelectDay onDayChange={this.onDayChange} />
      <Radio.Group defaultValue={500} onChange={this.onCodeChange} style={{ marginLeft: 24 }}>
        <Radio.Button value={500}>code:500</Radio.Button>
        <Radio.Button value={400}>code:400</Radio.Button>
        <Radio.Button value={404}>code:404</Radio.Button>
        <Radio.Button value={403}>code:403</Radio.Button>
      </Radio.Group>
    </div>
  );

  componentDidMount(): void {
    this.fetch();
  }

  render() {
    return (
      <Card title={`错误统计`} bordered={false} extra={this.cardRight}>
        <Table
          columns={columns}
          dataSource={this.props.errors}
          rowKey={data => `${data.method}:${data.path}`}
        />
      </Card>
    );
  }
}

function mapStateToProps(state: ConnectState) {
  return { errors: state.dashboard.errorData };
}

export default connect(mapStateToProps)(ErrorTable);
