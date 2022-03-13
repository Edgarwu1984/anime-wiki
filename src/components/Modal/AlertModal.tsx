import { Fragment, Dispatch, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdErrorOutline, MdCheckCircleOutline } from "react-icons/md";
import Button from "../common/Button";
import Text from "../common/Text";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  message: string;
  type: "error" | "info" | "success" | "warning";
};

function AlertModal({ isOpen, setIsOpen, message, type }: Props) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setIsOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-900 p-8  text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="mb-6 text-center font-title text-xl leading-6 "
              >
                {type === "error" && (
                  <Text className="text-red-500">
                    <MdErrorOutline /> Error
                  </Text>
                )}
                {type === "success" && (
                  <Text className="text-emerald-500">
                    <MdCheckCircleOutline /> Success
                  </Text>
                )}
              </Dialog.Title>
              <div className="flex justify-center">
                <p className="text-lg text-slate-100">{message}</p>
              </div>

              <div className="mt-4">
                <Button
                  as="button"
                  className={`btn w-full ${
                    type === "error"
                      ? "btn-outline-danger"
                      : type === "success" && "btn-outline-success"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default AlertModal;
