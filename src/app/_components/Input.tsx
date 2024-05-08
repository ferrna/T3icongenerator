import clsx from "clsx";

export function Input(props: React.ComponentPropsWithoutRef<"input">) {
  const { className, ...propsWithoutClassname } = props;
  return (
    <input
      type="text"
      {...propsWithoutClassname}
      className={clsx(
        "border-1 rounded border-black p-1.5 text-gray-800",
        className,
      )}
    ></input>
  );
}
