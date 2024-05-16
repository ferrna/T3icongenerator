import { unstable_noStore } from "next/cache";
import { Input } from "../_components/Input";

unstable_noStore();
export const shapes = [
  { shape: "square" },
  { shape: "circle" },
  { shape: "triangular" },
];

export const shapesInputs = ({
  shapes,
  updateForm,
  form,
}: {
  shapes: { shape: string }[];
  updateForm: (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  form: { shape: string };
}) => {
  const htmlInputs = shapes.map((i) => (
    <div key={i.shape}>
      <Input
        type="radio"
        id={`${i.shape}`}
        name="shape"
        value={`${i.shape}`}
        className={`${i.shape} hidden`}
        onChange={updateForm(`shape`)}
        checked={form.shape === i.shape}
      ></Input>
      <label
        htmlFor={`${i.shape}`}
        className={`mr-2 block cursor-pointer rounded-full bg-slate-500 px-2 ${form.shape === i.shape ? "opacity-100" : "opacity-70"} hover:opacity-100`}
      >
        {i.shape}
      </label>
    </div>
  ));
  return htmlInputs;
};
