export function FormGroup(props: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className="mb-2 flex w-full flex-col gap-5 px-2 sm:px-0" {...props}>
      {props.children}
    </div>
  );
}
