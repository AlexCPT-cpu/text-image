import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Fragment } from "react";

export default function ImageModal({
  src,
  onClose,
  isOpen,
}: {
  src: string;
  onClose: () => void;
  isOpen: boolean;
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
          <div className="fixed flex min-h-full top-0 left-0 z-50 w-full h-full items-center justify-center bg-black bg-opacity-80">
            <div className="relative">
              <button
                className="absolute rounded-full p-2 bg-gray-100 hover:bg-gray-100/40 text-black top-0 right-0 m-4"
                onClick={onClose}
              >
                <XMarkIcon className="text-black w-8" />
              </button>
              <Image
                layout="responsive"
                width={600}
                height={600}
                src={src}
                alt="Image"
                objectFit="contain" // Adjust objectFit as needed
              />
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
