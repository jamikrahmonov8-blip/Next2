"use client";
import { useState } from "react";
import { Button, Card, Avatar, Tag, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { 
  useGetStudentsQuery, 
  useAddStudentMutation, 
  useDeleteStudentMutation, 
  useUpdateStudentMutation 
} from "../../src/store/api/postApi";
import StudentModal from "../../components/StudentModal";

export default function HomePage() {
  const { data: students, isLoading } = useGetStudentsQuery();
  const [addStudent, { isLoading: isAdding }] = useAddStudentMutation();
  const [deleteStudent] = useDeleteStudentMutation();
  const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const handleSave = async (formData: any) => {
    try {
      if (selectedStudent) {
        await updateStudent({ ...formData, id: selectedStudent.id }).unwrap();
        message.success("Данные обновлены");
      } else {
        await addStudent({ ...formData, img: formData.img || "https://joesch.moe/api/v1/random" }).unwrap();
        message.success("Студент добавлен");
      }
      setIsModalOpen(false);
    } catch (err) {
      message.error("Произошла ошибка");
    }
  };

  if (isLoading) return <div className="p-20 text-center text-xl">Загрузка...</div>;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold italic tracking-tight">STUDENTS.IO</h1>
        <Button 
          type="primary" 
          size="large" 
          icon={<PlusOutlined />} 
          onClick={() => { setSelectedStudent(null); setIsModalOpen(true); }}
          shape="round"
        >
          Add Student
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students?.map((student) => (
          <Card
            key={student.id}
            hoverable
            actions={[
              <EditOutlined key="edit" onClick={() => { setSelectedStudent(student); setIsModalOpen(true); }} />,
              <Popconfirm
                title="Удалить студента?"
                onConfirm={() => deleteStudent(student.id)}
                okText="Да"
                cancelText="Нет"
              >
                <DeleteOutlined key="delete" className="text-red-500" />
              </Popconfirm>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar src={student.img} size={64} shape="square" className="rounded-xl" />}
              title={<span className="text-lg font-bold">{student.name}</span>}
              description={
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-zinc-400">
                    <EnvironmentOutlined size={12} /> {student.location}
                  </div>
                  <div className="flex gap-2 items-center">
                    <Tag color="blue">Age: {student.age}</Tag>
                    <Tag color={student.status ? "green" : "red"}>
                      {student.status ? "Active" : "Offline"}
                    </Tag>
                  </div>
                </div>
              }
            />
          </Card>
        ))}
      </div>

      <StudentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleSave}
        initialData={selectedStudent}
        confirmLoading={isAdding || isUpdating}
      />
    </div>
  );
}