"use client";

import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "yup-phone-lite";

import { OrderFormInterface } from '../interfaces/order-form';
import LoadingSpinner from "./LoadingSpinner";
import { NextResponse } from "next/server";
import OrderSuccessModal from "./OrderSuccessModal";
import OrderFailedModal from "./OrderFailedModal";

// const TEST_VALUES: OrderFormInterface = {
//   instagramLink: 'https://www.instagram.com/robindalmy/',
//   fullName: 'Robin Tubungbanua',
//   phoneNumber: '09190011652',
//   address: {
//     addressLine1: 'A4J Pacific Square Residences',
//     addressLine2: 'F. Cabahug St.',
//     barangay: 'Mabolo',
//     city: 'Cebu',
//     province: 'Cebu',
//     postCode: '6000'
//   },
//   order: '1 x S - Parakeet Monokini'
// };

const DEFAULT_VALUES: OrderFormInterface = {
  instagramLink: '',
  fullName: '',
  phoneNumber: '',
  address: {
    addressLine1: '',
    addressLine2: '',
    barangay: '',
    city: '',
    province: '',
    postCode: '',
  },
  order: '',
  honeyPotEmail: ''
}

const orderFormSchema = yup.object().shape({
  instagramLink: yup.string().url("enter a valid Instagram account link").required("required")
  .matches(/^https?:\/\/(www\.)?instagram\.com\/([a-zA-Z0-9](?:[a-zA-Z0-9._]*[a-zA-Z0-9])?)\/?$/, "enter a valid Instagram account link"),
  fullName: yup.string().required("required"),
  phoneNumber: yup.string().phone("PH").required("required"),
  // orders: yup.array().of(yup.string()).min(1).required("Atleast 1 order is required"),
  address: yup.object().shape({
    addressLine1: yup.string().required("required"),
    addressLine2: yup.string(),
    city: yup.string().required("required"),
    barangay: yup.string().required("required"),
    province: yup.string().required("required"),
    postCode: yup.string().required("required")
    .matches(/^[0-9]+$/, "enter a valid Post Code")
    .test("len", "Must be exactly 4 numbers", val => val.length === 4)
  }),
  order: yup.string().required("required"),
  honeyPotEmail: yup.string()
});

//Use dialog modal for order submission success, "Order submitted, please wait for confirmation from @SanicaSwim"
//Okay button

export default function OrderForm() {
  const [submitting, setSubmitting] = useState(false);
  const [isFailedDialogOpen, setIsFailedDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<OrderFormInterface>({
    resolver: yupResolver(orderFormSchema),
  });

  const onSubmit: SubmitHandler<OrderFormInterface> = async (data) => { //This whole method should be a utility function in another folder.
    setSubmitting(true);
    
    
    try {
      if (data.honeyPotEmail) {
        const stringData = JSON.stringify(data);
        throw new Error(`Caught a bot. ${stringData}`);
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }) as NextResponse;

      if (response.status !== 200) {
        let body = await response.json();
        console.error(body);
        throw new Error(body);
      } 

      setIsSuccessDialogOpen(true);
      reset(DEFAULT_VALUES);
    } catch (error: any) {
      setIsFailedDialogOpen(true);
    } finally {
      setSubmitting(false);
    }
  }

  // const populateForm = () => {
  //   reset(TEST_VALUES);
  // }

  return (
    <div className="max-w-md w-full">
      <div className='mt-5 md:col-span-2 md:mt-0'>
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          name="order-form" 
        >
          {/* This is for the bot */}
          <div className="hidden">
            <label htmlFor="honeyPotEmail">Email</label>
            <input 
              id="honeyPotEmail" 
              type="email" 
              autoComplete="off" 
              {...register("honeyPotEmail")}
            />
          </div>

          <div className="overflow-hidden drop-shadow rounded-[2rem]">
            <div className="bg-white px-4 py-8">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="instagramLink">
                    Instagram Link <span className="text-red-500">*</span>
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
                    Full Name <span className="text-red-500">*</span>
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
                    Phone Number <span className="text-red-500">*</span>
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
                  <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="address-line1">
                    Street Address <span className="text-red-500">*</span>
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
                  <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="barangay">
                    Barangay <span className="text-red-500">*</span>
                    {errors.address && errors.address.barangay && (
                      <span className="text-red-500 mt-1 pl-1">{typeof errors.address.barangay.message === 'string' ? errors.address.barangay.message : 'Invalid input'}</span>
                    )}
                  </label>
                  <input
                    type="text"
                    id="barangay"
                    className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 drop-shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ss-pink sm:text-sm sm:leading-6"
                    {...register("address.barangay")}
                  />
                </div>

                <div className="col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="city">
                    City <span className="text-red-500">*</span>
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
                    Province <span className="text-red-500">*</span>
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
                  <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="postcode">
                    Zip Code <span className="text-red-500">*</span>
                    {errors.address && errors.address.postCode && (
                      <span className="text-red-500 mt-1 pl-1">{typeof errors.address.postCode.message === 'string' ? errors.address.postCode.message : 'Invalid input'}</span>
                    )}
                  </label>
                  <input
                    type="text"
                    id="postcode"
                    className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 drop-shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ss-pink sm:text-sm sm:leading-6"
                    {...register("address.postCode")}
                  />
                </div>

                <div className="col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="order">
                      Orders <span className="text-red-500">*</span>
                    {errors.order && (
                      <span className="text-red-500 mt-1 pl-1">{typeof errors.order.message === 'string' ? errors.order.message : 'Invalid input'}</span>
                    )}
                  </label>
                  <textarea
                    id="order"
                    rows={3}
                    className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 drop-shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ss-pink sm:text-sm sm:leading-6"
                    placeholder="Format: 1 x S - Parakeet Monokini"
                    {...register("order")}
                  ></textarea>
                </div>
                <div className="col-start-2 col-span-1 place-content-center">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex justify-center w-full py-2 px-3 rounded-full bg-ss-blue text-sm font-semibold text-ss-pink drop-shadow-sm hover:bg-ss-pink hover:text-ss-blue disabled:opacity-75 disabled:hover:bg-ss-blue disabled:hover:text-ss-pink"
                  >
                    Submit
                    {submitting && (
                      <div className="pl-2">
                        <LoadingSpinner />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        {/* <button
          type="submit"
          className="inline-flex justify-center w-full py-2 px-3 rounded-md bg-ss-blue text-sm font-semibold text-ss-pink drop-shadow-sm hover:bg-ss-pink hover:text-ss-blue disabled:opacity-75 disabled:hover:bg-ss-blue disabled:hover:text-ss-pink"
          onClick={populateForm}
        >
          Populate Form
        </button> */}
        <OrderSuccessModal isOpen={isSuccessDialogOpen} setIsOpen={setIsSuccessDialogOpen}></OrderSuccessModal>
        <OrderFailedModal isOpen={isFailedDialogOpen} setIsOpen={setIsFailedDialogOpen}></OrderFailedModal>
      </div>
    </div>
  )
}