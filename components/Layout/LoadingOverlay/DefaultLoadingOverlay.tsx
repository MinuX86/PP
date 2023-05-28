import React from "react";
import LoadingSpinner from "../../LoadingSpinner";

type Props = {
  text: string;
  size?: number;
  color?: string;
};

const DefaultLoadingOverlay = ({
  text,
  color = "brandPrimary500",
  size = 84,
}: Props): JSX.Element => {
  return (
    <div className="flex flex-col items-center">
      <p>{text}</p>
      <LoadingSpinner color={color} size={size} />
    </div>
  );
};

export default DefaultLoadingOverlay;
