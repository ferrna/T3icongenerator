import clsx from "clsx";
import Link from "next/link";

export const PrimaryLink = (props: React.ComponentPropsWithoutRef<"a">) => {
  const { className, ...propsWithoutClassname } = props;
  return (
    <Link
      href={props.href || "/"}
      className={clsx(
        "text-ring dark:text-foreground cursor-pointer hover:text-blue-400 dark:hover:text-blue-400",
        className,
      )}
      {...propsWithoutClassname}
    >
      {props.children}
    </Link>
  );
};
