import React from "react";

type Props = {
  title: string;
};

const Badge = ({ title }: Props) => {
  return (
    <div className="bg-blue-50 border border-primary-800 rounded-2xl px-3 py-1 text-sm font-medium shadow-sm min-w-12 text-center cursor-pointer hover:bg-primary-900 hover:text-white duration-200 ease-in-out">
      {title}
    </div>
  );
};

export default Badge;
