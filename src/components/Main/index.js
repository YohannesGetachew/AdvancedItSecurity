import "./Home.css";

import React, { useContext, useState } from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";

import { Dashboard } from "../Dashboard";

import { Layout, Button, Typography, Avatar } from "antd";
import { HomeNav } from "./HomeNav";
import { Feedback } from "../Feedback";
import { ReviewFeedback } from "../Review Feedback";
import { Menu, Dropdown } from "antd";
import { Actions, AuthContext } from "../../contexts/auth";
import { useQuery } from "@apollo/client";
import { useWhoami } from "../../graphql/user";
import { CircularProgress } from "@material-ui/core";
import { AlertError } from "../errors";
import { EditFeedback } from "../Feedback/editFeedback";
import { UsersList } from "../Admin";

const { Header } = Layout;
const { Title } = Typography;

const logout = (dispatch) => {
  dispatch(Actions.removeAuthData());
};

export const Main = () => {
  const { authData, dispatch } = useContext(AuthContext);
  const isLoggedIn = !!authData;
  const whoamiResult = useWhoami({ skip: !isLoggedIn });
  const menu = (
    <Menu>
      <Menu.Item onClick={() => logout(dispatch)}>
        <p>Logout</p>
      </Menu.Item>
    </Menu>
  );
  return (
    <div class="container">
      <Header
        style={{
          background: "white",
          padding: 0,
          zIndex: 9,
          boxShadow: "0 4px 5px 0 #F4F4F4",
        }}
      >
        <div
          style={{
            height: "100%",
          }}
        >
          <Link to="/">
            <Title
              style={{
                float: "left",
                fontWeight: "800",
                marginLeft: 20,
                fontSize: "3em",
                color: "#2C8CF4",
                textAlign: "left",
              }}
            >
              AIS
            </Title>
          </Link>
          {isLoggedIn ? (
            <LoggedinNav menu={menu} whoamiResult={whoamiResult} />
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Link to="/login">
                <Button
                  shape="round"
                  type="primary"
                  style={{ marginRight: 10, fontWeight: "bold" }}
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  shape="round"
                  style={{
                    color: "#2C8CF4",
                    borderColor: "#2C8CF4",
                    marginRight: 20,
                    fontWeight: "bold",
                  }}
                >
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Header>
      <main class={isLoggedIn ? "container__center" : "container__main"}>
        <LoggedInPage
          isLoggedIn={isLoggedIn}
          whoamiResult={whoamiResult}
          token={authData}
        />
      </main>
      <footer>...</footer>
    </div>
  );
};

const LoggedInPage = ({ isLoggedIn, whoamiResult, token }) => {
  if (whoamiResult.loading) {
    return <CircularProgress />;
  }
  if (whoamiResult.error) {
    return <AlertError />;
  }
  const user = whoamiResult?.data?.whoami;
  const role = user?.role;
  return (
    <>
      {!role && (
        <Switch>
          <Route
            path="/"
            render={(props) =>
              isLoggedIn ? (
                <Redirect to="/admin/feedbacks" />
              ) : (
                <HomeNav {...props} />
              )
            }
          />
        </Switch>
      )}
      {role === "ADMIN" && (
        <Switch>
          <Route
            path="/admin/feedbacks"
            render={(props) =>
              isLoggedIn ? (
                <UsersList {...props} userData={user} token={token} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/"
            render={(props) =>
              isLoggedIn ? (
                <Redirect to="/admin/feedbacks" />
              ) : (
                <HomeNav {...props} />
              )
            }
          />
        </Switch>
      )}
      {role === "MEMBER" && (
        <Switch>
          {" "}
          <Route
            path="/user/feedback"
            render={(props) =>
              isLoggedIn ? (
                <Feedback {...props} userData={user} token={token} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/user/edit-feedback/:id"
            render={(props) =>
              isLoggedIn ? (
                <EditFeedback {...props} userData={user} token={token} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/user/review-feedback"
            render={(props) =>
              isLoggedIn ? <ReviewFeedback {...props} /> : <Redirect to="/" />
            }
          />
          <Route
            path="/user"
            render={(props) =>
              isLoggedIn ? (
                <Dashboard {...props} userData={user} />
              ) : (
                <Redirect to="/" />
              )
            }
          />{" "}
          <Route
            path="/"
            render={(props) =>
              isLoggedIn ? <Redirect to="/user" /> : <HomeNav {...props} />
            }
          />
        </Switch>
      )}
    </>
  );
};

const LoggedinNav = ({ menu, whoamiResult }) => {
  const getUserIcon = () => {
    if (whoamiResult.loading) {
      return <CircularProgress />;
    }
    if (whoamiResult.error) {
      return <div>Err</div>;
    }
    return (
      <Avatar style={{ marginRight: 20 }}>
        {whoamiResult.data.whoami.firstName[0]}
      </Avatar>
    );
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Link to="/user">
        <Button type="link" style={{ marginRight: 10, fontWeight: "bold" }}>
          Dashboard
        </Button>
      </Link>
      <Link to="/user/feedback">
        <Button type="link" style={{ marginRight: 10, fontWeight: "bold" }}>
          Feedback
        </Button>
      </Link>
      <Link to="/user/review-feedback">
        <Button type="link" style={{ marginRight: 10, fontWeight: "bold" }}>
          Review Feedback
        </Button>
      </Link>
      <Dropdown overlay={menu}>{getUserIcon()}</Dropdown>
    </div>
  );
};
