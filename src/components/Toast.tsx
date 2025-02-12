import React, { useState } from 'react';
import { Transition } from '@headlessui/react';

const Toast: React.FC<{ message: string }> = ({ message }) => {
  const [show, setShow] = useState(true);

  return (
    <Transition
      show={show}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="fixed bottom-4 right-4 w-full max-w-sm bg-red-500 text-white p-4 rounded-lg shadow-lg"
      aria-live="assertive"
    >
      <div className="flex items-center justify-between">
        <p>{message}</p>
        <button
          onClick={() => setShow(false)}
          className="ml-4 text-white hover:text-gray-200"
        >
          &times;
        </button>
      </div>
    </Transition>
  );
};

export default Toast;
