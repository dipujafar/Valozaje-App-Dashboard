import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReports: builder.query({
      query: (params) => ({
        url: "/reports",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.reports],
    }),
    getReportSubject: builder.query({
      query: (id) => ({
        url: `/report-subjects`,
        method: "GET",
      }),
      providesTags: [tagTypes.reports],
    }),
    createReport: builder.mutation({
      query: (data) => ({
        url: "/report-subjects",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.reports],
    }),
    deleteReport: builder.mutation({
      query: (id) => ({
        url: `/report-subjects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.reports],
    }),
  }),
});

export const {
  useGetReportsQuery,
  useGetReportSubjectQuery,
  useCreateReportMutation,
  useDeleteReportMutation,
} = reportsApi;
