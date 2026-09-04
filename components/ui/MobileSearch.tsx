"use client";
import { useEffect, useState } from "react";
import SearchBox from "../common/SearchBox";

const MobileSearch = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="sticky bottom-6 w-fit mx-auto lg:hidden">
      {isMobile && (
        <SearchBox
          className="flex w-72 rounded-xl px-3 shadow-lg border border-secondary-50 duration-150 focus-within:border-primary-500 focus-within:shadow-primary-100"
          inputClassName="text-sm py-3"
        />
      )}
    </div>
  );
};

export default MobileSearch;
