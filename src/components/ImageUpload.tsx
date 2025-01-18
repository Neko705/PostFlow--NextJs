// "use client";

// import { UploadDropzone } from "@/lib/uploadthing";
// import { XIcon } from "lucide-react";

// interface ImageUploadProps {
//     onChange: (url: string) => void;
//     value: string;
//     endpoint: "postImage" 
// }

// function ImageUpload({endpoint,onChange,value}: ImageUploadProps) {

//   if(value){
//     return (
//         <div className="relative size-40">
//           <img src={value} alt="Upload" className="rounded-md size-40 object-cover" />
//           <button
//             onClick={() => onChange("")}
//             className="absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm"
//             type="button"
//           >
//             <XIcon className="h-4 w-4 text-white" />
//           </button>
//         </div>
//       );
//   }
//   return (
//     <UploadDropzone 
//     endpoint={endpoint} 
//     onClientUploadComplete={(res) => {onChange(res[0].url)}}
//     onUploadError={(error: Error) => {console.log(error)}} 
//     />
//   )
// }

// export default ImageUpload

"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { XIcon } from "lucide-react";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "postImage"; // Match server route key
}

function ImageUpload({ endpoint, onChange, value }: ImageUploadProps) {
  // Show uploaded image with remove button
  if (value) {
    return (
      <div className="relative w-40 h-40">
        <img src={value} alt="Upload" className="rounded-md w-full h-full object-cover" />
        <button
          onClick={() => onChange("")}
          className="absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm"
          type="button"
        >
          <XIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    );
  }

  // Show UploadDropzone for uploading
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (res && res.length > 0) {
          onChange(res[0].url);
        } else {
          console.error("Upload result is empty or invalid:", res);
        }
      }}
      onUploadError={(error: Error) => {
        console.error("Upload error:", error.message);
      }}
    />
  );
}

export default ImageUpload;
