import React from "react";
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

interface QuantityPickerProps {
  quantity: number;
}

export default function QuantityPicker({quantity}: QuantityPickerProps) {
  const [selectQuantity, setQuantityValue] = React.useState(quantity);

  return (
    <div className="flex flex-row bg-gray-100 rounded-lg">
      <button type="button" className="rounded-l-lg bg-gray-100 ease-in-out duration-300 hover:bg-gray-300 px-4">
        <MinusIcon
          className="w-3 h-3"
        >
        </MinusIcon>
      </button>
      <div className="text-sm text-gray-900 p-2">
          {quantity}
      </div>
      <button type="button" className="rounded-r-lg bg-gray-100 ease-in-out duration-300 hover:bg-gray-300 px-4">
        <PlusIcon
          className="w-3 h-3"
        >
        </PlusIcon>
      </button>
    </div>
  );
}