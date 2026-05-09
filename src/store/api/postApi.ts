import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IStudent } from "../Inrefaces";

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://6941690a686bc3ca8166e0a9.mockapi.io/",
  }),
  tagTypes: ["Students"], // Для автоматического обновления данных
  endpoints: (builder) => ({
    getStudents: builder.query<IStudentt[], void>({
      query: () => "/Students",
      providesTags: ["Students"],
    }),
    addStudent: builder.mutation<IStudent, Partial<IStudent>>({
      query: (body) => ({
        url: "/Students",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Students"],
    }),
    updateStudent: builder.mutation<IStudent, IStudent>({
      query: (student) => ({
        url: `/Students/${student.id}`,
        method: "PUT",
        body: student,
      }),
      invalidatesTags: ["Students"],
    }),
    deleteStudent: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/Students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Students"],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;