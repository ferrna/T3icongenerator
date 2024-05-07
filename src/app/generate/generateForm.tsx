"use client";
import { Input } from "../_components/Input";
import { FormGroup } from "../_components/FormGroup";
import { useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "../_components/Button";
import { LoaderCircle } from "lucide-react";
import { colors, colorsInputs } from "./colors";

export default function GenerateForm() {
  const [form, setForm] = useState({ prompt: "", color: "" });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  function updateForm(key: string) {
    return function (e: React.ChangeEvent<HTMLInputElement>) {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };
  }
  const generateIcon = api.generate.generateIcon.useMutation({
    onSuccess(data) {
      setForm({ prompt: "", color: "" });
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
          <div className="grid grid-cols-4 gap-2">
            {colorsInputs({ colors, updateForm, form })}
          </div>
        </FormGroup>
        <Button
          type="submit"
          disabled={generateIcon.isPending}
          className="mt-3 w-full text-gray-700"
        >
          {generateIcon.isPending ? "Submitting..." : "Submit"}
        </Button>
        {imageUrl &&
          (generateIcon.isPending ? (
            <LoaderCircle
              color="#17977d"
              strokeWidth={1.25}
              className="mx-auto mt-6 animate-spin"
            />
          ) : (
            <img
              src={`data:image/png;base64,${imageUrl}`}
              alt="generated-icon-image"
              className="animate-fade mx-auto mt-4 transition-all"
              width={200}
              height={200}
            />
          ))}
      </form>
    </>
  );
}
