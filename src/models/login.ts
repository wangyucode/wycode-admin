import { routerRedux } from 'dva/router';
import { getPageQuery } from '@/utils/utils';
import { login } from '@/services/login';
import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';

export interface LoginStateType {
  error?: string;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: LoginStateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: LoginStateType;
  effects: {
    login: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<LoginStateType>;
  };
}

const Model: ModelType = {
  namespace: 'login',

  state: {
    error: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.success) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      //payload.success && setAuthority(payload.currentAuthority);
      return {
        ...state,
        error: payload.error,
      };
    },
  },
};

export default Model;
