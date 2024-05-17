import clsx from "clsx";
import { forwardRef } from "react";

type ButtonProps = React.ComponentPropsWithoutRef<"button">;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className, ...propsWithoutClassname } = props;
    return (
      <button
        className={clsx(
          "w-48 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 p-2 text-gray-200 opacity-90 transition-all duration-150 hover:text-white hover:opacity-100 hover:shadow-sm disabled:from-blue-400 disabled:to-blue-500 disabled:hover:opacity-80",
          className,
        )}
        {...propsWithoutClassname}
        ref={ref}
      >
        {props.children}
      </button>
    );
  },
);
