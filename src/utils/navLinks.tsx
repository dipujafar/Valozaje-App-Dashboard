import { RiDashboardHorizontalFill } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import { QrCode, Wallet } from "lucide-react";
import { BsPatchCheck, BsPeople } from "react-icons/bs";
import { TbAlertOctagonFilled } from "react-icons/tb";


export const navLinks = [
  {
    key: "dashboard",
    icon: <RiDashboardHorizontalFill size={18} />,
    label: <Link href={"/dashboard"}>Dashboard</Link>,
  },
  {
    key: "users",
    icon: <BsPeople size={18} />,
    label: <Link href={"/users"}>Users</Link>,
  },
  {
    key: "commissions",
    icon: <Wallet  size={18} />,
    label: <Link href={"/commissions"}>Commissions</Link>,
  },
  {
    key: "approval",
    icon: <BsPatchCheck  size={18} />,
    label: <Link href={"/approval"}>Approval</Link>,
  },
  {
    key: "claims",
    icon: <TbAlertOctagonFilled  size={18} />,
    label: <Link href={"/claims"}>Claims</Link>,
  },
  {
    key: "referrals",
    icon: <QrCode  size={18} />,
    label: <Link href={"/referrals"}>Referrals</Link>,
  },

  {
    key: "settings",
    icon: <IoSettingsOutline size={18} />,
    label: <span>Settings</span>,
    children: [
      {
        key: "Terms & Condition",
        label: <Link href={"/terms-condition "}>Terms & Condition </Link>,
      },
      {
        key: "contact",
        label: <Link href={"/contact"}>Contact</Link>,
      },
      {
        key: "Profile",
        label: <Link href={"/personal-information"}>Profile</Link>,
      }
    ]
  },
  // {
  //   key: "logout",
  //   icon: <RiLogoutCircleLine size={18} />,
  //   label: <Link href={"/login"}>Logout</Link>,
  // },
];
