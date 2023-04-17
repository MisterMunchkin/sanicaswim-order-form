"use client";

import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "yup-phone-lite";

import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { OrderFormInterface } from './order-form';

// const orderSchema = yup.object().shape({
//   name: yup.string().required(),
//   size: yup.mixed<SizeTypes>().oneOf(Object.values(SizeTypes)).required(),
//   quantity: yup.number().positive('Must be more than 0').required()
// });

const orderFormSchema = yup.object().shape({
  instagramLink: yup.string().url().required("is required"),
  fullName: yup.string().required("is required"),
  phoneNumber: yup.string().phone("PH").required("is required"),
  // orders: yup.array().of(yup.string()).min(1).required("Atleast 1 order is required"),
  address: yup.object().shape({
    addressLine1: yup.string().required("is required"),
    addressLine2: yup.string(),
    city: yup.string().required("is required"),
    province: yup.string().required("is required"),
    country: yup.string().required("is required"),
    postCode: yup.number().required("is required")
  }),
  order: yup.string().required("is required")
});

export default function OrderForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormInterface>({
    resolver: yupResolver(orderFormSchema)
  });

  const onSubmit: SubmitHandler<OrderFormInterface> = async (data) => { //This whole method should be a utility function in another folder.
    debugger;
    setSubmitting(true);
    setSubmitError(null);
    let isValid = await orderFormSchema.isValid(data);

    if (!isValid) {
      setSubmitting(false);
      console.log('invalid form');
      return;
    }
    
    try {
      console.log(data);
      // const response = await fetch('/api/orders', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json'},
      //   body: JSON.stringify(data)
      // });

      // if (response.status === 200) {
      //   console.log('Form submitted');
      // } else {
      //   console.error('Form failed.');
      // }
      
      setSubmitSuccess(true);
    } catch (error: any) {
      setSubmitError(error);
    }

    setSubmitting(false);
  }

  return (
    <div className="max-w-md w-full">
      <div className='mt-5 md:col-span-2 md:mt-0'>
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          action="/"
          name="order-form" 
          method="POST" 
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="order-form"/>
          <input type="hidden" name="bot-field" />
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
                    {...register("phoneNumber")}
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="address-line1">
                    Street Address
                    {errors.address && errors.address.addressLine1 && (
                      <span className="text-red-500 mt-1 pl-1">{typeof errors.address.addressLine1.message === 'string' ? errors.address.addressLine1.message : 'Invalid input'}</span>
                    )}
                  </label>
                  <input
                    type="text"
                    id="address-line1"
                    className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 drop-shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ss-pink sm:text-sm sm:leading-6"
                    {...register("address.addressLine1")}
                  />
                </div>

                <div className="col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="address-line2">
                    Apt, Suite, Floor, Building, etc.
                    {errors.address && errors.address.addressLine2 && (
                      <span className="text-red-500 mt-1 pl-1">{typeof errors.address.addressLine2.message === 'string' ? errors.address.addressLine2.message : 'Invalid input'}</span>
                    )}
                  </label>
                  <input
                    type="text"
                    id="address-line2"
                    className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 drop-shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ss-pink sm:text-sm sm:leading-6"
                    {...register("address.addressLine2")}
                  />
                </div>

                <div className="col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="city">
                    City
                    {errors.address && errors.address.city && (
                      <span className="text-red-500 mt-1 pl-1">{typeof errors.address.city.message === 'string' ? errors.address.city.message : 'Invalid input'}</span>
                    )}
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 drop-shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ss-pink sm:text-sm sm:leading-6"
                    {...register("address.city")}
                  />
                </div>

                <div className="col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="province">
                    Province
                    {errors.address && errors.address.province && (
                      <span className="text-red-500 mt-1 pl-1">{typeof errors.address.province.message === 'string' ? errors.address.province.message : 'Invalid input'}</span>
                    )}
                  </label>
                  <input
                    type="text"
                    id="province"
                    className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 drop-shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ss-pink sm:text-sm sm:leading-6"
                    {...register("address.province")}
                  />
                </div>

                <div className="col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="country">
                    Country
                    {errors.address && errors.address.country && (
                      <span className="text-red-500 mt-1 pl-1">{typeof errors.address.country.message === 'string' ? errors.address.country.message : 'Invalid input'}</span>
                    )}
                  </label>
                  <input
                    type="text"
                    id="country"
                    className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 drop-shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ss-pink sm:text-sm sm:leading-6"
                    {...register("address.country")}
                  />
                </div>

                <div className="col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="postcode">
                    Post Code
                    {errors.address && errors.address.postCode && (
                      <span className="text-red-500 mt-1 pl-1">{typeof errors.address.postCode.message === 'string' ? errors.address.postCode.message : 'Invalid input'}</span>
                    )}
                  </label>
                  <input
                    type="number"
                    id="country"
                    className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 drop-shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ss-pink sm:text-sm sm:leading-6"
                    {...register("address.postCode")}
                  />
                </div>

                <div className="col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="order">
                      Orders
                    {errors.order && (
                      <span className="text-red-500 mt-1 pl-1">{typeof errors.order.message === 'string' ? errors.order.message : 'Invalid input'}</span>
                    )}
                  </label>
                  <textarea
                    id="order"
                    rows={3}
                    className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 drop-shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ss-pink sm:text-sm sm:leading-6"
                    placeholder="1 x S - Parakeet Monokini"
                    {...register("order")}
                  ></textarea>
                </div>
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
      </div>
    </div>
  )
}