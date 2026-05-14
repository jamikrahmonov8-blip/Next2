"use client";

import React, { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import axios from "axios";

import { Button, Input, Modal, Table } from "antd";

const HomePage = () => {
  const api = "https://6941690a686bc3ca8166e0a9.mockapi.io/Students";

  const queryClient = useQueryClient();

  // ADD
  const [openAdd, setOpenAdd] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  // EDIT
  const [openEdit, setOpenEdit] = useState(false);

  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  // GET
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["students"],

    queryFn: async () => {
      const { data } = await axios.get(api);

      return data;
    },
  });

  // DELETE
  const { mutate: deleteStudent } = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(api + "/" + id);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
  });

  // ADD
  const { mutate: addStudent } = useMutation({
    mutationFn: async () => {
      await axios.post(api, {
        fullName,
        email,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });

      setOpenAdd(false);

      setFullName("");
      setEmail("");
    },
  });

  // EDIT
  const { mutate: editStudent } = useMutation({
    mutationFn: async () => {
      await axios.put(api + "/" + editId, {
        fullName: editName,
        email: editEmail,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });

      setOpenEdit(false);
    },
  });

  // TABLE COLUMNS
  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Actions",

      render: (_: any, record: any) => (
        <div className="flex gap-3">
          <Button
            danger
            onClick={() => deleteStudent(record.id)}
          >
            Delete
          </Button>

          <Button
            type="primary"
            onClick={() => {
              setOpenEdit(true);

              setEditId(record.id);
              setEditName(record.fullName);
              setEditEmail(record.email);
            }}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-[1200px] m-auto pt-[30px]">
      {/* TOP */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-[35px] font-bold">
          Students
        </h1>

        <Button
          type="primary"
          onClick={() => setOpenAdd(true)}
        >
          Add Student
        </Button>
      </div>

      {isFetching && <h1>FETCHING...</h1>}

      {/* TABLE */}
      <Table
        loading={isLoading}
        dataSource={data}
        columns={columns}
        rowKey="id"
      />

      {/* ADD MODAL */}
      <Modal
        open={openAdd}
        onCancel={() => setOpenAdd(false)}
        onOk={() => addStudent()}
        title="Add Student"
      >
        <div className="flex flex-col gap-4 mt-5">
          <Input
            placeholder="Full Name"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
          />

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </div>
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        onOk={() => editStudent()}
        title="Edit Student"
      >
        <div className="flex flex-col gap-4 mt-5">
          <Input
            placeholder="Full Name"
            value={editName}
            onChange={(e) =>
              setEditName(e.target.value)
            }
          />

          <Input
            placeholder="Email"
            value={editEmail}
            onChange={(e) =>
              setEditEmail(e.target.value)
            }
          />
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;