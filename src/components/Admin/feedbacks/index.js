import React, { useState } from "react";
import { Modal, Button } from "antd";
import { ReviewFeedbackAdmin } from "./adminFeed";

const AdminFeedback = ({ setModalOpen, isModalOpen, userId }) => {
  const handleCancel = () => {
    setModalOpen(false);
  };
  return (
    <>
      <Modal
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={1000}
      >
        <ReviewFeedbackAdmin id={isModalOpen} />
      </Modal>
    </>
  );
};

export default AdminFeedback;
