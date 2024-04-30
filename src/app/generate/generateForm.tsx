"use client";
import { Input } from "../_components/Input";
import { FormGroup } from "../_components/FormGroup";
import { useState } from "react";
import { generateIconAction } from "./actions";
import { api } from "~/trpc/react";
import Image from "next/image";

export default function GenerateForm() {
  const [form, setForm] = useState({ prompt: "" });
  const [imageUrl, setImageUrl] = useState("");

  function updateForm(key: string) {
    return function (e: React.ChangeEvent<HTMLInputElement>) {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };
  }

  /* async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await generateIconAction(form.prompt);
  } */
  /* OR */
  const generateIcon = api.generate.generateIcon.useMutation({
    onSuccess(data) {
      setForm({ prompt: "" });
      console.log("mutation finished", data);
      if (!data.imageUrl) return;
      setImageUrl(data.imageUrl);
    },
  });
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    generateIcon.mutate({ prompt: form.prompt });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <FormGroup>
        <label>Prompt</label>
        <Input value={form.prompt} onChange={updateForm("prompt")}></Input>
      </FormGroup>
      <button
        type="submit"
        className="w-48 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 p-2 opacity-90 transition-all
        duration-150 hover:opacity-100 hover:shadow-sm disabled:from-blue-400 disabled:to-blue-500
        disabled:hover:opacity-80"
        disabled={generateIcon.isPending}
      >
        {generateIcon.isPending ? "Submitting..." : "Submit"}
      </button>
      {imageUrl && (
        <img
          src={`data:image/png;base64,${imageUrl}`}
          alt="generatad-icon-image"
          className="mx-auto mt-4"
          width={200}
          height={200}
        />
        
      )}
    </form>
  );
}
{/* <Image
          src={imageUrl}
          alt="generatad-icon-image"
          className="mx-auto mt-4"
          width={200}
          height={200}
        /> */}