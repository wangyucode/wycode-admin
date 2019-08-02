import React from 'react';
import { Dispatch } from '@/models/connect';
import { connect } from 'dva';
import { match } from 'react-router';

interface DotaProps {
  loading: boolean;
  dispatch: Dispatch;
  match: match;
}

const ActionType = 'dota/fetchHeroDetail';

class DotaDetail extends React.Component<DotaProps> {
  componentDidMount(): void {
    this.props.dispatch({ type: ActionType });
    console.log(this.props.match.params);
  }

  render() {
    return <div>123</div>;
  }
}

export default connect()(DotaDetail);
