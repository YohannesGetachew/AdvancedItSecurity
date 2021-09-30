import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useCreateUser } from "../../graphql/user";
import { useHistory } from "react-router-dom";
import { AlertError } from "../errors";
const { Title } = Typography;

const onFinish = async (values, register, history) => {
  try {
    values = { ...values, role: "MEMBER" };
    const registeredUser = await register({ variables: { userInput: values } });
    history.replace("/login");
  } catch (e) {
    // console.log(e);
  }
};

export const Registration = () => {
  const [register, { loading, data, error }] = useCreateUser();
  const history = useHistory();
  return (
    <Form
      name="normal_login"
      className="login-form"
      style={{ width: "50%" }}
      initialValues={{}}
      onFinish={(values) => onFinish(values, register, history)}
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
        Register
      </Title>
      {error && <AlertError />}
      <Form.Item
        name="firstName"
        rules={[
          {
            required: true,
            message: "Please input your FirstName!",
          },
          {
            max: 30,
            message: "Please provide a valid name",
          },
        ]}
      >
        <Input
          size="large"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="First name"
        />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[
          {
            required: true,
            message: "Please input your LastName!",
          },
          {
            max: 30,
            message: "Please provide a valid name",
          },
        ]}
      >
        <Input
          size="large"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Last name"
        />
      </Form.Item>
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
          type={"email"}
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
            Register
          </Button>
          or <Link to="/login">login</Link>
        </div>
      </Form.Item>
    </Form>
  );
};
