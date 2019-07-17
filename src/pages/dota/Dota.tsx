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
  strengthHeroes: Hero[];
  intelligentHeroes: Hero[];
  agileHeroes: Hero[];
  dispatch: Dispatch;
}

const ActionType = 'dota/fetchHeroes';

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
          <HeroList title="力量型" heros={this.props.strengthHeroes} loading={this.props.loading} />
        </Row>
        <Row style={{ marginTop: 24 }}>
          <HeroList
            title="智力型"
            heros={this.props.intelligentHeroes}
            loading={this.props.loading}
          />
        </Row>
        <Row style={{ marginTop: 24 }}>
          <HeroList title="敏捷型" heros={this.props.agileHeroes} loading={this.props.loading} />
        </Row>
      </GridContent>
    );
  }
}

function mapStateToProps(state: ConnectState) {
  if (!state.dota.heroes) {
    return {};
  }
  const strengthHeroes: Hero[] = [];
  const intelligentHeroes: Hero[] = [];
  const agileHeroes: Hero[] = [];
  state.dota.heroes.map(hero => {
    if (hero.type === '力量') {
      strengthHeroes.push(hero);
    } else if (hero.type === '智力') {
      intelligentHeroes.push(hero);
    } else if (hero.type === '敏捷') {
      agileHeroes.push(hero);
    }
  });
  return {
    loading: state.loading.effects[ActionType],
    strengthHeroes,
    intelligentHeroes,
    agileHeroes,
  };
}

export default connect(mapStateToProps)(Dota);
