import clsx from "clsx";

export const Button = (props: React.ComponentPropsWithoutRef<"button">) => {
  const { className, ...propsWithoutClassname } = props;
  return (
    <button
      className={clsx(
        "w-48 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 p-2 opacity-90 transition-all duration-150 hover:opacity-100 hover:shadow-sm disabled:from-blue-400 disabled:to-blue-500 disabled:hover:opacity-80",
        className,
      )}
      {...propsWithoutClassname}
    >
      {props.children}
    </button>
  );
};
