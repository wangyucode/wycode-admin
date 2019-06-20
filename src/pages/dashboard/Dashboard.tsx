import React from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Col, Row } from 'antd';
import Visitors from '@/components/dashboard/Visitors';
import AppUse from '@/components/dashboard/AppUse';
import Status from '@/components/dashboard/Status';
import ErrorTable from '@/components/dashboard/ErrorTable';
import BlogAccess from '@/components/dashboard/BlogAccess';

export default () => (
  <GridContent>
    <Row>
      <Col>
        <Status />
      </Col>
    </Row>
    <Row gutter={24}>
      <Col sm={24} md={12} xl={8} style={{ marginTop: 24 }}>
        <Visitors />
      </Col>
      <Col sm={24} md={12} xl={8} style={{ marginTop: 24 }}>
        <AppUse />
      </Col>
      <Col sm={24} md={12} xl={8} style={{ marginTop: 24 }}>
        <BlogAccess />
      </Col>
    </Row>
    <Row style={{ marginTop: 24 }}>
      <Col>
        <ErrorTable />
      </Col>
    </Row>
  </GridContent>
);
