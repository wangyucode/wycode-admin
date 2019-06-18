import { Card } from 'antd';
import React from 'react';

export default () => (
  <Card title="状态" bordered={false}>
    主站：
    <br />
    <a href="https://travis-ci.com/wangyucode/wycode.cn">
      <img src="https://travis-ci.com/wangyucode/wycode.cn.svg?branch=master" alt="主站" />
    </a>
    Admin：
    <br />
    <a href="https://travis-ci.com/wangyucode/wycode-admin">
      <img src="https://travis-ci.com/wangyucode/wycode-admin.svg?branch=master" alt="Admin" />
    </a>
  </Card>
);
