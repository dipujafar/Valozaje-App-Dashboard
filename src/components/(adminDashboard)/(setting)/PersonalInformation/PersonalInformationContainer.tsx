"use client";
import { Button, ConfigProvider, Form, Input, Spin } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import profile from "@/assets/image/adminProfile.png";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Camera, Trash2 } from "lucide-react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/profileApi";
import { imagePreview } from "@/utils/imagePreview";

const PersonalInformationContainer = () => {
  const route = useRouter();
  const [form] = Form.useForm();
  const [edit, setEdit] = useState(false);
  const [fileName, setFileName] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { data: profileData, isLoading } = useGetProfileQuery(undefined);
  const [updateProfile] = useUpdateProfileMutation();

  useEffect(() => {
    if (profileData?.data) {
      form.setFieldsValue({
        name: profileData.data.fullName,
        email: profileData.data.email,
        phone: profileData.data.phone,
      });
    }
  }, [profileData, form]);


  if (isLoading) return <div className="flex justify-center items-center h-[calc(100vh-200px)]"><Spin size="large" /></div>;

  // populate form with API data


  // submit update
  // @ts-expect-error
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();

      formData.append("fullName", values.name);
      formData.append("username", values.name);
      formData.append("phone", values.phone);

      if (fileName) {
        formData.append("image", fileName);
      }

      await updateProfile(formData).unwrap();

      toast.success("Successfully Change personal information", {
        duration: 1000,
      });

      setEdit(false);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const file = input.files?.[0];

    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setFileName(file);
    } else {
      setImageUrl(null);
      setFileName(null);
    }

    input.value = "";
  };

  return (
    <div>
      {/* header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span
            onClick={() => route.back()}
            className="cursor-pointer bg-main-color p-2 rounded-full"
          >
            <FaArrowLeft size={20} color="#fff" />
          </span>

          <h4 className="text-2xl font-medium text-text-color">
            Personal Information
          </h4>
        </div>

        <div className={edit ? "hidden" : ""}>
          <Button
            style={{
              backgroundColor: "var(--color-main)",
              border: "none",
              color: "var(--color-secondary)",
            }}
            onClick={() => setEdit(true)}
            size="large"
            icon={<FiEdit />}
          >
            Edit Profile
          </Button>
        </div>
      </div>

      <hr className="my-4" />

      {/* main section */}
      <div className="mt-10 flex justify-center flex-col xl:flex-row items-center gap-10">
        {/* profile image */}
        <div className="bg-[#fff] h-[365px] md:w-[350px] rounded-xl border border-main-color flex justify-center items-center text-text-color">
          <div className="space-y-1 relative">
            <div className="relative group">
              <Image
                src={
                  imageUrl ||
                  imagePreview(profileData?.data?.image) ||
                  profile
                }
                alt="adminProfile"
                width={1200}
                height={1200}
                className="size-36 rounded-full object-cover"
              />

              {/* remove image */}
              {fileName && imageUrl && (
                <div
                  className="absolute left-4 top-2 cursor-pointer rounded-md bg-primary-pink opacity-0 duration-1000 group-hover:opacity-100"
                  onClick={() => {
                    setFileName(null);
                    setImageUrl(null);
                  }}
                >
                  <Trash2 size={20} color="red" />
                </div>
              )}

              {/* upload input */}
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />

              {/* upload button */}
              <label
                htmlFor="fileInput"
                className="flex cursor-pointer flex-col items-center"
              >
                <div className="bg-white text-black text-lg p-1 rounded-full absolute bottom-0 right-3">
                  <Camera size={20} />
                </div>
              </label>
            </div>

            {/* name */}
            <h3 className="text-2xl text-center">
              {profileData?.data?.fullName || "Admin"}
            </h3>
          </div>
        </div>

        {/* form */}
        <div className="w-2/4">
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  colorBgContainer: "#fff",
                  colorText: "#333",
                  colorTextPlaceholder: "#fff",
                },
                Form: {
                  labelColor: "#333",
                },
              },
            }}
          >
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              style={{ marginTop: "25px" }}
            >
              {/* name */}
              <Form.Item label="Name" name="name">
                <Input
                  size="large"
                  placeholder="Enter full name"
                  disabled
                />
              </Form.Item>

              {/* email */}
              <Form.Item label="Email" name="email">
                <Input
                  size="large"
                  placeholder="Enter email"
                  disabled
                />
              </Form.Item>

              {/* phone */}
              <Form.Item label="Phone Number" name="phone">
                <Input
                  size="large"
                  placeholder="Enter Phone number"
                  readOnly={!edit}
                />
              </Form.Item>

              {/* submit */}
              <div className={edit ? "" : "hidden"}>
                <Button
                  htmlType="submit"
                  size="large"
                  block
                  style={{ border: "none" }}
                >
                  Save Change
                </Button>
              </div>
            </Form>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationContainer;