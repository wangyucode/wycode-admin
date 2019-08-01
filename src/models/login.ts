import { routerRedux } from 'dva/router';
import { getPageQuery } from '@/utils/utils';
import { login } from '@/services/login';
import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { setToken } from '@/utils/token';
import { guestUser } from '@/models/user';

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
    logout: Effect;
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
        payload: response.error,
      });
      // Login successfully
      if (response.success) {
        yield call(setToken, response.data.token);
        yield put({ type: 'user/storeCurrentUser', payload: response.data });

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

    *logout(_, { call, put }) {
      yield call(setToken, null);
      yield put({ type: 'user/storeCurrentUser', payload: guestUser });
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        error: payload,
      };
    },
  },
};

export default Model;
