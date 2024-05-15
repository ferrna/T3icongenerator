import { unstable_noStore } from "next/cache";
import { Input } from "../_components/Input";

unstable_noStore();
export const styles = [
  { style: "japanese", styleImg: "" },
  { style: "metallic", styleImg: "" },
  { style: "rainbow", styleImg: "" },
  { style: "happy", styleImg: "" },
  { style: "watercolor", styleImg: "" },
  { style: "futuristic", styleImg: "" },
  { style: "minimalistic", styleImg: "" },
  { style: "clay", styleImg: "" },
  { style: "eerie", styleImg: "" },
  { style: "sketch", styleImg: "" },
  { style: "illustration", styleImg: "" },
  { style: "professional", styleImg: "" },
  { style: "3d rendered", styleImg: "" },
  { style: "color pincel", styleImg: "" },
];

export const stylesInputs = ({
  styles,
  updateForm,
  form,
}: {
  styles: { style: string; styleImg: string }[];
  updateForm: (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  form: { style: string };
}) => {
  const htmlInputs = styles.map((i) => (
    <div className="aspect-square h-full w-full" key={i.style} title={i.style}>
      <Input
        type="radio"
        id={`${i.style}`}
        name="style"
        value={`${i.style}`}
        className={`${i.style} hidden`}
        onChange={updateForm(`style`)}
        checked={form.style === i.style}
      ></Input>
      <label
        htmlFor={`${i.style}`}
        className={`block h-full w-full cursor-pointer rounded ${form.style === i.style ? "opacity-100 saturate-100" : "opacity-70 saturate-50"} hover:opacity-100`}
      ></label>
    </div>
  ));
  return htmlInputs;
};
