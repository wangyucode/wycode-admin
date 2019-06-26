import React from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Row } from 'antd';
import Version from '@/components/dota/Version';
import HeroList from '@/components/dota/HeroList';

class Dota extends React.Component {
  render() {
    return (
      <GridContent>
        <Row>
          <Version />
        </Row>
        <Row style={{ marginTop: 24 }}>
          <HeroList title="力量型" heros={[]} />
        </Row>
        <Row style={{ marginTop: 24 }}>
          <HeroList title="智力型" heros={[]} />
        </Row>
        <Row style={{ marginTop: 24 }}>
          <HeroList title="敏捷型" heros={[]} />
        </Row>
      </GridContent>
    );
  }
}

export default Dota;
