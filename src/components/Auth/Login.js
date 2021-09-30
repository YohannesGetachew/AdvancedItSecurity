import React, { useContext } from "react";
import { Form, Input, Button, Typography, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useLogin } from "../../graphql/user";
import { AlertError } from "../errors";
import { AuthContext } from "../../contexts/auth/context";
import { Actions } from "../../contexts/auth";
const { Title } = Typography;

const onFinish = async (values, login, dispatch) => {
  try {
    const authData = await login({ variables: values });
    if (authData) {
      const token = authData?.data?.login;
      dispatch(
        Actions.addAuthData({
          token,
          expiry: 60000 * 30,
        })
      );
    } else {
      // console.log("no auth data present");
    }
  } catch (err) {
    return;
  }
};

export const Login = () => {
  const [loginMutation, { data, loading, error }] = useLogin();
  const { dispatch } = useContext(AuthContext);
  return (
    <Form
      name="normal_login"
      className="login-form"
      style={{ width: "50%" }}
      initialValues={{
        remember: true,
      }}
      onFinish={(values) => onFinish(values, loginMutation, dispatch)}
    >
      <Title
        style={{
          margin: 0,
          fontWeight: "800",
          fontSize: "3.5em",
          color: "#2C8CF4",
          marginBottom: 20,
          textAlign: "left",
        }}
      >
        Login
      </Title>
      {error && <AlertError />}
      <div style={{ padding: "10px" }} />
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input
          size="large"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          size="large"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            Log in
          </Button>
          or<Link to="/register">register now!</Link>
        </div>
      </Form.Item>
    </Form>
  );
};
