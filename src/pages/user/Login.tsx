import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Alert, Checkbox } from 'antd';
import LoginComponents from '@/components/Login';
import styles from './Login.less';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { LoginStateType } from '@/models/login';

const { UserName, Password, Submit } = LoginComponents;

interface LoginPageProps {
  dispatch: Dispatch<any>;
  status?: 'ok' | 'error';
  submitting: boolean;
}

interface LoginPageState {
  rememberPassword: boolean;
}

export interface FromDataType {
  userName: string;
  password: string;
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
    status: login.status,
    submitting: loading.effects['login/login'],
  }),
)
class LoginPage extends Component<LoginPageProps, LoginPageState> {
  state: LoginPageState = {
    rememberPassword: true,
  };
  loginForm: FormComponentProps['form'] | undefined | null;

  handleSubmit = (err: any, values: FromDataType) => {
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: values,
      });
    }
  };

  changeAutoLogin = (e: CheckboxChangeEvent) => {
    this.setState({
      rememberPassword: e.target.checked,
    });
  };

  renderMessage = (content: string) => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { status, submitting } = this.props;
    return (
      <div className={styles.main}>
        <LoginComponents
          onSubmit={this.handleSubmit}
          ref={(form: any) => {
            this.loginForm = form;
          }}
        >
          {status === 'error' && !submitting ? (
            this.renderMessage(formatMessage({ id: 'login.login.message-invalid-credentials' }))
          ) : (
            <></>
          )}
          <UserName
            name="username"
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
            onPressEnter={() => this.loginForm && this.loginForm.validateFields(this.handleSubmit)}
          />
          <div>
            <Checkbox checked={this.state.rememberPassword} onChange={this.changeAutoLogin}>
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
