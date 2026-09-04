"use client";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Logout from "@mui/icons-material/Logout";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LoginIcon from "@mui/icons-material/Login";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUserStore } from "stores/user-store";
import SearchBox from "../common/SearchBox";
import { User } from "types/userType";

const RootLayoutHeader = () => {
  const { user, isLoading } = useUserStore();
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 ">
      <div className="h-7 w-full bg-sky-600 flex items-center gap-1 justify-center text-white text-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
        <span>ویرا مرجع فروش لوازم دیجیتال به صورت نقد و اقساط</span>
        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
      </div>
      <div className="bg-white/50 backdrop-blur-xs pt-1 px-2 sm:px-4 md:px-8 min-h-17 w-full sm:w-[95%] 2xl:max-w-screen-2xl mx-auto mb-10 sm:rounded-b-2xl border border-secondary-50/50">
        <nav className="flex items-center justify-between min-h-17">
          <div className="flex items-center gap-6 lg:gap-6 min-w-0">
            <Link href="/" className="flex items-center gap-1">
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
            <div className="hidden lg:flex">
              {isDesktop && (
                <SearchBox
                  className="flex border border-secondary-100 rounded-xl px-2 w-96 duration-150 focus-within:border-primary-500 focus-within:shadow-md focus-within:shadow-primary-100"
                  inputClassName="text-sm py-2"
                />
              )}
            </div>
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
              className="ps-3 md:ps-5 text-secondary-900 ms-1 md:ms-3 border-r border-secondary-50"
            >
              <ShoppingCartOutlinedIcon className="h-6.5! w-6.5!" />
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
        <PersonOutlineOutlinedIcon className="w-7! h-7! -me-1" />
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
              width: 200,
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.2))",
              mt: 1,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose} sx={{ padding: 0 }} divider>
          <Link
            href={user.role === "ADMIN" ? "/admin" : "/dashboard"}
            className="w-full flex items-center justify-between py-4 px-2.5"
          >
            {user.role === "ADMIN" ? "پنل ادمین" : "پنل کاربری"}
            <ArrowBackIosNewIcon sx={{ height: 16, width: 16 }} />
          </Link>
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          className="py-3! space-x-2 text-red-500! text-sm!"
        >
          <Logout fontSize="small" />
          <span>خروج از حساب</span>
        </MenuItem>
      </Menu>
    </>
  );
};

export default RootLayoutHeader;
