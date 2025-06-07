import React from "react";
import { PropagateLoader } from "react-spinners";
type SpinnerProps = {
  size?: number;
  color?: string;
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = 16,
  color = "#38E038",
}: SpinnerProps) => {
  return (
    // <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 flex items-center justify-center z-30">
      <PropagateLoader color={color} size={size} loading={true} />
    // </div>
  );
};




export const FullSpinner: React.FC<SpinnerProps> = ({
  size = 16,
  color = "#38E038",
}: SpinnerProps) => {
  return (
    <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 flex items-center justify-center z-30">
      <PropagateLoader color={color} size={size} loading={true} />
    </div>
  );
};


