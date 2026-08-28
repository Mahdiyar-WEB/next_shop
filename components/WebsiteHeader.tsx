"use client";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useUserStore } from "stores/user-store";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LoginIcon from "@mui/icons-material/Login";
import { User } from "types/userType";
import truncateText from "utils/truncateText";

const RootLayoutHeader = () => {
  const { user, isLoading } = useUserStore();

  return (
    <header className="sticky top-4 z-50 w-[95%] 2xl:max-w-screen-2xl mx-auto mb-10 ">
      <div className="bg-white/50 backdrop-blur-xs border border-secondary-50 rounded-2xl px-4 md:px-8 min-h-17">
        <nav className="flex items-center justify-between min-h-17">
          <div className="flex items-center gap-6 md:gap-8 min-w-0">
            <Link href="/" className="hidden md:flex items-center gap-1">
              <Image
                src="/logo.webp"
                width={200}
                height={200}
                alt="logo"
                className="w-10 h-9 border"
              />
              <span className="font-black text-xl text-secondary-900 whitespace-nowrap">
                ویرا
              </span>
            </Link>

            <ul className="flex items-center gap-6 md:gap-8">
              <li>
                <HeaderLink path="/" text="خانه" />
              </li>
              <li>
                <HeaderLink path="/blogs" text="بلاگ‌ها" />
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-end min-w-33 h-12 shrink-0">
            {isLoading ? (
              <div className="w-17 h-10 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
              </div>
            ) : user ? (
              <ProfileMenu user={user} />
            ) : (
              <Link
                href="/login"
                className="h-10.5 px-3 flex items-center justify-center gap-x-1 text-sm font-medium text-secondary-900 rounded-lg border border-secondary-50"
              >
                <LoginIcon className="rotate-180" />
                <span>ورود | ثبت‌نام</span>
              </Link>
            )}
            <Link
              href="/cart"
              className="ps-5 text-secondary-900 ms-3 border-r border-secondary-50"
            >
              <ShoppingCartOutlinedIcon className="h-7! w-7!" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

const ProfileMenu = ({ user }: { user: User }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  return (
    <>
      <button
        onClick={handleClick}
        aria-controls={open ? "profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open}
        className={`cursor-pointer rounded-md text-secondary-800 py-1 ${open ? "bg-secondary-50/50" : ""}`}
      >
        <PersonOutlineOutlinedIcon className="h-8.5! w-8.5! -me-1" />
        <ArrowDropDownIcon />
      </button>
      <Menu
        anchorEl={anchorEl}
        id="profile-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        dir="rtl"
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.2))",
              mt: 1,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                // ml: -0.5,
                // mr: 1,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose} sx={{ padding: 0 }} divider>
          <Link
            href="/profile"
            className="w-full flex items-center justify-between py-4 px-2.5"
          >
            {truncateText(user.name || "پروفایل", 15)}
            <ArrowBackIosNewIcon sx={{ height: 16, width: 16 }} />
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

const HeaderLink = ({
  path = "/",
  text,
  className = "",
  prefetch = "auto",
}: {
  path: string;
  text: string;
  className?: string;
  prefetch?: "auto";
}) => {
  const pathName = usePathname();

  const active =
    path === "/"
      ? pathName === "/"
      : pathName === path || pathName.startsWith(`${path}/`);

  return (
    <Link
      prefetch={prefetch}
      href={path}
      className={`relative inline-flex items-center h-10 font-semibold transition-colors duration-200 ${
        active
          ? "text-primary-700"
          : "text-secondary-900 hover:text-primary-500"
      } ${className}`}
    >
      {text}
      {active && (
        <span className="absolute bottom-0 right-0 w-full h-0.5 bg-primary-700 rounded-full" />
      )}
    </Link>
  );
};

export default RootLayoutHeader;
