import React, { useState } from "react";
import { Form, Input, Button, Typography, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useCreateFeedback } from "../../graphql/feedback";
import { AlertError } from "../errors";

const { Title } = Typography;
const { TextArea } = Input;
const normFile = (e) => {
  // console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const onFinish = async (values, createFeedback) => {
  try {
    let feedbackInput = {};
    if (values.file) {
      feedbackInput = { ...values, file: values.file[0].response };
    } else {
      feedbackInput = { ...values };
    }
    const createdFeedback = await createFeedback({
      variables: {
        feedbackInput: feedbackInput,
      },
    });
    return createdFeedback;
  } catch (err) {
    // console.log(err);
    return;
  }
};

const onChange = (info, setError, setSingleUploaded) => {
  if (info.file.status !== "uploading") {
  }
  if (info.file.status === "done") {
    setError(false);
    setSingleUploaded(true);
  } else if (info.file.status === "error") {
    setError(true);
  }
};

const onRemove = (setSingleUploaded) => {
  setSingleUploaded(false);
};

export const Feedback = ({ userData, token }) => {
  const [createFeedback, { loading, data, error }] = useCreateFeedback();
  const [uploadError, setError] = useState(false);
  const [singleUploaded, setSingleUploaded] = useState(false);
  return (
    <Form
      name="normal_login"
      className="login-form"
      style={{ width: "35%" }}
      initialValues={{
        remember: true,
      }}
      onFinish={(values) => onFinish({ ...values }, createFeedback)}
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
        Enter Your Feedback
      </Title>
      <Form.Item
        name="comment"
        rules={[
          {
            required: true,
            message: "Please enter your Comment!",
          },
          {
            max: 100,
            message: "Please shorten comment",
          },
        ]}
      >
        <TextArea placeholder="Comment" />
      </Form.Item>
      <Form.Item
        style={{
          float: "left",
        }}
        name="file"
        label="If Your comment is long upload a pdf file"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          name="complaint"
          action="http://localhost:4000/single"
          listType="text"
          headers={{ authorization: "Bearer " + token }}
          onChange={(info) => onChange(info, setError, setSingleUploaded)}
          multiple={false}
          onRemove={() => onRemove(setSingleUploaded)}
        >
          {singleUploaded ? null : (
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          )}
          {uploadError ? (
            <div style={{ margin: "10px" }}>
              {" "}
              <AlertError message={"Failed to upload"} />{" "}
            </div>
          ) : null}
        </Upload>
      </Form.Item>
      <br style={{ clear: "both" }} />
      <Form.Item>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button
            style={{
              margin: 0,
              padding: 0,
            }}
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            Send
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

{
  /* <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          size="large"
          // prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
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
          size="large"
          // prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item> */
}
