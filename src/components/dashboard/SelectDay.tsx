import { Radio } from 'antd';
import * as React from 'react';
import { RadioChangeEvent } from 'antd/lib/radio';

export default (props: { onDayChange: (e: RadioChangeEvent) => void }) => (
  <Radio.Group defaultValue={30} onChange={props.onDayChange}>
    <Radio.Button value={30}>30天</Radio.Button>
    <Radio.Button value={7}>7天</Radio.Button>
    <Radio.Button value={1}>1天</Radio.Button>
  </Radio.Group>
);
