export function Input(props: React.ComponentPropsWithoutRef<"input">) {
  return (
    <input
      type="text"
      {...props}
      className="border-1 rounded border-black p-2 text-gray-800"
    ></input>
  );
}
