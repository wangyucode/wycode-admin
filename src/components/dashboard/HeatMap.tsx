import { Card } from 'antd';
import * as React from 'react';
import ConnectState, { Dispatch } from '@/models/connect';
import { connect } from 'dva';
import { GeoData } from '@/models/dashboard';

interface HeatMapProps {
  dispatch: Dispatch;
  geos: GeoData[];
}

interface HeatMapState {
  day: number;
}

class HeatMap extends React.Component<HeatMapProps, HeatMapState> {
  state: HeatMapState = {
    day: 7,
  };

  private heatmap?: any;
  private amapScript?: HTMLScriptElement;

  constructor(props: HeatMapProps) {
    super(props);
    // @ts-ignore
    window.amapInit = this.amapInit;
  }

  amapInit = () => {
    // @ts-ignore
    const AMap = window.AMap;
    const map = new AMap.Map('amap', { zoom: 3 });
    AMap.plugin('AMap.Heatmap', () => {
      //异步加载插件
      this.heatmap = new AMap.Heatmap({ map: map }); //在地图对象叠加热力图
      this.props.dispatch({ type: 'dashboard/fetchGeos', payload: this.state.day });
    });
  };

  componentDidMount(): void {
    const url =
      'https://webapi.amap.com/maps?v=1.4.15&key=53bf76432079c6110af3bfec54e3db8e&callback=amapInit';
    this.amapScript = document.createElement('script');
    this.amapScript.src = url;
    document.body.appendChild(this.amapScript);
  }

  componentWillUnmount(): void {
    if (this.amapScript) {
      document.body.removeChild(this.amapScript);
    }
  }

  componentWillReceiveProps(nextProps: Readonly<HeatMapProps>, nextContext: any): void {
    if (this.heatmap) {
      this.heatmap.setDataSet({ data: nextProps.geos, max: 100 });
    }
  }

  render() {
    return (
      <Card title={`访问IP热力图`} bordered={false}>
        <div id={'amap'} style={{ height: 320, width: '100%' }} />
      </Card>
    );
  }
}

function mapStateToProps(state: ConnectState) {
  return { geos: state.dashboard.geoData };
}

export default connect(mapStateToProps)(HeatMap);
