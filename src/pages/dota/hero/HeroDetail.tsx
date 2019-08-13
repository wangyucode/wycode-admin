import React from 'react';
import ConnectState, { Dispatch } from '@/models/connect';
import { connect } from 'dva';
import { match } from 'react-router';
import { Card, Form, Input } from 'antd';
import { DotaState, Hero } from '@/models/dota';
import { FetchList } from '@/pages/dota/Dota';

interface HeroDetailProps {
  loading: boolean;
  match: match & { params: { name: string } };
  location: Location & { state?: Hero };
  dota: DotaState;
  fetchList: Function;
  fetchDetail: (name: string) => void;
}

interface HeroDetailState {
  clickedHero?: Hero;
}

const FetchDetail = 'dota/fetchHeroDetail';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

function mapStateToProps({ dota }: ConnectState) {
  return { dota: dota };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetchList: () => dispatch({ type: FetchList }),
    fetchDetail: (name: string) => dispatch({ type: FetchDetail, payload: name }),
  };
}

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class HeroDetail extends React.Component<HeroDetailProps, HeroDetailState> {
  state: HeroDetailState = {};

  componentDidMount(): void {
    const { location, dota } = this.props;
    const name = this.props.match.params.name;
    let clickedHero = location.state;
    if (!clickedHero && dota.heroes) {
      clickedHero = dota.heroes.find(item => item.name === name);
    }
    if (clickedHero) {
      this.setState({ clickedHero: clickedHero });
    } else {
      this.props.fetchList();
    }

    this.props.fetchDetail(name);
  }

  componentWillReceiveProps(nextProps: Readonly<HeroDetailProps>, nextContext: any): void {
    if (!this.state.clickedHero && nextProps.dota.heroes) {
      const clickedHero = nextProps.dota.heroes.find(
        item => item.name === this.props.match.params.name,
      );
      this.setState({ clickedHero: clickedHero });
    }
  }

  render() {
    const { dota } = this.props;
    if (dota.currentHero && this.state.clickedHero) {
      const { otherName } = dota.currentHero;
      const { imageUrl, icon, name } = this.state.clickedHero;
      return (
        <Card>
          <Form layout="horizontal">
            <Form.Item label={<img src={imageUrl} alt={'image'} />} {...formItemLayout}>
              <Input value={imageUrl} />
            </Form.Item>
            <Form.Item label={<img src={icon} alt={'icon'} />} {...formItemLayout}>
              <Input value={icon} />
            </Form.Item>
            <Form.Item label={'名字'} {...formItemLayout}>
              <Input value={name} />
            </Form.Item>
            <Form.Item label={'其它名称'} {...formItemLayout}>
              <Input value={otherName} />
            </Form.Item>
          </Form>
        </Card>
      );
    } else {
      return <Card loading />;
    }
  }
}

export default HeroDetail;
