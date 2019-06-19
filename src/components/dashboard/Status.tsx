import { Card } from 'antd';
import React from 'react';

export default () => (
  <Card bordered={false}>
    主站：
    <a href="https://travis-ci.com/wangyucode/wycode.cn" style={{ marginRight: 24 }}>
      <img src="https://travis-ci.com/wangyucode/wycode.cn.svg?branch=master" alt="主站" />
    </a>
    Admin：
    <a href="https://travis-ci.com/wangyucode/wycode-admin">
      <img src="https://travis-ci.com/wangyucode/wycode-admin.svg?branch=master" alt="Admin" />
    </a>
  </Card>
);
