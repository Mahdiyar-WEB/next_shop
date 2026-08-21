"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Alert, Box, Typography } from "@mui/material";

import {
  PhoneAndroidOutlined,
  SmsOutlined,
  PersonOutlineOutlined,
} from "@mui/icons-material";
import MobileStep from "./MobileStep";
import OtpCheckStep from "./OtpCheckStep";
import CompleteProfileStep from "./CompleteProfileStep";

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
  const [serverError, setServerError] = useState("");

  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
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

    setServerError("");

    const phone = getValues("phone");

    console.log("Send OTP to:", `+98${phone}`);

    setResendCountdown(90);
    setActiveStep(1);
  };

  /*
   * ----------------------------------------
   * Step 2
   * ----------------------------------------
   */

  const handleOtpStep = async () => {
    const isValid = await trigger("otp");

    if (!isValid) return;

    setServerError("");

    const otp = getValues("otp");

    console.log("Verify OTP:", otp);

    setActiveStep(2);
  };

  /*
   * ----------------------------------------
   * Resend OTP
   * ----------------------------------------
   */

  const handleResendOtp = () => {
    if (resendCountdown > 0) return;

    const phone = getValues("phone");

    console.log("Resend OTP to:", `+98${phone}`);

    setValue("otp", "");
    setResendCountdown(90);
  };

  /*
   * ----------------------------------------
   * Wrong phone
   * ----------------------------------------
   */

  const handleWrongPhone = () => {
    setValue("otp", "");
    setResendCountdown(0);
    setServerError("");
    setActiveStep(0);
  };


  /*
   * ----------------------------------------
   * Final submit
   * ----------------------------------------
   */

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setServerError("");

      console.log("Register:", {
        ...data,
        phone: `+98${data.phone}`,
      });

      /*
       * API register
       */
    } catch {
      setServerError("ثبت نام انجام نشد. دوباره تلاش کنید.");
    }
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
            isSubmitting={isSubmitting}
            control={control}
            error={errors.phone?.message}
          />
        );

      case 1:
        return (
          <OtpCheckStep
            handleOtpStep={handleOtpStep}
            handleWrongPhone={handleWrongPhone}
            isSubmitting={isSubmitting}
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
            isSubmitting={isSubmitting}
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
          {serverError && (
            <Alert severity="error" className="mb-5">
              {serverError}
            </Alert>
          )}

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
