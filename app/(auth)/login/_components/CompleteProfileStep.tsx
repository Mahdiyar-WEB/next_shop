import { Control, Controller, FieldErrors } from "react-hook-form";
import { RegisterFormValues } from "./AuthForm";
import { Box, Button, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import TextField from "components/TextField";
import toPersianDigits from "utils/toPersianDigits";

type UserInfoStepProps = {
  control: Control<RegisterFormValues>;
  errors: FieldErrors<RegisterFormValues>;
  number: string;
  isCompletingProfile: boolean;
};

const CompleteProfileStep = ({
  control,
  errors,
  isCompletingProfile,
  number,
}: UserInfoStepProps) => {
  return (
    <Box>
      <Typography variant="body1" className="font-bold! space-x-1.5">
        <span>اطلاعات خود را برای شماره</span>
        <span>{toPersianDigits(number)}</span>
        <span>وارد کنید</span>
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        className="mb-6! mt-2!"
      >
        اطلاعات زیر برای ساخت حساب کاربری شما استفاده می‌شود.
      </Typography>

      <Box className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 mb-5">
        <Controller
          name="firstName"
          control={control}
          rules={{
            required: "نام را وارد کنید.",
            minLength: {
              value: 2,
              message: "نام حداقل ۲ کاراکتر باشد.",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              autoFocus
              fullWidth
              label="نام"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          )}
        />

        <Controller
          name="lastName"
          control={control}
          rules={{
            required: "نام خانوادگی را وارد کنید.",
            minLength: {
              value: 2,
              message: "نام خانوادگی حداقل ۲ کاراکتر باشد.",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="نام خانوادگی"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          )}
        />
        <div className="sm:col-span-2">
          <Controller
            name="email"
            control={control}
            rules={{
              required: "ایمیل را وارد کنید.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "ایمیل معتبر نیست.",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                dir="ltr"
                type="email"
                placeholder="test@gmail.com"
                fullWidth
                label="ایمیل"
                icon={<EmailIcon />}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </div>
      </Box>

      <Box className="mt-5 shrink-0 border-t border-gray-200 pt-4">
        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          loading={isCompletingProfile}
        >
          ثبت نام
        </Button>
      </Box>
    </Box>
  );
};

export default CompleteProfileStep;
