import React, { Component } from 'react';
import { connect } from 'dva';
import { Alert } from 'antd';
import styles from './Login.less';
import { Dispatch } from 'redux';
import { LoginStateType } from '@/models/login';
import LoginForm, { FromDataType } from '@/components/LoginForm';

interface LoginPageProps {
  dispatch: Dispatch<any>;
  error?: string;
  submitting: boolean;
}

interface LoginPageState {
  rememberPassword: boolean;
}

@connect(
  ({
    login,
    loading,
  }: {
    login: LoginStateType;
    loading: {
      effects: {
        [key: string]: string;
      };
    };
  }) => ({
    error: login.error,
    submitting: loading.effects['login/login'],
  }),
)
class LoginPage extends Component<LoginPageProps, LoginPageState> {
  state: LoginPageState = {
    rememberPassword: true,
  };

  handleValues = (values: FromDataType) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/login',
      payload: values,
    });
  };

  render() {
    const { error, submitting } = this.props;
    return (
      <div className={styles.main}>
        {error && !submitting && (
          <Alert style={{ marginBottom: 24 }} message={error} type="error" showIcon />
        )}
        <LoginForm submitting onValues={this.handleValues} />
      </div>
    );
  }
}

export default LoginPage;
