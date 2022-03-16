import { Fragment, Dispatch, SetStateAction, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { User } from "firebase/auth";
import { useAppDispatch } from "src/app/store";
import Text from "src/components/common/Text";
import Button from "src/components/common/Button";
import { updateUserProfile } from "src/features/user/userSlice";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  //   setIsOpen: (value:boolean)=>void;
};

function UserEditModal({ isOpen, setIsOpen, user }: Props) {
  const dispatch = useAppDispatch();
  const [photo, setPhoto] = useState(user?.photoURL);
  const [username, setUsername] = useState<any>(user?.displayName);

  const avatarArray = [
    "https://firebasestorage.googleapis.com/v0/b/anime-wiki-93dac.appspot.com/o/user_images%2Favatar01.png?alt=media&token=f6cd61b0-f03c-46f8-9c0a-a6a6527d60fc",
    "https://firebasestorage.googleapis.com/v0/b/anime-wiki-93dac.appspot.com/o/user_images%2Favatar02.png?alt=media&token=934cb2d1-efb7-4dcb-bb86-74cd4640a5ba",
    "https://firebasestorage.googleapis.com/v0/b/anime-wiki-93dac.appspot.com/o/user_images%2Favatar03.png?alt=media&token=98c7240e-9d42-4a77-8910-571e0a87cc8d",
    "https://firebasestorage.googleapis.com/v0/b/anime-wiki-93dac.appspot.com/o/user_images%2Favatar04.png?alt=media&token=85507930-fbb8-45c3-b027-e2cc1effc4de",
    "https://firebasestorage.googleapis.com/v0/b/anime-wiki-93dac.appspot.com/o/user_images%2Favatar05.png?alt=media&token=4fca1da5-8798-46df-8470-36a24c4fe6b2",
  ];

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const formData = { photo, username };

    dispatch(updateUserProfile({ user, formData }));
    setIsOpen(false);
  };
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

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
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
                className="mb-6 text-center font-title text-xl leading-6 text-sky-500"
              >
                Edit User
              </Dialog.Title>
              <form className="mt-2" onSubmit={handleSubmit}>
                <div className="mb-4 flex justify-center space-x-4">
                  {avatarArray?.map((item, index) => (
                    <div key={index}>
                      <input
                        onChange={(e) => setPhoto(e.target.value)}
                        type="radio"
                        name="photo"
                        defaultChecked={item === user?.photoURL}
                        value={item}
                        id={`avatar_${index}`}
                        className="absolute h-[48px] w-[48px] cursor-pointer appearance-none rounded-xl transition checked:ring-2 checked:ring-sky-500 hover:ring-2 hover:ring-sky-500"
                      />
                      <label
                        htmlFor={`avatar_${index}`}
                        className=" cursor-pointer checked:ring-2 checked:ring-sky-500"
                      >
                        {!item ? (
                          <div className="h-[48px] w-[48px] animate-pulse rounded-xl bg-slate-600" />
                        ) : (
                          <img
                            src={item}
                            alt={`avatar_${index}`}
                            className="h-[48px] w-[48px] rounded-xl"
                          />
                        )}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="my-2 space-y-1">
                  <Text
                    as="label"
                    htmlFor="email"
                    className="pl-4 font-semibold text-sky-500"
                  >
                    Username
                  </Text>
                  <input
                    className="w-full rounded-3xl border  border-slate-900 bg-slate-700 px-[1em] py-[0.4em] placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-sky-500"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="space-y-4 pt-7">
                  <input
                    className="btn btn-primary w-full hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-sky-600 disabled:hover:bg-sky-600 disabled:hover:text-slate-900"
                    type="submit"
                    value={"Submit"}
                    // disabled={status === "loading" ? true : false}
                  />
                </div>
              </form>

              <div className="mt-4">
                <Button
                  as="button"
                  className="btn btn-outline w-full"
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

export default UserEditModal;
