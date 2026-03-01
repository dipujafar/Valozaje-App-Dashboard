import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const vehicleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVehicles: builder.query({
      query: (params) => ({
        url: "/vehicles",
        method: "GET",
        params: {
          populate: "user,approvedBy",
          ...params,
        },
      }),
      providesTags: [tagTypes.vehicles],
    }),
    getVehicleById: builder.query({
      query: (id) => ({
        url: `/vehicles/${id}`,
        method: "GET",
        params: {
          populate: "user,approvedBy",
        },
      }),
      providesTags: [tagTypes.vehicles],
    }),
    approveVehicle: builder.mutation({
      query: (id) => ({
        url: `/vehicles/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.vehicles],
    }),
    rejectVehicle: builder.mutation({
      query: (id) => ({
        url: `/vehicles/${id}/reject`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.vehicles],
    }),
  }),
});

export const {
  useGetVehiclesQuery,
  useGetVehicleByIdQuery,
  useApproveVehicleMutation,
  useRejectVehicleMutation,
} = vehicleApi;
