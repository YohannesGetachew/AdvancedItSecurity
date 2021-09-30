import React, { useContext, useState } from "react";
import { Button, List, Typography } from "antd";
import { useGetFeedbacksAdmin } from "../../graphql/feedback";
import { CircularProgress } from "@material-ui/core";
import { AlertError } from "../errors";
import { AuthContext } from "../../contexts/auth";
import AdminFeedback from "./feedbacks";
import { useDisableUser, useUsers } from "../../graphql/user";
const { Title } = Typography;

export const UsersList = () => {
  const { data: rawData, loading, error } = useUsers();
  const [
    disableUser,
    {
      data: disabledUser,
      loading: loadingDisabledUser,
      error: errorDisablingUser,
    },
  ] = useDisableUser();
  const { authData: token } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <AlertError />;
  }
  const data = rawData.users.map(
    ({ firstName, lastName, email, _id, isActive }) => {
      return {
        name: firstName + " " + lastName,
        email,
        userId: _id,
        isActive,
      };
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
            User Feedbacks
          </Title>
        }
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.title}>
            <List.Item.Meta title={item.name} description={item.email} />
            <br />
            <Button
              shape="round"
              type="primary"
              onClick={() => setIsModalVisible(item.userId)}
              style={{
                margin: 20,
                marginLeft: 0,
                fontWeight: "bold",
                width: 150,
              }}
            >
              View Feedbacks
            </Button>
            <Button
              shape="round"
              type={item.isActive ? "primary" : "ghost"}
              danger={item.isActive}
              disabled={!item.isActive}
              onClick={async () => {
                try {
                  const disabledUser = await disableUser({
                    variables: { userId: item.userId },
                  });
                  window.location.reload(false);
                } catch (e) {}
              }}
              style={{
                margin: 20,
                marginLeft: 0,
                fontWeight: "bold",
                width: 150,
              }}
            >
              {item.isActive ? "Disable User" : "Disabled"}
            </Button>
          </List.Item>
        )}
      />
      <AdminFeedback
        isModalOpen={isModalVisible}
        setModalOpen={setIsModalVisible}
      />
    </div>
  );
};
