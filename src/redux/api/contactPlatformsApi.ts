import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const contactPlatforms = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getContactPlatforms: build.query({
      query: () => ({
        url: "/platforms",
        method: "GET",
      }),
      providesTags: [tagTypes.platform],
    }),
    createContactPlatform: build.mutation({
      query: (data) => ({
        url: "/platforms",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.platform],
    }),
    deleteContactPlatform: build.mutation({
      query: (id) => ({
        url: `/platforms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.platform],
    }),
  }),
});

export const { useGetContactPlatformsQuery, useCreateContactPlatformMutation, useDeleteContactPlatformMutation } =
  contactPlatforms;
