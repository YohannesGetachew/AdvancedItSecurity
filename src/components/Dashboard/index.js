import { Button, Col, Row, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
const { Title } = Typography;

export const Dashboard = ({ userData }) => {
  return (
    <div>
      <Title
        style={{
          margin: 0,
          fontWeight: "800",
          fontSize: "3.5em",
          color: "#2C8CF4",
        }}
      >
        Welcome {userData?.firstName}
      </Title>
      <Row style={{ marginTop: 30 }}>
        <Col>
          <Link to="/user/feedback">
            <Button
              size="large"
              type="primary"
              style={{
                marginRight: 10,
                borderRadius: 10,
                fontWeight: "bold",
                width: 250,
                height: 150,
              }}
            >
              Feedback
            </Button>
          </Link>
        </Col>
        <Col>
          <Link to="/user/review-feedback">
            <Button
              type="ghost"
              size="large"
              style={{
                color: "#2C8CF4",
                borderRadius: 10,
                borderColor: "#2C8CF4",
                marginRight: 20,
                fontWeight: "bold",
                width: 250,
                height: 150,
              }}
            >
              Review Feedback
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};
