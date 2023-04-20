import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment } from "react";

interface OrderSuccessModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<any>;
}

export default function OrderSuccessModal({isOpen, setIsOpen}: OrderSuccessModalProps) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" open={isOpen} onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Order Submitted! 🎉
                </Dialog.Title>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Please wait for confirmation and payment details from <a target="_blank" href="https://www.instagram.com/sanicaswim/" className="text-ss-blue underline decoration-wavy underline-offset-4 hover:underline hover:decoration-wavy sm:no-underline">@SanicaSwim</a>
                  </p>
                </div>


                <div className="mt-4 flex flex-col">
                  <button
                    type="button"
                    className="inline-flex justify-center place-self-end rounded-md border border-transparent bg-ss-pink px-4 py-2 text-sm font-medium text-ss-blue hover:bg-ss-blue hover:text-ss-pink focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Got it!
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}