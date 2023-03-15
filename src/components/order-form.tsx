"use client";

import { useState } from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SizeTypes } from '../enums/size';

const orderSchema = yup.object().shape({
  name: yup.string().required(),
  size: yup.mixed<SizeTypes>().oneOf(Object.values(SizeTypes)).required(),
  price: yup.number().positive('Must be more than 0').required()
});

const orderFormSchema = yup.object().shape({
  instagramLink: yup.string().url().required(),
  orders: yup.array().of(yup.string()).min(1).required(),
  address: yup.string().required(),
  proofOfPayment: yup.mixed().required()
});

export default function OrderForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(orderFormSchema)
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    setSubmitError(null);

    const formData = new FormData();
    formData.append("instagramLink", data.instagramLink);
    formData.append("orders", data.orders.join(","));
    formData.append("address", data.address);
    formData.append("proofOfPayment", data.proofOfPayment[0]);

    try {
      await axios.post("/api/orders", formData);
      setSubmitSuccess(true);
    } catch (error: any) {
      setSubmitError(error);
    }

    setSubmitting(false);
  }

  return (
    <div className="mt-10 sm:mt-0">
      <div className='mt-5 md:col-span-2 md:mt-0'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="overflow-hidden shadow rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="instagramLink">
                    Instagram Link
                  </label>
                  <input
                    type="text"
                    id="instagramLink"
                    className={`${errors.instagramLink ? "border-red-500" : ""} mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-pink-300 sm:text-sm sm:leading-6`}
                    placeholder="Enter Instagram link"
                    {...register("instagramLink")}
                  />
                  {errors.instagramLink && (
                    <p className="text-red-500 mt-1">{typeof errors.instagramLink.message === 'string' ? errors.instagramLink.message : 'Invalid input'}</p>
                  )}
                </div>

                <div className="col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="orders">
                    Orders
                  </label>
                  <select
                    id="orders"
                    className={`${errors.orders ? "border-red-500" : ""} mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-pink-300 sm:text-sm sm:leading-6`}
                    {...register("orders")}
                  >
                    <option value="Product A">Product A</option>
                    <option value="Product B">Product B</option>
                    <option value="Product C">Product C</option>
                  </select>
                  {errors.orders && (
                    <p className="text-red-500 mt-1">{typeof errors.orders.message === 'string' ? errors.orders.message : 'Invalid input'}</p>
                  )}
                </div>

                <div className="col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="address">
                    Address
                  </label>
                  <textarea
                    id="address"
                    rows={3}
                    className={`${errors.address ? "border-red-500" : ""} mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-pink-300 sm:text-sm sm:leading-6`}
                    placeholder="Enter delivery address"
                    {...register("address")}
                  ></textarea>
                  {errors.address && (
                    <p className="text-red-500 mt-1">{typeof errors.address.message === 'string' ? errors.address.message : 'Invalid input'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}