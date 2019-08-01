import React from 'react';
import { Dispatch } from '@/models/connect';

interface DotaProps {
  loading: boolean;
  dispatch: Dispatch;
}

const ActionType = 'dota/fetchHeroDetail';

class DotaDetail extends React.Component<DotaProps> {
  componentDidMount(): void {
    this.props.dispatch({ type: ActionType });
  }

  render() {
    return <div>123</div>;
  }
}
