"use client";
import { Input } from "../_components/Input";
import { FormGroup } from "../_components/FormGroup";
import { useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "../_components/Button";
import { DownloadIcon, LoaderCircle } from "lucide-react";
import { colors, colorsInputs } from "./colors";
import Image from "next/image";

export default function GenerateForm() {
  const [form, setForm] = useState({ prompt: "", color: "" });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [userIconId, setUserIconId] = useState<string | null>(null);
  function updateForm(key: string) {
    return function (e: React.ChangeEvent<HTMLInputElement>) {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };
  }
  const generateIcon = api.icons.generateIcon.useMutation({
    onSuccess(data: any) {
      console.log("mutation finished", data);
      if (!data.imageUrl) return;
      setImageUrl(data.imageUrl);
      data?.id && setUserIconId(data.id);
    },
  });
  const toggleKeepPrivate = api.icons.postToggleKeepPrivate.useMutation({
    onSuccess(data: any) {
      /* todo: agregar toast */
      console.log("mutation finished", data);
    },
  });
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    generateIcon.mutate({ prompt: form.prompt, color: form.color });
  }
  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    const element = document.createElement("a");
    element.href = `data:image/png;base64,${imageUrl ?? ""}`;
    element.download = `image_${form.prompt}.png`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  const handleKeepPrivate = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value === "on" ? "off" : "on";
    toggleKeepPrivate.mutate({ id: userIconId! });
  };
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
          <Input value={form.prompt} onChange={updateForm("prompt")}></Input>
        </FormGroup>
        <FormGroup>
          <label className="text-2xl">2. Pick a color</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-5">
            {colorsInputs({ colors, updateForm, form })}
          </div>
        </FormGroup>
        <Button
          type="submit"
          disabled={generateIcon.isPending}
          className="mt-3 w-full text-lg text-gray-200 hover:text-white"
        >
          {generateIcon.isPending ? "Submitting..." : "Generate"}
        </Button>
        <div className="flex min-h-56 w-full flex-col items-center justify-center gap-2">
          {generateIcon.isPending ? (
            <LoaderCircle
              color="#17977d"
              strokeWidth={1.25}
              className="mx-auto mt-6 animate-spin"
            />
          ) : (
            imageUrl && (
              <picture className="mt-8">
                <div className="relative mx-auto w-max">
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
                      onClick={handleDownload}
                    >
                      <DownloadIcon width={40} height={40} />
                    </Button>
                    <p className="pointer-events-none hidden w-auto text-white group-hover:inline-block">
                      Download icon
                    </p>
                  </div>
                </div>
                <div className="mx-auto mt-4 flex flex-col items-center gap-8 p-8">
                  <div className="flex w-full flex-col items-center justify-center gap-2 md:hidden">
                    <Button
                      title="Download Icon"
                      className="w-auto"
                      onClick={handleDownload}
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
                      disabled={toggleKeepPrivate.isPending}
                    />
                  </div>
                </div>
              </picture>
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

/* TODO: 
  - Inputs shape, style, number
  - styles of square inputs of 'style' 'shape' to know how it would look like
  - cache on server communityIcons page icons
  - nr of credits in generateForm
  - use a new s3 bucket and local postgres database in development
*/

/*
  Rainbow style
  Metallic
  Japanese anime style
  featuring calm colors and fine lines
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
