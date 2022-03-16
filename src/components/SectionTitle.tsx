import React from "react";
import Text from "./common/Text";

type SectionTitleProps = {
  title: string;
};

const SectionTitle = ({ title = "Section Title" }: SectionTitleProps) => {
  return (
    <Text as="h4" className="mb-6 font-title text-sky-500">
      {title}
    </Text>
  );
};

export default SectionTitle;
