import React, { useContext } from "react";
import { Button, List, Typography } from "antd";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { AlertError } from "../../errors";
import { AuthContext } from "../../../contexts/auth";
import { useGetFeedbacksAdmin } from "../../../graphql/feedback";
const { Title } = Typography;

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
export const ReviewFeedbackAdmin = ({ id }) => {
  const {
    data: rawData,
    loading,
    error,
  } = useGetFeedbacksAdmin({ variables: { userId: id } });
  const { authData: token } = useContext(AuthContext);

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <AlertError />;
  }
  const data = rawData.feedbacks.map(
    ({ user: { firstName, lastName, email }, comment, file, _id }) => {
      return { name: firstName + " " + lastName, email, comment, file, _id };
    }
  );
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <List
        style={{ marginTop: 20, width: "50%", textAlign: "left" }}
        size="large"
        header={
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
            User feedbacks
          </Title>
        }
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.title}>
            <List.Item.Meta title={item.name} description={item.email} />
            <div
              style={{
                backgroundColor: "#f0f0f0",
                padding: "10px",
                marginTop: "10px",
                fontStyle: "italic",
                fontSize: "15px",
              }}
            >
              " {item.comment} "
            </div>
            <br />
            <Button
              onClick={() => downloadFile(item.file, token)}
              shape="round"
              type="secondary"
              style={{
                margin: 20,
                marginLeft: 0,
                fontWeight: "bold",
                width: 150,
              }}
            >
              Open File
            </Button>
            ,
          </List.Item>
        )}
      />
    </div>
  );
};
