"use client";

import Button from "../../../components/form-btn";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { uploadTweet } from "./actions";
import { useActionState } from "react";


export default function AddProduct() {
  const [imgPreview, setImgPreview] = useState("");
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    setImgPreview(url);
  };
  const [state, action] = useActionState(uploadTweet, null);
  return (
    <div className="max-w-96 m-auto mt-16">
      <form action={action} className="p-5 flex flex-col gap-5">
        <label
          htmlFor="contents_img"
          className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer"
          style={{
            backgroundImage: `url(${imgPreview})`,
          }}
        >
        {imgPreview === "" ? (
          <>
            <PhotoIcon className="w-20" />
            <div className="text-neutral-400 text-sm">
              사진을 추가해주세요.
            </div>
          </>
        ) : null}
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="contents_img"
          name="contents_img"
          accept="image/*"
          className="hidden"
        />
        <textarea name="contents_txt" id="" rows={6} placeholder="게시글을 작성해주세요."
          className="w-full border border-1 border-solid border-gray-300 rounded-md focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-gray-400 p-1 text-sm">
        </textarea>

        <Button text="작성 완료" />
      </form>
    </div>
  );
}