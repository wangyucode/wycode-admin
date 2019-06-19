import { Effect } from 'dva';
import { Reducer } from 'redux';
import {
  queryAppUse,
  queryBlogAccess,
  queryErrorPath,
  queryGeos,
  queryVisitors,
} from '@/services/dashboard';

export interface VisitorData {
  time: string;
  uv: number;
  pv: number;
}

export interface UseData {
  app: string;
  use: number;
}

export interface ErrorData {
  path: string;
  method: string;
  count: number;
}

export interface GeoData {
  lat: number;
  lng: number;
  count: number;
}

export interface BlogAccessData {
  path: string;
  count: number;
}

export interface DashboardState {
  visitorData?: VisitorData[];
  useData?: UseData[];
  errorData?: ErrorData[];
  geoData?: GeoData[];
  blogAccessData?: BlogAccessData[];
}

export interface DashboardModelType {
  namespace: 'dashboard';
  state: DashboardState;
  effects: {
    fetchVisitors: Effect;
    fetchAppUse: Effect;
    fetchErrors: Effect;
    fetchGeos: Effect;
    fetchBlogAccess: Effect;
  };
  reducers: {
    saveVisitorData: Reducer<DashboardState>;
    saveAppUseData: Reducer<DashboardState>;
    saveErrorData: Reducer<DashboardState>;
    saveGeoData: Reducer<DashboardState>;
    saveBlogAccess: Reducer<DashboardState>;
  };
}

const DashboardModel: DashboardModelType = {
  namespace: 'dashboard',

  state: {
    visitorData: [],
    useData: [],
    errorData: [],
    geoData: [],
    blogAccessData: [],
  },

  effects: {
    *fetchVisitors(action, { call, put }) {
      const response = yield call(queryVisitors, action.payload);
      yield put({
        type: 'saveVisitorData',
        payload: response.data,
      });
    },
    *fetchAppUse(action, { call, put }) {
      const response = yield call(queryAppUse, action.payload);
      yield put({
        type: 'saveAppUseData',
        payload: response.data,
      });
    },
    *fetchErrors(action, { call, put }) {
      const response = yield call(queryErrorPath, action.payload);
      yield put({
        type: 'saveErrorData',
        payload: response.data,
      });
    },
    *fetchGeos(_, { call, put }) {
      const response = yield call(queryGeos);
      yield put({
        type: 'saveGeoData',
        payload: response.data,
      });
    },
    *fetchBlogAccess(action, { call, put }) {
      const response = yield call(queryBlogAccess, action.payload);
      yield put({
        type: 'saveBlogAccess',
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
    saveErrorData(state, action) {
      return {
        ...state,
        errorData: action.payload || [],
      };
    },
    saveGeoData(state, action) {
      return {
        ...state,
        geoData: action.payload || [],
      };
    },
    saveBlogAccess(state, action) {
      return {
        ...state,
        blogAccessData: action.payload || [],
      };
    },
  },
};

export default DashboardModel;
