import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Fragment } from "react";

export default function ImgModal({
  isOpen,
  setIsOpen,
  selectedImages,
}: {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  selectedImages: string[];
}) {
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  console.log(selectedImages);
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
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
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 w-full relative mb-10"
                  onClick={closeModal}
                >
                  <XMarkIcon className="absolute right-0 top-0 rounded-full p-1 bg-gray-300 w-8 cursor-pointer hover:bg-gray-200" />
                </Dialog.Title>
                <div className="mt-2 flex flex-wrap justify-center items-center">
                  {selectedImages.map((image, index) => (
                    <div
                      key={index}
                      className="w-1/2 md:w-1/2 p-1 justify-center items-center flex cursor-pointer border rounded-sm"
                    >
                      <Image
                        width={50}
                        height={50}
                        src={image}
                        alt={image}
                        className="object-scale-down rounded-lg w-20 h-20 mx-auto"
                      />
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
