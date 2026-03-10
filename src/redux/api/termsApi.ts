import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const termsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    create: builder.mutation({
      query: (data) => ({
        url: "/terms-and-conditions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.terms],
    }),
    getTerms: builder.query({
      query: () => ({
        url: "/terms-and-conditions",
        method: "GET",
      }),
      providesTags: [tagTypes.terms],
    }),
    updateTerms: builder.mutation({
      query: (data) => ({
        url: `/terms-and-conditions/${data?.id}`,
        method: "PUT",
        body: data?.data,
      }),
      invalidatesTags: [tagTypes.terms],
    }),
  }),
});

export const { useCreateMutation, useGetTermsQuery, useUpdateTermsMutation } =
  termsApi;
