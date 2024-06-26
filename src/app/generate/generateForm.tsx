"use client";
import { Input } from "../_components/Input";
import { FormGroup } from "../_components/FormGroup";
import { useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "../_components/Button";
import { DownloadIcon, LoaderCircle } from "lucide-react";
import { colors, colorsInputs } from "./colors";
import Image from "next/image";
import { styles, stylesInputs } from "./styles";

export default function GenerateForm() {
  const [form, setForm] = useState({
    prompt: "",
    colors: [] as string[],
    style: "",
    lines: "",
    numberOfIcons: "1",
  });
  const [imageUrls, setImageUrls] = useState<(string | undefined)[] | null>(
    null,
  );
  const [userIconId, setUserIconId] = useState<string | null>(null);
  function updateForm(key: string) {
    return function (e: React.ChangeEvent<HTMLInputElement>) {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };
  }
  function updateFormColors(e: React.ChangeEvent<HTMLInputElement>) {
    if (form.colors.includes(e.target.value)) {
      setForm((prev) => ({
        ...prev,
        colors: prev.colors.filter((color) => color !== e.target.value),
      }));
    } else {
      if (form.colors.length === 4) return;
      setForm((prev) => ({
        ...prev,
        colors: [...prev.colors, e.target.value],
      }));
    }
  }
  const utils = api.useUtils();
  const generateIcon = api.icons.generateIcon.useMutation({
    onSuccess(data: { imageUrl: string | undefined; id: string }[]) {
      setImageUrls(
        data.map((i) => {
          if (!i.imageUrl) return;
          return i.imageUrl;
        }),
      );
      data[0]?.id && setUserIconId(data[0].id);

      utils.user.getCredits
        .invalidate(undefined, { refetchType: "all" })
        .catch((err) => console.log(err));
      utils.icons.getIcons
        .invalidate(undefined, { refetchType: "all" })
        .catch((err) => console.log(err));
    },
  });

  const { mutate, isPending: toggleKeepPrivateIsPending } =
    api.icons.postToggleKeepPrivate.useMutation({
      onSuccess() {
        console.log("mutation finished");
      },
    });
  const helperToggleKeepPrivate = (id: string) => {
    mutate({ id });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(form);
    generateIcon.mutate({
      prompt: form.prompt,
      colors: form.colors,
      style: form.style,
      lines: form.lines,
      numberOfIcons: parseInt(form.numberOfIcons),
    });
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-6
        sm:items-start"
      >
        <FormGroup>
          <label className="text-2xl">
            1. Describe what you want to generate
          </label>
          <Input
            required
            value={form.prompt}
            onChange={updateForm("prompt")}
          ></Input>
        </FormGroup>
        <FormGroup>
          <label className="text-2xl">2. Pick a color</label>
          <div className="mx-1 mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-5">
            {colorsInputs({ colors, updateFormColors, form })}
          </div>
        </FormGroup>
        <FormGroup>
          <label className="text-2xl">3. Choose a style</label>
          <div className="mx-1 mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-5">
            {stylesInputs({ styles, updateForm, form })}
          </div>
        </FormGroup>
        <FormGroup>
          <label className="text-2xl">
            4. How many icons do you want to generate?
          </label>
          <Input
            required
            type="number"
            min={1}
            max={10}
            value={form.numberOfIcons}
            onChange={updateForm("numberOfIcons")}
          ></Input>
        </FormGroup>
        <div className="w-full pt-6">
          {parseInt(form.numberOfIcons) > 0 && (
            <p className="-mt-5 text-center text-sm text-gray-700 dark:text-[#d6d6d6]">
              {form.numberOfIcons}{" "}
              {parseInt(form.numberOfIcons) === 1 ? "credit " : "credits "}
              needed
            </p>
          )}
          <Button
            type="submit"
            disabled={generateIcon.isPending}
            className="mt-3 w-full text-lg text-gray-200 hover:text-white"
          >
            {generateIcon.isPending ? "Submitting..." : "Generate"}
          </Button>
        </div>
        <div className="flex min-h-56 w-full flex-col items-center justify-center gap-2">
          {generateIcon.isPending ? (
            <LoaderCircle
              color="#17977d"
              strokeWidth={1.25}
              className="mx-auto mt-6 animate-spin"
            />
          ) : (
            imageUrls &&
            renderImages(
              imageUrls,
              userIconId,
              form.prompt,
              helperToggleKeepPrivate,
              toggleKeepPrivateIsPending,
            )
          )}
          {generateIcon.isError && (
            <p className="w-full border-[1px] border-red-400 bg-red-100 p-4 text-center text-red-400">
              {generateIcon.error.message}
            </p>
          )}
        </div>
      </form>
    </>
  );
}

function renderImages(
  imageUrls: (string | undefined)[],
  userIconId: string | null,
  prompt: string,
  helperToggleKeepPrivate: (id: string) => void,
  toggleKeepPrivateIsPending: boolean,
) {
  const handleDownload = (
    e: React.FormEvent,
    imageUrls: (string | undefined)[],
  ) => {
    e.preventDefault();
    return imageUrls.map((imageUrl) => {
      if (!imageUrl) return;
      const element = document.createElement("a");
      element.href = `data:image/png;base64,${imageUrl ?? ""}`;
      element.download = `image_${prompt}.png`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    });
  };

  const handleKeepPrivate = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value === "on" ? "off" : "on";
    helperToggleKeepPrivate(userIconId!);
  };
  return (
    <picture className="mt-8 max-w-full">
      <div className="mx-auto flex w-max max-w-full flex-col flex-wrap items-center justify-center gap-6 sm:flex-row">
        {imageUrls.map((imageUrl, idx) => (
          <div className="relative w-max" key={idx + "imagesResult"}>
            <Image
              src={`data:image/png;base64,${imageUrl}`}
              alt="generated-icon-image"
              className="peer mx-auto animate-fade rounded-lg shadow-sm transition-all"
              width={200}
              height={200}
            />
            <div
              className="z-15 group absolute inset-x-0 inset-y-0 m-auto hidden h-max w-max
                   flex-col items-center justify-center gap-1 rounded-full p-4 transition-all hover:animate-buttonFade
                 hover:bg-slate-600/70 peer-hover:bg-slate-600/70 peer-hover:*:inline-block
                md:flex"
            >
              <Button
                title="Download Icon"
                className="hidden w-auto group-hover:inline-block"
                onClick={(e) => handleDownload(e, [imageUrl])}
              >
                <DownloadIcon width={40} height={40} />
              </Button>
              <p className="pointer-events-none hidden w-auto text-white group-hover:inline-block">
                Download icon
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-4 flex flex-col items-center gap-8 p-8">
        <div className="flex w-full flex-col items-center justify-center gap-2 md:hidden">
          <Button
            title="Download Icon"
            className="w-auto"
            onClick={(e) => handleDownload(e, imageUrls)}
          >
            <DownloadIcon width={20} height={20} />
          </Button>
          <p className="w-auto">Download icon</p>
        </div>
        <div className="flex flex-col-reverse justify-between gap-2 text-gray-700 md:flex-row md:gap-12 dark:text-[#d6d6d6]">
          <span>Share with community</span>
          <input
            type="checkbox"
            defaultChecked={true}
            onChange={handleKeepPrivate}
            disabled={toggleKeepPrivateIsPending}
          />
        </div>
      </div>
    </picture>
  );
}

/* TODO:
  - buy domain and get google seo sitemap crawl
  - new s3 bucket in development
  - choose dalle-2 dalle-3
*/

/* <div
    className="z-15 hover:animate-buttonFade group absolute inset-x-0 inset-y-0 m-auto flex
     w-max h-max rounded-full flex-col items-center justify-center gap-1 transition-all
   hover:bg-slate-500/50 peer-hover:bg-slate-500/50 p-4
   peer-hover:[&>*:first-child]:inline-block"
  >
    <Button
      title="Download Icon"
      className="hidden w-auto after:hidden group-hover:after:inline-block group-hover:inline-block relative after:absolute after:left-1/2 after:-translate-x-1/2
      after:pt-4 after:text-center after:leading-tight after:text-slate-200 
      after:content-['Download_png']"
    >
      <DownloadIcon width={40} height={40} />
    </Button>
  </div>
</picture> */
