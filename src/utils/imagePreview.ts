import { envConfig } from "@/config";

export const imagePreview = (url: string) => {
  if (url?.includes("http") || url?.includes("https")) {
    return url;
  } else if(!url) {
      return "";
  }
   else {
    return `${envConfig.fileUrl}${url}`;
  }
};
