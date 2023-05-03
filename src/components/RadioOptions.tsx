import { useState } from "react";
import { RadioGroup } from '@headlessui/react';

interface RadioOptionsProps {
  label: string;
  options: Array<string>;
  handleUpdatedSelection: (updatedSelection: string) => void;
}

export default function RadioOptions({label, options, handleUpdatedSelection}: RadioOptionsProps) {
  const [selected, setSelected] = useState(options[0]);

  
  return (
    <>
      <RadioGroup value={selected} onChange={setSelected}
        id="order-type"
      >
        <RadioGroup.Label className="block text-sm font-medium leading-6 text-gray-900">{label}</RadioGroup.Label>
        <div className="space-y-2">
         {options.map((option) => (
          <RadioGroup.Option 
            key={option}
            value={option}
          >
            {({ checked }) => (
              <>
                <div className={checked ? 'bg-ss-pink' : ''}>
                  {option}
                  <div className="shrink-0">
                    <CheckIcon className="h-6 w-6" />
                  </div>
                </div>
                
              </>
            )}
          </RadioGroup.Option>
         ))}
        </div>
        {/* <RadioGroup.Option 
          key="Order"
          value="Order"
        >
          {({ checked }) => (
            <span className={checked ? 'bg-ss-pink' : ''}>Order</span>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option 
          key="Pre Order"
          value="Pre Order"
        >
          {({ checked }) => (
            <span className={checked ? 'bg-ss-pink' : ''}>Pre Order</span>
          )}
        </RadioGroup.Option> */}
      </RadioGroup>
    </>
  )
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}