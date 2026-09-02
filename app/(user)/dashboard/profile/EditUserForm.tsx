"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import SubmitButton from "components/SubmitButton";
import TextField from "components/TextField";
import { useCompleteProfile } from "hooks/useCompleteProfile";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import type { FieldError } from "react-hook-form";
import toast from "react-hot-toast";
import { useUserStore } from "stores/user-store";
import PersonIcon from "@mui/icons-material/Person";
import * as yup from "yup";

type EditUserFormValues = {
  name: string;
  lastName: string;
  email: string;
};

const schema: yup.ObjectSchema<EditUserFormValues> = yup.object({
  name: yup
    .string()
    .matches(/^\p{L}+$/u, "نام فقط باید شامل حروف و بدون فاصله باشد")
    .min(3, "حداقل ۳ حرف وارد کنید")
    .required("نام الزامی است"),
  lastName: yup
    .string()
    .matches(/^[\p{L}\s]+$/u, "فقط حروف مجاز است")
    .min(3, "حداقل ۳ حرف وارد کنید")
    .required("نام خانوادگی الزامی است"),
  email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
});

const EditUserForm = () => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<EditUserFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
    },
    mode: "all",
  });

  const { user, setUser } = useUserStore();
  const { mutate: completeProfile, isPending } = useCompleteProfile();

  useEffect(() => {
    if (user && user.name) {
      const parts = user.name.trim().split(/\s+/);

      const name = parts[0] ?? "";
      const lastName = parts.slice(1).join(" ");
      reset({
        name: name ?? "",
        lastName: lastName ?? "",
        email: user.email ?? "",
      });
    }
  }, [user, reset]);

  const onSubmit = ({ email, lastName, name }: EditUserFormValues) => {
    completeProfile(
      { name: name + " " + lastName, email: email },
      {
        onSuccess: (data) => {
          setUser(data.user);
          toast.success("اطلاعات با موفقیت آپدیت شد");
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full relative h-100 md:w-2/3 flex flex-col gap-6 bg-white border border-gray-200 mx-auto mt-18 px-5 pb-5 pt-16 rounded-lg shadow-md"
    >
      <p className="absolute flex items-center gap-2 right-2 -top-8 w-fit text-white bg-primary-800  font-semibold px-5 py-3 rounded-md">
        <PersonIcon className="size-6!" />
        <span>اطلاعات کاربری</span>
      </p>
      <div>
        <Controller
          name="name"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              label="نام"
              type="text"
              dir="rtl"
              placeholder="نام"
              error={!!errors.name}
              ref={ref}
              {...field}
            />
          )}
        />

        <FieldError error={errors.name} />
      </div>

      <div>
        <Controller
          name="lastName"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              label="نام خانوادگی"
              type="text"
              dir="rtl"
              placeholder="نام خانوادگی"
              error={!!errors.lastName}
              ref={ref}
              {...field}
            />
          )}
        />

        <FieldError error={errors.lastName} />
      </div>

      <div>
        <Controller
          name="email"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              label="ایمیل"
              type="email"
              dir="rtl"
              placeholder="email@example.com"
              error={!!errors.email}
              ref={ref}
              {...field}
            />
          )}
        />

        <FieldError error={errors.email} />
      </div>

      <SubmitButton
        disabled={!isValid || !isDirty}
        loading={isPending}
        className="w-full mt-auto rounded-md"
      >
        ذخیره تغییرات
      </SubmitButton>
    </form>
  );
};

const FieldError = ({ error }: { error: FieldError | undefined }) =>
  error ? <span className="text-xs text-red-500">{error.message}</span> : null;

export default EditUserForm;
