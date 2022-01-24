import React from 'react';
import styles from './index.module.scss';
import { VscChromeClose } from 'react-icons/vsc';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { closeHashWindow } from 'renderer/api/ipc';
import { loginByEmail } from 'renderer/api';
import { message } from 'antd';
import { UserType } from 'renderer/store/appSlice';
import { useAppDispatch } from 'renderer/hooks/hooks';

const Login: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  const onFinish = (values: any) => {
    const { username, password } = values;
    setLoading(true);
    loginByEmail({
      email: username,
      password,
    })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        const account = res.data.account;
        const user = {
          id: account.id,
          userName: account.userName,
          nickname: account.nickname,
          vipType: account.vipType,
          signature: account.sigature,
          follows: account.follows,
          followed: account.followed,
          avatarUrl: account.avatarUrl,
          city: account.city,
          province: account.province,
          salt: account.salt,
          birthday: account.birthday,
        } as UserType;
        dispatch({
          type: 'app/setUser',
          payload: user,
        });
        message.success('登录成功');
        setTimeout(() => {
          closeHashWindow('login');
        }, 1000);
        // console.log
      })
      .catch(() => {
        message.error('用户名或密码错误');
      });
    // console.log(values);
  };
  const onClickClosePage = () => {
    closeHashWindow('login');
  };
  return (
    <div className={styles.loginPage}>
      <div className={styles.header}>
        <div className={styles.headerButton}>
          <div className={styles.btn}>
            <VscChromeClose onClick={onClickClosePage} />
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <h1>Login</h1>
        </div>
        <div className={styles.mainContainer}>
          <Form
            name="normal_login"
            className={styles.loginForm}
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please input your Username!' },
              ]}
            >
              <Input
                prefix={<UserOutlined className={styles.formItemIcon} />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input
                prefix={<LockOutlined className={styles.formItemIcon} />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className={styles.checkbox}>Remember me</Checkbox>
              </Form.Item>

              {/* <a className={styles.loginFormForget} href="">
                Forgot password
              </a> */}
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.loginFormButton}
                loading={loading}
              >
                Log in
              </Button>
              {/* Or <a href="">register now!</a> */}
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
