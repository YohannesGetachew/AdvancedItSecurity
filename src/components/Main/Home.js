import "./Home.css";
import React from "react";
import { Row, Col, Button, Typography } from "antd";
import { Link } from "react-router-dom";
const { Title } = Typography;
export const Home = () => {
  return (
    <div style={{ textAlign: "left" }}>
      <Title
        style={{
          margin: 0,
          fontWeight: "800",
          fontSize: "3.5em",
          color: "#2C8CF4",
        }}
      >
        Advanced IT Security
      </Title>
      <Title
        style={{
          margin: 0,
          fontWeight: "bolder",
          fontSize: "3mem",
          color: "#2C8CF4",
        }}
      >
        Project 2
      </Title>
      <Title>Group Members</Title>
      <Typography style={{ fontSize: "1.5em", fontWeight: "bolder" }}>
        Immanuel Alemtena
      </Typography>
      <Typography style={{ fontSize: "1.5em", fontWeight: "bolder" }}>
        Sinmkumen Aseffa
      </Typography>
      <Typography style={{ fontSize: "1.5em", fontWeight: "bolder" }}>
        Tesfaye Berhanu
      </Typography>
      <Typography style={{ fontSize: "1.5em", fontWeight: "bolder" }}>
        Yohannes Getachew
      </Typography>
      <Typography style={{ fontSize: "1.5em", fontWeight: "bolder" }}>
        Amir Mustefa
      </Typography>
      <Row style={{ marginTop: 30 }}>
        <Col>
          <Link to="/login">
            <Button
              shape="round"
              size="large"
              type="primary"
              style={{ marginRight: 10, fontWeight: "bold", width: 150 }}
            >
              Login
            </Button>
          </Link>
        </Col>
        <Col>
          <Link to="/register">
            <Button
              type="ghost"
              shape="round"
              size="large"
              style={{
                color: "#2C8CF4",
                borderColor: "#2C8CF4",
                marginRight: 20,
                fontWeight: "bold",
                width: 150,
              }}
            >
              Register
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};
