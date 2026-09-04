import { Control, Controller } from "react-hook-form";
import { RegisterFormValues } from "./AuthForm";
import { Box, Button, Typography } from "@mui/material";
import toPersianDigits from "utils/toPersianDigits";
import OtpInput from "components/common/OtpInput";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

type OtpStepProps = {
  control: Control<RegisterFormValues>;
  error?: string;
  phone: string;
  resendCountdown: number;
  onResend: () => void;
  handleWrongPhone: () => void;
  handleOtpStep: () => void;
  isVerifyLoading: boolean;
};

const OtpCheckStep = ({
  control,
  phone,
  resendCountdown,
  onResend,
  handleOtpStep,
  handleWrongPhone,
  isVerifyLoading,
}: OtpStepProps) => {
  const formatCountdown = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  return (
    <Box>
      <Typography
        variant="body2"
        color="text.secondary"
        className="mb-3! flex flex-wrap items-center gap-x-1 gap-y-1"
      >
        <span>کد ارسال شده به شماره</span>

        <span className="font-bold text-secondary-900">
          {toPersianDigits(0 + phone)}
        </span>

        <span>را وارد کنید</span>

        <Button
          type="button"
          onClick={onResend}
          disabled={resendCountdown > 0}
          size="small"
          className="mr-1!"
        >
          {resendCountdown > 0
            ? `ارسال مجدد (${toPersianDigits(formatCountdown(resendCountdown))})`
            : "ارسال مجدد کد"}
        </Button>
      </Typography>

      <Controller
        name="otp"
        control={control}
        rules={{
          required: "کد تأیید را وارد کنید",
          pattern: {
            value: /^\d{6}$/,
            message: "کد تأیید باید ۶ رقم باشد",
          },
        }}
        render={({ field, fieldState }) => (
          <OtpInput
            length={6}
            value={field.value ?? ""}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Box
        className="
                  mt-5
                  shrink-0
                  border-t
                  border-gray-200
                  pt-4
                "
      >
        <Box className="flex flex-col gap-3 sm:grid sm:grid-cols-2">
          <Button
            fullWidth
            variant="outlined"
            color="info"
            onClick={handleWrongPhone}
            className="flex items-baseline"
          >
            <ArrowRightAltIcon />
            <span>شماره اشتباه است؟</span>
          </Button>

          <Button
            fullWidth
            variant="contained"
            onClick={handleOtpStep}
            loading={isVerifyLoading}
          >
            تأیید کد
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default OtpCheckStep;
