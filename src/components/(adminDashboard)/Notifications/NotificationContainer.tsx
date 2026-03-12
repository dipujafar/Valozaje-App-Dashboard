"use client";
import moment from "moment";
import { Bell, Trash2 } from "lucide-react";
import {
  useDeleteNotificationMutation,
  useGetNotificationQuery,
} from "@/redux/api/notificationApi";
import PaginationSection from "@/components/shared/PaginationSection";
import { useSearchParams } from "next/navigation";
import { Spin } from "antd";
import { toast } from "sonner";

const NotificationContainer = () => {
  const page = useSearchParams().get("page") || "1";
  const limit = useSearchParams().get("limit") || "10";

  const queries: Record<string, string> = {};
  if (page) queries["page"] = page;
  if (limit) queries["limit"] = limit;

  const { data, isLoading } = useGetNotificationQuery(queries);

  const [deleteNotification] =
    useDeleteNotificationMutation();

  const notifications = data?.data?.notifications || [];

  const handleDelete = (id: string) => {
    toast("Delete this notification?", {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: async () => {
          toast.loading("Deleting notification...", { id });
          try {
            await deleteNotification(id).unwrap();
            toast.success("Notification deleted successfully");
            toast.dismiss(id);
          } catch (error) {
            toast.error("Failed to delete notification");
            toast.dismiss(id);
          }
        },
      },
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-180px)]">
        <Spin size="large" />
      </div>
    );

  return (
    <div>
      <div className="p-7">
        <h1 className="text-2xl text-text-color mb-2">Notifications</h1>
        <hr />

        <div className="xl:mt-8 mt-6 xl:px-10 px-6 text-text-color">
          <div className="space-y-5">
            {notifications.length === 0 && (
              <p className="text-gray-400 text-center py-10">
                No notifications found
              </p>
            )}

            {notifications?.map((notification: any) => (
              <div
                key={notification?._id}
                className="flex items-center gap-x-4"
              >
                {/* icon */}
                <div className="bg-main-color size-10 flex justify-center items-center rounded-full">
                  <Bell color="white" />
                </div>

                {/* notification content */}
                <div className="bg-white border border-gray-300 rounded-lg p-3 flex-1">
                  <div className="flex justify-between gap-x-2 items-center">
                    <h5 className="font-medium text-lg">
                      {notification?.title || "Notification"}
                    </h5>

                    <p className="text-sm text-gray-500">
                      {moment(notification?.createdAt).fromNow()}
                    </p>
                  </div>

                  <p className="text-gray-500 text-sm">
                    {notification?.message}
                  </p>
                </div>

                {/* delete button */}
                <div
                  onClick={() => handleDelete(notification?._id)}
                  className="bg-[#D30000]/30 size-10 flex justify-center items-center rounded-full cursor-pointer hover:bg-[#D30000]/40 transition"
                >

                  <Trash2 color="#D30000" size={18} />

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* pagination */}
      <PaginationSection
        total={data?.data?.pagination?.total}
        current={Number(page)}
        pageSize={Number(limit)}
      />
    </div>
  );
};

export default NotificationContainer;