import { unstable_noStore } from "next/cache";
import { Input } from "../_components/Input";

unstable_noStore();
export const colors = [
  { color: "red", twColor: "bg-red-700" },
  { color: "blue", twColor: "bg-blue-700" },
  { color: "cyan", twColor: "bg-cyan-500" },
  { color: "violet", twColor: "bg-violet-600" },
  { color: "magenta", twColor: "bg-fuchsia-600" },
  { color: "green", twColor: "bg-green-700" },
  { color: "yellow", twColor: "bg-yellow-300" },
  { color: "orange", twColor: "bg-orange-500" },
  { color: "black", twColor: "bg-black" },
  { color: "white", twColor: "bg-white" },
  { color: "gray", twColor: "bg-gray-600" },
  { color: "brown", twColor: "bg-brown-500" },
];

export const colorsInputs = ({
  colors,
  updateFormColors,
  form,
}: {
  colors: { color: string; twColor: string }[];
  updateFormColors: (e: React.ChangeEvent<HTMLInputElement>) => void;
  form: { colors: string[] };
}) => {
  const htmlInputs = colors.map((i) => (
    <div className="aspect-square h-full w-full" key={i.color}>
      <Input
        type="radio"
        id={`${i.color}`}
        name="colors"
        value={`${i.color}`}
        className={`${i.color} hidden`}
        onChange={updateFormColors}
        checked={form.colors.includes(i.color)}
      ></Input>
      <label
        htmlFor={`${i.color}`}
        className={`block h-full w-full cursor-pointer rounded ${form.colors.includes(i.color) ? "border-2 border-gray-900 opacity-100" : "border-none opacity-60"} hover:opacity-100 ${i.twColor}`}
      ></label>
    </div>
  ));
  return htmlInputs;
};
