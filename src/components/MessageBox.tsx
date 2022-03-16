import React from "react";
import { FaInfoCircle, FaCheckCircle } from "react-icons/fa";

import Text from "src/components/common/Text";

type MessageBoxProps = {
  message: string;
  type: "info" | "success" | "error" | "warning";
};

const MessageBox = ({ message, type }: MessageBoxProps): JSX.Element => {
  switch (type) {
    case "info":
      return (
        <div className="relative my-2 flex w-fit items-center space-x-3 rounded-xl border-[1px] border-blue-400 bg-blue-300/30 px-3 text-blue-300">
          <FaInfoCircle />
          <Text as="p" className="py-0 pr-4">
            {message}
          </Text>
        </div>
      );
    case "success":
      return (
        <div className="my-2 flex w-fit items-center space-x-3 rounded-xl border-[1px] border-emerald-400 bg-emerald-300/30 px-3 text-emerald-300">
          <FaCheckCircle />
          <Text as="p" className="py-0">
            {message}
          </Text>
        </div>
      );
    case "error":
      return (
        <div className="my-2 flex w-fit items-center space-x-3 rounded-xl border-[1px] border-rose-400 bg-rose-300/30 px-4 text-rose-300">
          <FaInfoCircle />
          <Text as="p" className="py-0">
            {message}
          </Text>
        </div>
      );
    default:
      return (
        <div className="my-2 flex w-fit items-center space-x-3 rounded-xl border-[1px] border-gray-400 bg-gray-300/30 px-3 text-gray-300">
          <FaInfoCircle />
          <Text as="p" className="py-0">
            {message}
          </Text>
        </div>
      );
  }
};

export default MessageBox;
