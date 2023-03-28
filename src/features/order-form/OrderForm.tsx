"use client";

import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "yup-phone-lite";

import { SizeTypes } from '../../enums/size';
import { useAppSelector } from "@/hooks";

const orderSchema = yup.object().shape({
  name: yup.string().required(),
  size: yup.mixed<SizeTypes>().oneOf(Object.values(SizeTypes)).required(),
  quantity: yup.number().positive('Must be more than 0').required()
});

const orderFormSchema = yup.object().shape({
  instagramLink: yup.string().url().required("is required"),
  fullName: yup.string().required("is required"),
  phoneNumber: yup.string().phone("PH", "is innvalid").required("is required"),
  // orders: yup.array().of(yup.string()).min(1).required("Atleast 1 order is required"),
  address: yup.string().required("is required"),
});

export default function OrderForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const selectedProductList = useAppSelector((state) => state.selectedProductList.value);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(orderFormSchema)
  });

  const onSubmit = async (data) => {
    console.log(data);
    setSubmitting(true);
    setSubmitError(null);

    try {
      // await axios.post("/api/orders", formData);
      console.log(data);
      setSubmitSuccess(true);
    } catch (error: any) {
      setSubmitError(error);
    }

    setSubmitting(false);
  }

  return (
    <div className="max-w-md w-full">
      <div className='mt-5 md:col-span-2 md:mt-0'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="overflow-hidden drop-shadow rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="instagramLink">
                    Instagram Link
                    {errors.instagramLink && (
                      <span className="text-red-500 mt-1 pl-1">{typeof errors.instagramLink.message === 'string' ? errors.instagramLink.message : 'Invalid input'}</span>
                    )}
                  </label>
                  <input
                    type="text"
                    id="instagramLink"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 drop-shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ss-pink sm:text-sm sm:leading-6"
                    placeholder="Enter Instagram link"
                    {...register("instagramLink")}
                  />
                  
                </div>

                <div className="col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="fullName">
                    Full Name
                    {errors.fullName && (
                      <span className="text-red-500 mt-1 pl-1">{typeof errors.fullName.message === 'string' ? errors.fullName.message : 'Invalid input'}</span>
                    )}
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 drop-shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ss-pink sm:text-sm sm:leading-6"
                    placeholder="Enter Full name"
                    {...register("fullName")}
                  />
                </div>
                
                <div className="col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="phoneNumber">
                    Phone Number
                    {errors.phoneNumber && (
                      <span className="text-red-500 mt-1 pl-1">{typeof errors.phoneNumber.message === 'string' ? errors.phoneNumber.message : 'Invalid input'}</span>
                    )}
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 drop-shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ss-pink sm:text-sm sm:leading-6"
                    placeholder="Enter Phone Number"
                    {...register("phoneNumber")}
                  />
                </div>

                <div className="col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="address">
                    Address
                    {errors.address && (
                      <span className="text-red-500 mt-1 pl-1">{typeof errors.address.message === 'string' ? errors.address.message : 'Invalid input'}</span>
                    )}
                  </label>
                  <textarea
                    id="address"
                    rows={3}
                    className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 drop-shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ss-pink sm:text-sm sm:leading-6"
                    placeholder="Enter delivery address"
                    {...register("address")}
                  ></textarea>
                </div>

                {/* <div className="col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="orders">
                    Orders
                  </label>
                  <select
                    id="orders"
                    className={`${errors.orders ? "border-red-500" : ""} mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 drop-shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ss-pink sm:text-sm sm:leading-6`}
                    {...register("orders")}
                  >
                    <option value="Product A">Product A</option>
                    <option value="Product B">Product B</option>
                    <option value="Product C">Product C</option>
                  </select>
                  {errors.orders && (
                    <p className="text-red-500 mt-1">{typeof errors.orders.message === 'string' ? errors.orders.message : 'Invalid input'}</p>
                  )}
                </div> */}

                <div className="col-start-2 col-span-1 place-content-center">
                  <button
                    type="submit"
                    className="inline-flex justify-center w-full py-2 px-3 rounded-md bg-ss-blue text-sm font-semibold text-ss-pink drop-shadow-sm hover:bg-ss-pink hover:text-ss-blue"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div>
          {selectedProductList.map((product) => (
            <span key={product.id}>{product.name}</span>
          ))}
        </div>
      </div>
    </div>
  )
}