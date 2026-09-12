"use client";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import HeadsetIcon from "@mui/icons-material/Headset";
import { usePathname, useRouter } from "next/navigation";

const ToggleCategories = () => {
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = pathname.split("/")[2] || "mobile";

  const handleChangeCategory = (
    _: React.MouseEvent<HTMLElement>,
    newCategory: string,
  ) => {
    if (!newCategory) return;

    router.push(`/categories/${newCategory}`);
  };

  return (
    <ToggleButtonGroup
      value={selectedCategory}
      onChange={handleChangeCategory}
      exclusive
      aria-label="device"
      dir="ltr"
    >
      <ToggleButton className="flex gap-1" value="laptop">
        <LaptopMacIcon />
        <span>لپ‌تاپ</span>
      </ToggleButton>

      <ToggleButton className="flex gap-1" value="accessories">
        <HeadsetIcon />
        <span>لوازم‌جانبی</span>
      </ToggleButton>

      <ToggleButton className="flex gap-1" value="mobile">
        <PhoneAndroidIcon />
        <span>موبایل</span>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleCategories;
