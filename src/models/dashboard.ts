import { Effect } from 'dva';
import { Reducer } from 'redux';
import { queryAppUse, queryVisitors } from '@/services/dashboard';

export interface VisitorData {
  time: string;
  uv: number;
  pv: number;
}

export interface UseData {
  app: string;
  use: number;
}

export interface DashboardState {
  visitorData?: VisitorData[];
  useData?: UseData[];
}

export interface DashboardModelType {
  namespace: 'dashboard';
  state: DashboardState;
  effects: {
    fetchVisitors: Effect;
    fetchAppUse: Effect;
  };
  reducers: {
    saveVisitorData: Reducer<DashboardState>;
    saveAppUseData: Reducer<DashboardState>;
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
    *fetchAppUse(_, { call, put }) {
      const response = yield call(queryAppUse);
      yield put({
        type: 'saveAppUseData',
        payload: response.data,
      });
    },
  },

  reducers: {
    saveVisitorData(state, action) {
      return {
        ...state,
        visitorData: action.payload || [],
      };
    },
    saveAppUseData(state, action) {
      return {
        ...state,
        useData: action.payload || [],
      };
    },
  },
};

export default DashboardModel;
