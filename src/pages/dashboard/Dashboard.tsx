import React from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Col, Row } from 'antd';
import Visitors from '@/components/dashboard/Visitors';
import AppUse from '@/components/dashboard/AppUse';
import Status from '@/components/dashboard/Status';
import ErrorTable from '@/components/dashboard/ErrorTable';
import HeatMap from '@/components/dashboard/HeatMap';

export default () => (
  <GridContent>
    <Row gutter={24}>
      <Col span={12}>
        <Visitors />
      </Col>
      <Col span={9}>
        <AppUse />
      </Col>
      <Col span={3}>
        <Status />
      </Col>
    </Row>
    <Row gutter={24} style={{ marginTop: 24 }}>
      <Col span={12}>
        <ErrorTable />
      </Col>
      <Col span={8}>
        <HeatMap />
      </Col>
    </Row>
  </GridContent>
);
