"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import {
  PhoneAndroidOutlined,
  SmsOutlined,
  PersonOutlineOutlined,
} from "@mui/icons-material";
import MobileStep from "./MobileStep";
import OtpCheckStep from "./OtpCheckStep";
import CompleteProfileStep from "./CompleteProfileStep";
import { useRequestOtp, useVerifyOtp } from "hooks/use-auth";
import toast from "react-hot-toast";
import { useCompleteProfile } from "hooks/useCompleteProfile";
import { useRouter } from "next/navigation";

export type RegisterFormValues = {
  phone: string;
  otp: string;
  firstName: string;
  lastName: string;
  email: string;
};

const steps = [
  {
    label: "۱. شماره موبایل",
    icon: <PhoneAndroidOutlined />,
  },
  {
    label: "۲. تأیید شماره",
    icon: <SmsOutlined />,
  },
  {
    label: "۳. تکمیل اطلاعات",
    icon: <PersonOutlineOutlined />,
  },
];

export default function AuthForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [resendCountdown, setResendCountdown] = useState(0);
  const router = useRouter();
  const { mutate: sendOtp, isPending: isOtpLoading } = useRequestOtp();
  const { mutate: verifyOtp, isPending: isVerifyLoading } = useVerifyOtp();
  const { mutate: completeProfile, isPending: isCompletingProfile } =
    useCompleteProfile();

  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    mode: "onChange",
    defaultValues: {
      phone: "",
      otp: "",
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  useEffect(() => {
    if (resendCountdown <= 0) return;

    const timer = setInterval(() => {
      setResendCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCountdown]);

  const handlePhoneStep = async () => {
    const isValid = await trigger("phone");

    if (!isValid) return;
    const phone = getValues("phone");
    sendOtp(0 + phone, {
      onSuccess: (data) => {
        toast.success(data.message);
        setResendCountdown(90);
        setActiveStep(1);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  /*
   * ----------------------------------------
   * Step 2
   * ----------------------------------------
   */

  const handleOtpStep = async () => {
    const isValid = await trigger("otp");

    if (!isValid) return;

    const otp = getValues("otp");
    const phone = getValues("phone");

    verifyOtp(
      { phoneNumber: 0 + phone, code: otp },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          setActiveStep(2);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  /*
   * ----------------------------------------
   * Resend OTP
   * ----------------------------------------
   */

  const handleResendOtp = () => {
    if (resendCountdown > 0) return;

    const phone = getValues("phone");

    sendOtp(0 + phone, {
      onSuccess: (data) => {
        toast.success(data.message);
        setValue("otp", "");
        setResendCountdown(90);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  /*
   * ----------------------------------------
   * Wrong phone
   * ----------------------------------------
   */

  const handleWrongPhone = () => {
    setValue("otp", "");
    setResendCountdown(0);
    setActiveStep(0);
  };

  /*
   * ----------------------------------------
   * Final submit
   * ----------------------------------------
   */

  const onSubmit = async (data: RegisterFormValues) => {
    const name = data.firstName + " " + data.lastName;
    const payload = { name, email: data.email };
    completeProfile(payload, {
      onSuccess: (data) => {
        toast.success(data.message);
        setTimeout(() => {
          router.push("/");
        }, 1500);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  /*
   * ----------------------------------------
   * Render Step
   * ----------------------------------------
   */

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <MobileStep
            handlePhoneStep={handlePhoneStep}
            isOtpLoading={isOtpLoading}
            control={control}
            error={errors.phone?.message}
          />
        );

      case 1:
        return (
          <OtpCheckStep
            handleOtpStep={handleOtpStep}
            handleWrongPhone={handleWrongPhone}
            isVerifyLoading={isVerifyLoading}
            control={control}
            error={errors.otp?.message}
            phone={getValues("phone")}
            resendCountdown={resendCountdown}
            onResend={handleResendOtp}
          />
        );

      case 2:
        return (
          <CompleteProfileStep
            isCompletingProfile={isCompletingProfile}
            control={control}
            errors={errors}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Box
      className="
        flex
        min-h-full
        w-full
        items-center
        justify-center
        sm:p-6
        bg-white
      "
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className="
          flex
          w-full
          max-w-175
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-secondary-50/50
          bg-white
          px-4
          py-8
          shadow-lg
          sm:px-5
          max-h-[calc(100dvh-2rem)]
          sm:max-h-[calc(100dvh-3rem)]
        "
      >
        {/* -------------------------------- */}
        {/* Header */}
        {/* -------------------------------- */}

        <Box className="shrink-0 text-center">
          <Typography variant="h5" className="font-bold! sm:text-3xl!">
            خوش آمدید 👋
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{ color: "text.secondary" }}
            className="mt-2!"
          >
            برای ایجاد حساب کاربری یا ورود مراحل زیر را تکمیل کنید
          </Typography>
        </Box>

        {/* -------------------------------- */}
        {/* Stepper */}
        {/* -------------------------------- */}

        <div
          className="
            mt-7
            mb-7
            flex
            w-full
            shrink-0
            items-start
            px-0
            sm:mt-8
            sm:mb-8
            sm:px-6
          "
          dir="rtl"
        >
          {steps.map((step, index) => {
            const isCompleted = index < activeStep;
            const isActive = index === activeStep;

            return (
              <React.Fragment key={step.label}>
                {/* Step */}
                <div className="flex shrink-0 flex-col items-center">
                  <div
                    className={`
                      flex
                      p-2
                      items-center
                      justify-center
                      rounded-full
                      border-2
                      transition-all
                      duration-300
                      
                      ${
                        isCompleted || isActive
                          ? "border-primary-800 bg-primary-800 text-white"
                          : "border-gray-300 bg-white text-gray-400"
                      }

                    `}
                  >
                    {step.icon}
                  </div>

                  <span
                    className={`
                      mt-2
                      whitespace-nowrap
                      text-[11px]
                      font-medium
                      transition-colors
                      duration-300
                      sm:text-xs

                      ${
                        isCompleted || isActive
                          ? "text-primary-800"
                          : "text-gray-400"
                      }
                    `}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connector */}
                {index < steps.length - 1 && (
                  <div
                    className="
                      relative
                      mt-5
                      h-0.5
                      min-w-0
                      flex-1
                      overflow-hidden
                      bg-gray-300
                    "
                  >
                    <div
                      className={`
                        absolute
                        inset-y-0
                        right-0
                        bg-primary-800
                        transition-[width]
                        duration-700
                        ease-out

                        ${isCompleted ? "w-full" : "w-0"}
                      `}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
        <Box
          className="
            min-h-0
            flex-1
            overflow-y-auto
            px-0.5
          "
        >
          <div
            key={activeStep}
            className="
              animate-in!
              fade-in!
              slide-in-from-left-4!
              duration-300
            "
          >
            {renderStep()}
          </div>
        </Box>
      </Box>
    </Box>
  );
}
