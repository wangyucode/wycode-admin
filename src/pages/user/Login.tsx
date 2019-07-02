import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Alert, Checkbox } from 'antd';
import LoginComponents from '@/components/Login';
import styles from './Login.less';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { IStateType } from '@/models/login';

const { Tab, UserName, Password, Submit } = LoginComponents;

interface LoginPageProps {
  dispatch: Dispatch<any>;
  login: IStateType;
  submitting: boolean;
}

interface LoginPageState {
  type: string;
  autoLogin: boolean;
}

export interface FromDataType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

@connect(
  ({
    login,
    loading,
  }: {
    login: IStateType;
    loading: {
      effects: {
        [key: string]: string;
      };
    };
  }) => ({
    login,
    submitting: loading.effects['login/login'],
  }),
)
class LoginPage extends Component<LoginPageProps, LoginPageState> {
  state: LoginPageState = {
    type: 'account',
    autoLogin: true,
  };
  loginForm: FormComponentProps['form'] | undefined | null;

  onTabChange = (type: string) => {
    this.setState({ type });
  };

  handleSubmit = (err: any, values: FromDataType) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  changeAutoLogin = (e: CheckboxChangeEvent) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = (content: string) => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { login, submitting } = this.props;
    const { status, type: loginType } = login;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={(form: any) => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab={formatMessage({ id: 'login.login.tab-login-credentials' })}>
            {status === 'error' &&
              loginType === 'account' &&
              !submitting &&
              this.renderMessage(formatMessage({ id: 'login.login.message-invalid-credentials' }))}
            <UserName
              name="userName"
              placeholder={formatMessage({ id: 'login.login.userName' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'login.userName.required' }),
                },
              ]}
            />
            <Password
              name="password"
              placeholder={formatMessage({ id: 'login.login.password' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'login.password.required' }),
                },
              ]}
              onPressEnter={() =>
                this.loginForm && this.loginForm.validateFields(this.handleSubmit)
              }
            />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="login.login.remember-me" />
            </Checkbox>
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="login.login.login" />
          </Submit>
        </LoginComponents>
      </div>
    );
  }
}

export default LoginPage;
