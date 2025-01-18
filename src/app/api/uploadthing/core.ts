// import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { auth } from "@clerk/nextjs/server";

// const f = createUploadthing();

// export const ourFileRouter = {
//   // define routes for different upload types
//   postImage: f({
//     image: {
//       maxFileSize: "4MB",
//       maxFileCount: 1,
//     },
//   })
//     .middleware(async () => {
//       // this code runs on your server before upload to check if you are authenticated before upload
//       const { userId } = await auth();
//       if (!userId) throw new Error("Unauthorized");

//       // whatever is returned here is accessible in onUploadComplete as `metadata`
//       return { userId };
//     })
//     .onUploadComplete(async ({ metadata, file }) => {
//       try {
//         return { fileUrl: file.url };
//       } catch (error) {
//         console.error("Error in onUploadComplete:", error);
//         throw error;
//       }
//     }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;


import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

export const ourFileRouter = {
  postImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      // Debug auth and userId
      const { userId } = await auth();
      console.log("Middleware userId:", userId);
      if (!userId) throw new Error("Unauthorized");
      return { userId }; // Pass metadata
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Debug metadata and file
      console.log("Upload completed with metadata:", metadata);
      console.log("File details:", file);
      try {
        return { fileUrl: file.url }; // Return file URL
      } catch (error) {
        console.error("Error in onUploadComplete:", error);
        throw error;
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
