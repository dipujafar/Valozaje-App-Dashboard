import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const dashboardAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => ({
        url: "/dashboard/top-cards",
        method: "GET",
      }),
      providesTags: [tagTypes.dashboard],
    }),
    getChartData: builder.query({
      query: (queries) => ({
        url: "/dashboard/chart",
        method: "GET",
        params: queries,
      }),
      providesTags: [tagTypes.dashboard],
    }),
    getStatsData: builder.query({
      query: () => ({
        url: "/dashboard/stats",
        method: "GET",
      }),
      providesTags: [tagTypes.dashboard],
    }),
    getEarningsData: builder.query({
      query: (period) => ({
        url: "/dashboard/earnings",
        method: "GET",
        params: { period },
      }),
      providesTags: [tagTypes.dashboard],
    }),
  }),
});

export const {
  useGetDashboardDataQuery,
  useGetChartDataQuery,
  useGetStatsDataQuery,
  useGetEarningsDataQuery,
} = dashboardAPi;
