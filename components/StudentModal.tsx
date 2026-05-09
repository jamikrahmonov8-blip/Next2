"use client";
import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber, Switch } from "antd";
import { IStudent } from "../../next/src/store/Inrefaces";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: IStudent | null;
  confirmLoading: boolean;
}

export default function StudentModal({ isOpen, onClose, onSubmit, initialData, confirmLoading }: ModalProps) {
  const [form] = Form.useForm();

  // Синхронизация данных формы при открытии/редактировании
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        form.setFieldsValue(initialData);
      } else {
        form.resetFields();
      }
    }
  }, [isOpen, initialData, form]);

  const handleOk = () => {
    form.validateFields()
      .then((values) => {
        onSubmit(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title={initialData ? "Редактировать студента" : "Добавить студента"}
      open={isOpen}
      onOk={handleOk}
      onCancel={onClose}
      confirmLoading={confirmLoading}
      okText="Сохранить"
      cancelText="Отмена"
      centered
    >
      <Form
        form={form}
        layout="vertical"
        name="studentForm"
        initialValues={{ status: false }}
        className="mt-4"
      >
        <Form.Item
          name="name"
          label="Имя"
          rules={[{ required: true, message: "Введите имя студента" }]}
        >
          <Input placeholder="Напр: Lester Koss" />
        </Form.Item>

        <Form.Item
          name="age"
          label="Возраст"
          rules={[{ required: true, message: "Введите возраст" }]}
        >
          <InputNumber min={1} max={120} className="w-full" />
        </Form.Item>

        <Form.Item
          name="location"
          label="Локация"
          rules={[{ required: true, message: "Введите город" }]}
        >
          <Input placeholder="Напр: Fort Earnestberg" />
        </Form.Item>

        <Form.Item name="img" label="URL Аватара">
          <Input placeholder="https://..." />
        </Form.Item>

        <Form.Item name="status" label="Активный статус" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
}