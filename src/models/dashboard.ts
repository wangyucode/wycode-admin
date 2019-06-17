import { Effect } from 'dva';
import { Reducer } from 'redux';
import { queryVisitors } from '@/services/dashboard';

export interface VisitorData {
  time: string;
  uv: number;
  pv: number;
}

export interface DashboardState {
  visitorData?: VisitorData[];
}

export interface DashboardModelType {
  namespace: 'dashboard';
  state: DashboardState;
  effects: {
    fetchVisitors: Effect;
  };
  reducers: {
    saveVisitorData: Reducer<DashboardState>;
  };
}

const DashboardModel: DashboardModelType = {
  namespace: 'dashboard',

  state: {
    visitorData: [],
  },

  effects: {
    *fetchVisitors(_, { call, put }) {
      const response = yield call(queryVisitors);
      yield put({
        type: 'saveVisitorData',
        payload: response.data,
      });
    },
  },

  reducers: {
    saveVisitorData(state, action) {
      return {
        ...state,
        visitorData: action.payload || {},
      };
    },
  },
};

export default DashboardModel;
