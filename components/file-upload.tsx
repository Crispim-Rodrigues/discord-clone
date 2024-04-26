"use client";

import { X } from "lucide-react";
import Image from "next/image";

import React from "react";

import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
            onClick={()=> (
            onChange("")

        )}
            className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
            type="button"
        >
            <X className="h-4 w-4"/>
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone<OurFileRouter, typeof endpoint>
      endpoint={endpoint}

      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      
      onUploadError={(error: Error) => {
        console.log(error);
      }}
      content={{
        label({ready, }) {
            if (ready) return "Selecione um arquivo ou arraste"
        },
        allowedContent({ready}){
            if (ready) return "Tamanho max(4MB)"
        }
      }}


      className="ut-label:text-indigo-500 ut-button:bg-indigo-500 cursor-pointer"
      
    />
  );
};
