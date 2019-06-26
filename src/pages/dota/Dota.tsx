import React from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Row } from 'antd';
import Version from '@/components/dota/Version';
import HeroList from '@/components/dota/HeroList';
import ConnectState, { Dispatch } from '@/models/connect';
import { connect } from 'dva';
import { Hero } from '@/models/dota';

interface DotaProps {
  loading: boolean;
  strengthHeros: Hero[];
  intelliHeros: Hero[];
  agileHeros: Hero[];
  dispatch: Dispatch;
}

const ActionType = 'dota/fetchHeros';

class Dota extends React.Component<DotaProps> {
  componentDidMount(): void {
    this.props.dispatch({ type: ActionType });
  }

  render() {
    return (
      <GridContent>
        <Row>
          <Version />
        </Row>
        <Row style={{ marginTop: 24 }}>
          <HeroList title="力量型" heros={this.props.strengthHeros} loading={this.props.loading} />
        </Row>
        <Row style={{ marginTop: 24 }}>
          <HeroList title="智力型" heros={this.props.intelliHeros} loading={this.props.loading} />
        </Row>
        <Row style={{ marginTop: 24 }}>
          <HeroList title="敏捷型" heros={this.props.agileHeros} loading={this.props.loading} />
        </Row>
      </GridContent>
    );
  }
}

function mapStateToProps(state: ConnectState) {
  if (!state.dota.heros) {
    return {};
  }
  const strengthHeros: Hero[] = [];
  const intelliHeros: Hero[] = [];
  const agileHeros: Hero[] = [];
  state.dota.heros.map(hero => {
    if (hero.type === '力量') {
      strengthHeros.push(hero);
    } else if (hero.type === '智力') {
      intelliHeros.push(hero);
    } else if (hero.type === '敏捷') {
      agileHeros.push(hero);
    }
  });
  return {
    loading: state.loading.effects[ActionType],
    strengthHeros,
    intelliHeros,
    agileHeros,
  };
}

export default connect(mapStateToProps)(Dota);
