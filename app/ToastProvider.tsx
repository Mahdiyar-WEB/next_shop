"use client";

import { useEffect } from "react";
import { Toaster, toast, useToasterStore } from "react-hot-toast";

const TOAST_LIMIT = 3;

function ToastProvider() {
  const { toasts } = useToasterStore();

  useEffect(() => {
    // فیلتر کردن توست‌هایی که در حال حاضر فعال و قابل مشاهده هستند
    const visibleToasts = toasts.filter((t) => t.visible);

    if (visibleToasts.length > TOAST_LIMIT) {
      // پیدا کردن توست‌های قدیمی‌تر جهت حذف
      const toastsToDismiss = visibleToasts.slice(TOAST_LIMIT);
      
      // استفاده از setTimeout برای خارج کردن عملیات dismiss از چرخه رندر فعلی React
      // این کار مانع از مسدود شدن یا نادیده گرفته شدن توست‌های جدید می‌شود
      setTimeout(() => {
        toastsToDismiss.forEach((t) => {
          toast.dismiss(t.id);
        });
      }, 0);
    }
  }, [toasts]);

  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 3000,
      }}
    />
  );
}

export default ToastProvider;
