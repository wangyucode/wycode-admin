import { Reducer } from 'redux';

export interface User {
  avatar: string;
  username: string;
  type: string;
}

export const guestUser: User = {
  avatar: 'https://wycode.cn/upload/image/account.png',
  username: '匿名用户',
  type: 'guest',
};

export interface UserModelState {
  currentUser: User;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  reducers: {
    storeCurrentUser: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: guestUser,
  },
  reducers: {
    storeCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || guestUser,
      };
    },
  },
};

export default UserModel;
