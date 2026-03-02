import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params: {
          ...params,
        },
      }),
      providesTags: [tagTypes.users],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.users],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery } = usersApi;
