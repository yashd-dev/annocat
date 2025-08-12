// app/api/upload/route.ts (Next.js app router - example)
import { getCurrentUser } from "@/db/fetch";
import { S3Client } from "@aws-sdk/client-s3";
import {
  createUploadRouteHandler,
  route,
  UploadFileError,
} from "better-upload/server";

const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const router = {
  client: s3,
  bucketName: "annocat",
  routes: {
    demo: route({
      fileTypes: ["image/*"],
      multipleFiles: false,
      // runs before generating presigned URLs
      onBeforeUpload: async ({ req, files, clientMetadata }) => {
        console.log("onBeforeUpload files:", files);
        const user = await getCurrentUser();
        console.log("onBeforeUpload user:", !!user);
        if (!user) {
          throw new UploadFileError("Not logged in!");
        }

        // create a deterministic object key (you can customize)
        return {
          generateObjectKey: ({ file }) =>
            `screenshots/${user.id}/${Date.now()}-${file.name.replace(
              /\s+/g,
              "-"
            )}`,
        };
      },
    }),
  },
};

export const { POST } = createUploadRouteHandler(router);
