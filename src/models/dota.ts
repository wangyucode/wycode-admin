import { Reducer } from 'redux';
import { Effect } from 'dva';
import { postVersion, queryHeros, queryVersion } from '@/services/dota';
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
  heroes?: Hero[];
}

export interface DotaModelType {
  namespace: 'dota';
  state: DotaState;
  effects: {
    fetchVersion: Effect;
    fetchHeroes: Effect;
    postVersion: Effect;
  };
  reducers: {
    saveVersion: Reducer<DotaState>;
    saveHeroes: Reducer<DotaState>;
  };
}

const DotaModel: DotaModelType = {
  namespace: 'dota',

  state: {
    version: { version: '', date: '' },
    heroes: [],
  },

  effects: {
    *fetchVersion(action, { call, put }) {
      const response = yield call(queryVersion);
      yield put({
        type: 'saveVersion',
        payload: response.data,
      });
    },
    *fetchHeroes(action, { call, put }) {
      const response = yield call(queryHeros);
      yield put({
        type: 'saveHeroes',
        payload: response.data,
      });
    },
    *postVersion(action, { call, put }) {
      const response = yield call(postVersion(action.payload));
      yield put({
        type: 'saveVersion',
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
    saveHeroes(state, action) {
      return {
        ...state,
        heroes: action.payload,
      };
    },
  },
};

export default DotaModel;
