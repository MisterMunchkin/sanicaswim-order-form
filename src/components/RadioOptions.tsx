import { useState } from "react";
import { RadioGroup } from '@headlessui/react';
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { OrderTypeName, OrderTypeRadioInterface } from "@/interfaces/order-type-radio";

interface RadioOptionsProps {
  label: string;
  options: Array<OrderTypeRadioInterface>;
  handleUpdatedSelection: (updatedSelection: OrderTypeName) => void;
}

export default function RadioOptions({label, options, handleUpdatedSelection}: RadioOptionsProps) {
  const [selected, setSelected] = useState(options[0].name);

  const updateSelection = (selection: OrderTypeName) => {
    setSelected(selection);
    handleUpdatedSelection(selection);
  }

  return (
      <>
        {label && options && options.length > 0 && (
          <RadioGroup value={selected} onChange={updateSelection}
            id="order-type"
          >
            <RadioGroup.Label className="block text-sm font-medium leading-6 text-gray-900">{label}</RadioGroup.Label>
            <div className="space-y-2">
            {options.map((option, index) => (
              <RadioGroup.Option 
                key={option.name}
                value={option.name}
                className={({checked}) =>
                  `${checked ? 'bg-ss-pink' : ''}
                  relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none
                  `
                }
              >
                {({ checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-semibold ${checked ? 'text-ss-blue' : 'text-gray-900'}`}
                          >
                            {option.name}
                          </RadioGroup.Label>
                          {option.description && (
                            <RadioGroup.Description
                              as="span"
                              className={`inline ${checked ? 'text-ss-blue/75': 'text-gray-500'}`}
                            >
                              <span>{option.description}</span>
                            </RadioGroup.Description>
                          )}
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 px-2">
                          <CheckBadgeIcon className="h-5 w-5 text-ss-blue" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
            </div>
          </RadioGroup>
        )}
      </>
  )
}