import { Button, Form, Icon, Input } from 'antd';
import * as React from 'react';
import { FormComponentProps } from 'antd/es/form';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import styles from './index.less';

export interface LoginProps {
  form: FormComponentProps['form'];
  submitting: boolean;
  onValues: (values: FromDataType) => void;
}

export interface FromDataType {
  userName: string;
  password: string;
}

class NormalLoginForm extends React.Component<LoginProps> {
  handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onValues(values);
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form className={styles.login} onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: formatMessage({ id: 'login.userName.required' }) }],
          })(
            <Input
              size="large"
              prefix={<Icon type="user" className={styles.prefixIcon} />}
              placeholder={formatMessage({ id: 'login.login.userName' })}
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: formatMessage({ id: 'login.password.required' }) }],
          })(
            <Input
              size="large"
              prefix={<Icon type="lock" className={styles.prefixIcon} />}
              type="password"
              placeholder={formatMessage({ id: 'login.login.password' })}
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button size="large" type="primary" htmlType="submit" className={styles.submit}>
            <FormattedMessage id="login.login.login" />
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create<LoginProps>({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;
