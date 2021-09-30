import React, { useContext, useState } from "react";
import { Form, Input, Button, Typography, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEditFeedback, useGetMyFeedbacks } from "../../graphql/feedback";
import { AlertError } from "../errors";
import { CircularProgress } from "@material-ui/core";
import { useParams } from "react-router";

const { Title } = Typography;
const { TextArea } = Input;
const normFile = (e) => {
  // console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const downloadFile = (url, token) => {
  fetch(url, {
    method: "GET",
    headers: new Headers({
      Authorization: "Bearer " + token,
    }),
  })
    .then((response) => response.blob())
    .then((blob) => {
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "filename.xlsx";
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove(); //afterwards we remove the element again
    })
    .catch(() => {});
};

const onFinish = async (values, editFeedback, id) => {
  try {
    let feedbackInput = {};
    if (values.file) {
      feedbackInput = { ...values, file: values.file[0].response };
    } else {
      feedbackInput = { comment: values.comment };
    }
    const createdFeedback = await editFeedback({
      variables: {
        feedbackInput: feedbackInput,
        feedbackId: id,
      },
    });
    // console.log("created feedback", createdFeedback);
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

export const EditFeedback = ({ userData, token }) => {
  const id = useParams().id;
  const [editFeedback, { loading, data, error }] = useEditFeedback();
  const {
    data: rawData,
    loading: loadingFeedback,
    error: errorLoadingFeedback,
  } = useGetMyFeedbacks({
    variables: {
      feedbackId: id,
    },
  });
  const [uploadError, setError] = useState(false);
  const [singleUploaded, setSingleUploaded] = useState(false);
  if (loadingFeedback) {
    return <CircularProgress />;
  }
  if (errorLoadingFeedback) {
    return <AlertError />;
  }
  //   const feedback = rawData.myFeedbacks;
  //   console.log(feedback[0]);
  let comment = rawData.myFeedbacks[0].comment;
  let file = rawData.myFeedbacks[0].file;
  return (
    <Form
      name="normal_login"
      className="login-form"
      style={{ width: "35%" }}
      initialValues={{
        comment,
      }}
      onFinish={(values) => onFinish({ ...values }, editFeedback, id)}
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
        Edit feedback
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
      <Button
        onClick={() =>
          downloadFile(
            "http://localhost:4000/uploads/e3004c2c-f3d5-4881-846d-5a326d6257fa-gnu_free_doc_1.2.pdf",
            token
          )
        }
        shape="round"
        type="secondary"
        style={{
          margin: 20,
          marginLeft: 0,
          fontWeight: "bold",
          width: 150,
        }}
      >
        Open uploaded file
      </Button>
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
