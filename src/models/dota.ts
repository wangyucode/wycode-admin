import { Reducer } from 'redux';
import { Effect } from 'dva';
import { queryHeros, queryVersion } from '@/services/dota';
import Version from '@/components/dota/Version';

interface Version {
  version: string;
  date: string;
}

export interface Hero {
  name: string;
  imageUrl: string;
  type: string;
  icon: string;
}

export interface DotaState {
  version?: Version;
  heros?: Hero[];
}

export interface DotaModelType {
  namespace: 'dota';
  state: DotaState;
  effects: {
    fetchVersion: Effect;
    fetchHeros: Effect;
  };
  reducers: {
    saveVersion: Reducer<DotaState>;
    saveHeros: Reducer<DotaState>;
  };
}

const DotaModel: DotaModelType = {
  namespace: 'dota',

  state: {
    version: { version: '', date: '' },
    heros: [],
  },

  effects: {
    *fetchVersion(action, { call, put }) {
      const response = yield call(queryVersion);
      yield put({
        type: 'saveVersion',
        payload: response.data,
      });
    },
    *fetchHeros(action, { call, put }) {
      const response = yield call(queryHeros);
      yield put({
        type: 'saveHeros',
        payload: response.data,
      });
    },
  },

  reducers: {
    saveVersion(state, action) {
      return {
        ...state,
        version: action.payload,
      };
    },
    saveHeros(state, action) {
      return {
        ...state,
        heros: action.payload,
      };
    },
  },
};

export default DotaModel;
