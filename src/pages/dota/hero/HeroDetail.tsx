import React from 'react';
import ConnectState, { Dispatch } from '@/models/connect';
import { connect } from 'dva';
import { match } from 'react-router';
import { Col, Row, Typography } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import { DotaState, Hero } from '@/models/dota';

const { Title } = Typography;

interface DotaDetailProps {
  loading: boolean;
  dispatch: Dispatch;
  match: match & { params: { name: string } };
  location: Location & { state?: Hero };
  dota: DotaState;
}

interface DotaDetailState {
  clickedHero?: Hero;
}

const ActionType = 'dota/fetchHeroDetail';

@connect(({ dota, loading }: ConnectState) => ({
  loading: loading.effects.fetchHeroDetail,
  dota: dota,
}))
class DotaDetail extends React.Component<DotaDetailProps, DotaDetailState> {
  componentDidMount(): void {
    const { location, dota } = this.props;
    const name = this.props.match.params.name;
    let clickedHero = location.state;
    if (!clickedHero && dota.heroes) {
      clickedHero = dota.heroes.find(item => item.name === name);
    }
    this.setState({ clickedHero: clickedHero });
    this.props.dispatch({ type: ActionType, payload: name });
  }

  render() {
    if (!this.state || !this.state.clickedHero || !this.props.dota.currentHero) {
      return false;
    }
    const { otherName } = this.props.dota.currentHero;
    const { imageUrl, icon, name } = this.state.clickedHero;
    return (
      <GridContent>
        <Row gutter={24}>
          <Col>
            <img src={imageUrl} />
          </Col>
          <Col>
            <Title>
              <img src={icon} />
              {name}
            </Title>
            <Title level={2}>{otherName}</Title>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default DotaDetail;
