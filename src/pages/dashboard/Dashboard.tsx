import React from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Card, Col, Row } from 'antd';
import Visitors from '@/components/dashboard/Visitors';
import AppUse from '@/components/dashboard/AppUse';

export default () => (
  <GridContent>
    <Row gutter={24}>
      <Col span={12}>
        <Visitors />
      </Col>
      <Col span={8}>
        <AppUse />
      </Col>
      <Col span={4}>
        <Card title="状态" bordered={false}>
          <p>
            主站：
            <a href="https://travis-ci.com/wangyucode/wycode.cn">
              <img src="https://travis-ci.com/wangyucode/wycode.cn.svg?branch=master" alt="主站" />
            </a>
          </p>
          <p>
            Admin：
            <a href="https://travis-ci.com/wangyucode/wycode-admin">
              <img
                src="https://travis-ci.com/wangyucode/wycode-admin.svg?branch=master"
                alt="Admin"
              />
            </a>
          </p>
        </Card>
      </Col>
    </Row>
  </GridContent>
);
