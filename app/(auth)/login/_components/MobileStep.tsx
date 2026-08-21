import { Control, Controller } from "react-hook-form";
import { RegisterFormValues } from "./AuthForm";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import toPersianDigits from "utils/toPersianDigits";
import Textfield from "components/Textfield";

const PHONE_REGEX = /^9\d{9}$/;

type MobileStepProps = {
  control: Control<RegisterFormValues>;
  error?: string;
  handlePhoneStep: () => void;
  isSubmitting: boolean;
};

const MobileStep = ({
  control,
  error,
  handlePhoneStep,
  isSubmitting,
}: MobileStepProps) => {
  return (
    <Box>
      <Typography variant="body1" className="mb-3! font-bold">
        شماره موبایل خود را وارد کنید
      </Typography>

      <Box className="flex items-start">
        <Controller
          name="phone"
          control={control}
          rules={{
            required: "شماره موبایل را وارد کنید",
            pattern: {
              value: PHONE_REGEX,
              message: "شماره موبایل معتبر نیست",
            },
          }}
          render={({ field }) => (
            <Textfield
              {...field}
              fullWidth
              label="شماره موبایل"
              dir="ltr"
              icon={toPersianDigits("98+")}
              value={toPersianDigits(field.value)}
              onChange={(event) => {
                const value = event.target.value
                  .replace(/[۰-۹]/g, (digit) =>
                    String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)),
                  )
                  .replace(/\D/g, "")
                  .slice(0, 10);

                field.onChange(value);
              }}
              error={!!error}
              helperText={error}
              placeholder={toPersianDigits("9152002001")}
            />
          )}
        />
      </Box>
      <Box
        className="
                  mt-5
                  shrink-0
                  border-t
                  border-gray-200
                  pt-4
                "
      >
        <Button
          fullWidth
          size="large"
          variant="contained"
          onClick={handlePhoneStep}
          disabled={isSubmitting}
        >
          دریافت کد تأیید
        </Button>
      </Box>
    </Box>
  );
};

export default MobileStep;
