import React from "react";
import { ChangeEvent } from "react";

interface SizeSlectProps {
  sizeOptions: string[];
  handleSizeChange: (selectedSize: string) => void
}
  
export const SizeSelect = ({sizeOptions, handleSizeChange} : SizeSlectProps) => {
  const [selectValue, setSelectValue] = React.useState("S");

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectValue(value);
    handleSizeChange(value);
  };

  return (
    <select 
    className=" text-sm rounded-lg focus:ring-ss-pink focus:border-ss-pink block w-16 p-2.5"
    value={selectValue}
    onChange={onChange}
    >
    {sizeOptions.map((sizeOption) => (
        <option key={sizeOption} value={sizeOption}>{sizeOption}</option>
    ))}
    </select>
  );
}