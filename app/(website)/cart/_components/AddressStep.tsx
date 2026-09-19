"use client";

import { AddressType } from "types/addressType";
import AddressForm from "./AddressForm";

type Props = {
  address: AddressType | null;
  onNext: (values: AddressType) => void;
  onBack: () => void;
};

const AddressStep = ({ address, onNext, onBack }: Props) => {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-5">
        <h1 className="text-lg font-bold text-secondary-900 md:text-xl">
          آدرس ارسال
        </h1>

        <p className="mt-2 text-sm text-secondary-500">
          آدرس محل تحویل سفارش را وارد کنید.
        </p>
      </div>

      <div className="rounded-2xl border border-secondary-100 bg-white p-4 md:p-6">
        <AddressForm
          defaultValues={address ?? undefined}
          onSubmit={onNext}
          onBack={onBack}
        />
      </div>
    </div>
  );
};

export default AddressStep;
