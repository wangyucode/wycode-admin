import { getCurrent, saveCurrent } from '@/services/user';
import { Effect } from 'dva';
import { Reducer } from 'redux';

export interface User {
  avatar: string;
  name: string;
  type: string;
}

export const GuestUser = {
  avatar: 'https://wycode.cn/upload/image/account.png',
  name: '匿名用户',
  type: 'guest',
};

export interface UserModelState {
  currentUser: User;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchCurrent: Effect;
    saveCurrent: Effect;
  };
  reducers: {
    storeCurrentUser: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: GuestUser,
  },

  effects: {
    *saveCurrent(action, { call, put }) {
      const response = yield call(saveCurrent(action.payload));
      yield put({
        type: 'storeCurrentUser',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(getCurrent);
      if (response) {
        yield put({
          type: 'storeCurrentUser',
          payload: response,
        });
      }
    },
  },

  reducers: {
    storeCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
  },
};

export default UserModel;
