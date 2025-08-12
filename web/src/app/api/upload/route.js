import { getCurrentUser } from "@/db/fetch";
import { S3Client } from "@aws-sdk/client-s3";
import { createUploadRouteHandler, route } from "better-upload/server";

const s3 = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const router = {
  client: s3,
  bucketName: "my-bucket",
  routes: {
    demo: route({
      fileTypes: ["image/*"],
      onBeforeUpload: async ({ req, file, clientMetadata }) => {
        const user = await getCurrentUser();
        if (!user) {
          throw new UploadFileError("Not logged in!");
        }
      },
    }),
  },
};

export const { POST } = createUploadRouteHandler(router);
