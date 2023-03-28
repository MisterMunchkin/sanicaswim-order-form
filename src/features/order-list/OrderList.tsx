import { useAppSelector } from "@/hooks";


export default function OrderList() {
  const selectedProductList = useAppSelector((state) => state.selectedProductList.value);
  
  return (
    <div className="max-w-md w-full">
      <div className="mt-5 md:col-span-2 md:mt-0">
        
      </div>
    </div>
  )
}