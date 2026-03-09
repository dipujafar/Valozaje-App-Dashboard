import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const commissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCommission: builder.query({
      query: (params) => ({
        url: "/commissions/overview",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.commission],
    }),
    getCommissionState: builder.query({
      query: () => ({
        url: "/commissions/stats",
        method: "GET",
      }),
      providesTags: [tagTypes.commission],
    }),
    getCommissionDetails: builder.query({
      query: (id) => ({
        url: `/commissions/drivers/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.commission],
    }),
  }),
});

export const { useGetCommissionQuery, useGetCommissionStateQuery, useGetCommissionDetailsQuery } = commissionApi;
