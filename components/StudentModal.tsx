"use client";
import React, { useEffect } from "react";
import { Modal, Input, Switch, ConfigProvider, Button } from "antd";
import { MailOutlined, UserOutlined, PhoneOutlined, BankOutlined, LockOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any | null;
  confirmLoading: boolean;
}

export default function StudentModal({ isOpen, onClose, onSubmit, initialData, confirmLoading }: ModalProps) {

  const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm();


  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset(initialData);
      } else {
        reset({ status: false, fullName: '', email: '', company: '', phone: '', password: '', avatar: '' });
      }
    }
  }, [isOpen, initialData, reset]);

  return (
    <ConfigProvider theme={{ token: { borderRadius: 12, colorPrimary: "#6366f1" } }}>
      <Modal
        title={
          <div className="text-xl font-bold text-slate-800 pb-2 border-b border-slate-100">
            {initialData ? "Редактировать профиль" : "Новый клиент"}
          </div>
        }
        open={isOpen}
        onCancel={onClose}
        centered
        footer={[
          <Button key="back" onClick={onClose} className="h-10 px-6 rounded-xl">
            Отмена
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            loading={confirmLoading} 
            onClick={handleSubmit(onSubmit)} 
            className="bg-indigo-600 h-10 px-6 rounded-xl border-none font-bold"
          >
            Сохранить
          </Button>
        ]}
      >
        <form className="mt-6 space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">ФИО</label>
              <Input 
                prefix={<UserOutlined />} 
                placeholder="John Doe" 
                className="py-2" 
                status={errors.fullName ? "error" : ""}
                defaultValue={initialData?.fullName}
                onChange={(e) => setValue("fullName", e.target.value, { shouldValidate: true })}
              />
              <input type="hidden" {...register("fullName", { required: true })} />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Компания</label>
              <Input 
                prefix={<BankOutlined />} 
                placeholder="Acme Inc" 
                className="py-2" 
                defaultValue={initialData?.company}
                onChange={(e) => setValue("company", e.target.value)}
              />
              <input type="hidden" {...register("company")} />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email</label>
            <Input 
              prefix={<MailOutlined />} 
              placeholder="example@mail.com" 
              className="py-2" 
              status={errors.email ? "error" : ""}
              defaultValue={initialData?.email}
              onChange={(e) => setValue("email", e.target.value, { shouldValidate: true })}
            />
            <input type="hidden" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Телефон</label>
              <Input 
                prefix={<PhoneOutlined />} 
                placeholder="+1..." 
                className="py-2" 
                defaultValue={initialData?.phone}
                onChange={(e) => setValue("phone", e.target.value)}
              />
              <input type="hidden" {...register("phone")} />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Пароль</label>
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="••••••••" 
                className="py-2" 
                status={errors.password ? "error" : ""}
                onChange={(e) => setValue("password", e.target.value, { shouldValidate: !initialData })}
              />
              <input type="hidden" {...register("password", { required: !initialData })} />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">URL Аватара</label>
            <Input 
              placeholder="https://..." 
              className="py-2" 
              defaultValue={initialData?.avatar}
              onChange={(e) => setValue("avatar", e.target.value)}
            />
            <input type="hidden" {...register("avatar")} />
          </div>

          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100 mt-2">
            <div>
              <div className="text-sm font-semibold text-slate-700">Активный статус</div>
              <div className="text-xs text-slate-400">Отображать в активных списках</div>
            </div>
            <Switch 
              checked={watch("status")} 
              onChange={(checked) => setValue("status", checked)} 
            />
            <input type="hidden" {...register("status")} />
          </div>
        </form>
      </Modal>
    </ConfigProvider>
  );
}