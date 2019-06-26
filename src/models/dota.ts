import { Reducer } from 'redux';
import { Effect } from 'dva';
import { queryVersion } from '@/services/dota';
import Version from '@/components/dota/Version';

interface Version {
  version: string;
  date: string;
}

export interface DotaState {
  version: Version;
}

export interface DotaModelType {
  namespace: 'dota';
  state: DotaState;
  effects: {
    fetchVersion: Effect;
  };
  reducers: {
    saveVersion: Reducer<DotaState>;
  };
}

const DotaModel: DotaModelType = {
  namespace: 'dota',

  state: {
    version: Version,
  },

  effects: {
    *fetchVersion(action, { call, put }) {
      const response = yield call(queryVersion);
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
        version: action.payload || '',
      };
    },
  },
};

export default DotaModel;
