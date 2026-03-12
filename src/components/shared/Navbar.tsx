"use client";
import { Avatar, Badge, Flex } from "antd";
import { FaBars } from "react-icons/fa6";
import { IoNotificationsOutline } from "react-icons/io5";
import avatarImg from "@/assets/image/user_image.png";
import Link from "next/link";
import { ChevronRight, X } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "../ui/menubar";
import { useGetProfileQuery } from "@/redux/api/profileApi";
import { logout } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { imagePreview } from "@/utils/imagePreview";
import CustomAvatar from "../ui/customAvatar";

type TNavbarProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const Navbar = ({ collapsed, setCollapsed }: TNavbarProps) => {
  const { data: profileData, isLoading } = useGetProfileQuery(undefined);
  const dispatch = useAppDispatch();
  const router = useRouter();

  console.log(profileData?.data?.fullName);

  return (
    <div className="flex items-center justify-between w-[97%] font-poppins">
      {/* Header left side */}
      <Flex align="center" gap={20}>
        <button
          onClick={() => setCollapsed(collapsed ? false : true)}
          className="cursor-pointer hover:bg-gray-300 rounded-full duration-1000"
        >
          {collapsed ? (
            <X size={28} color="#3A3C3B" />
          ) : (
            <FaBars size={28} color="#3A3C3B" />
          )}
        </button>
        <div className="flex flex-col ">
          <h2 className="md:text-2xl text-lg  font-medium text-[#3A3C3B]">
            Dashboard Overview
            <span className="block  text-sm font-normal">Welcome back! Here's what's happening with your TunedeRide platform today.</span>
          </h2>
        </div>
      </Flex>

      {/* Header right side */}
      <Flex align="center" gap={20}>
        {/* Notification */}
        <Link href={"/notifications"}>
          <div className="flex justify-center items-center size-12  rounded-full cursor-pointer relative border border-gray-400 ">
            <IoNotificationsOutline size={24} color="#545454" />
          </div>
        </Link>

        <Menubar className="py-6 rounded-full ">
          <MenubarMenu >
            <MenubarTrigger className="shadow-none px-0 rounded-full py-2">
              <div className="flex items-center gap-x-2  px-2 h-fit">
                <p className="text-black capitalize">{profileData?.data?.fullName || "N/A"}</p>
                {profileData?.data?.image ? <Avatar
                  src={imagePreview(profileData?.data?.image) || avatarImg.src}
                  size={40}
                  className="size-12"
                ></Avatar> : <CustomAvatar text={profileData?.data?.fullName?.charAt(0) || "N/A"} className="text-black" />}
              </div>
            </MenubarTrigger>

            <MenubarContent className="text-primary-gray">
              <Link href={"/personal-information"}>
                <MenubarItem className="hover:bg-gray-100 cursor-pointer">
                  Profile{" "}
                  <MenubarShortcut>
                    <ChevronRight size={16} />
                  </MenubarShortcut>
                </MenubarItem>
              </Link>
              <MenubarSeparator />
              <p>
                <MenubarItem onClick={() => { dispatch(logout()); router.refresh(); }} className="hover:bg-gray-100 cursor-pointer">Logout</MenubarItem>
              </p>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </Flex>
    </div>
  );
};

export default Navbar;
