import { unstable_noStore } from "next/cache";
import { Input } from "../_components/Input";

unstable_noStore();
export const styles = [
  { style: "futuristic", styleImg: "/inputs/futuristicimage.png" },
  { style: "illustrative", styleImg: "/inputs/illustrativeimage.png" },
  { style: "color pincel", styleImg: "/inputs/colorpincelimage.png" },
  { style: "minimalistic", styleImg: "/inputs/minimalisticimage.png" },
  { style: "claymorphic", styleImg: "/inputs/clayimage.png" },
  { style: "eerie", styleImg: "/inputs/eerieimage.png" },
  { style: "professional", styleImg: "/inputs/professionalimage.png" },
  { style: "3d rendered", styleImg: "/inputs/3d_renderedimage.png" },
  { style: "watercolor", styleImg: "/inputs/water_colorsimage.png" },
  { style: "metallic body", styleImg: "/inputs/metallicimage.png" },
  { style: "happy", styleImg: "/inputs/happyimage.png" },
  /* { style: "rainbow colors", styleImg: "/inputs/rainbow_colorsimage.png" }, */
  /* { style: "japanese anime", styleImg: "/inputs/japaniseimage.png" }, */
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
        className={`block h-full w-full cursor-pointer rounded ${form.style === i.style ? "opacity-100 saturate-100" : "opacity-70 saturate-50"} hover:opacity-100 hover:saturate-100`}
        style={{
          backgroundImage: `url(${i.styleImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        title={i.style}
      ></label>
    </div>
  ));
  return htmlInputs;
};
