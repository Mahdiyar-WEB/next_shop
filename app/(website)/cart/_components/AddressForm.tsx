"use client";

import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Textfield from "components/common/TextField";
import Select from "components/common/Select";
import Button from "components/common/Button";

import iranLocations from "constants/locations.json";
import { AddressType } from "types/addressType";

type Props = {
  defaultValues?: Partial<AddressType>;
  onSubmit: (values: AddressType) => void;
  onBack: () => void;
};

const schema = yup.object({
  province: yup.string().required("استان را انتخاب کنید"),
  city: yup.string().required("شهر را انتخاب کنید"),
  street: yup
    .string()
    .trim()
    .required("خیابان را وارد کنید")
    .min(8, "حداقل ۸ حرف وارد کنید"),
  plaque: yup.string().trim().required("پلاک را وارد کنید"),
  unit: yup.string().trim().required("واحد را وارد کنید"),
});

const AddressForm = ({ defaultValues, onSubmit, onBack }: Props) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AddressType>({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: {
      province: defaultValues?.province ?? "",
      city: defaultValues?.city ?? "",
      street: defaultValues?.street ?? "",
      plaque: defaultValues?.plaque ?? "",
      unit: defaultValues?.unit ?? "",
    },
  });

  const province = useWatch({
    control,
    name: "province",
  });

  const selectedProvince = iranLocations.find((item) => item.id === province);

  const provinceOptions = iranLocations.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const cityOptions =
    selectedProvince?.cities.map((city) => ({
      value: city.id,
      label: city.name,
    })) ?? [];

  useEffect(() => {
    if (!province) {
      setValue("city", "");
      return;
    }

    const currentCityExists = selectedProvince?.cities.some(
      (city) => city.id === defaultValues?.city,
    );

    if (!currentCityExists) {
      setValue("city", "");
    }
  }, [province, selectedProvince, setValue, defaultValues?.city]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Controller
          name="province"
          control={control}
          render={({ field }) => (
            <div className="h-12">
              <Select
                value={field.value}
                onChange={field.onChange}
                options={provinceOptions}
                placeholder="استان"
              />

              {errors.province?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.province.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <div className="h-12">
              <Select
                value={field.value}
                onChange={field.onChange}
                options={cityOptions}
                placeholder="شهر"
                disabled={!province}
              />

              {errors.city?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.city.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      <Controller
        name="street"
        control={control}
        render={({ field }) => (
          <Textfield
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            label="خیابان"
            error={!!errors.street}
            helperText={errors.street?.message}
            fullWidth
          />
        )}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Controller
          name="plaque"
          control={control}
          render={({ field }) => (
            <Textfield
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              label="پلاک"
              error={!!errors.plaque}
              helperText={errors.plaque?.message}
              inputMode="numeric"
              fullWidth
            />
          )}
        />

        <Controller
          name="unit"
          control={control}
          render={({ field }) => (
            <Textfield
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              label="واحد"
              error={!!errors.unit}
              helperText={errors.unit?.message}
              inputMode="numeric"
              fullWidth
            />
          )}
        />
      </div>

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="w-full sm:w-auto"
        >
          بازگشت
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:min-w-40 sm:w-auto"
        >
          ادامه و انتخاب روش پرداخت
        </Button>
      </div>
    </form>
  );
};

export default AddressForm;
