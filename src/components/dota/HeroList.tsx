import { Card } from 'antd';
import * as React from 'react';

export default (props: { title: string; heros: {}[] }) => {
  return (
    <Card bordered={false} title={props.title}>
      heros
    </Card>
  );
};
