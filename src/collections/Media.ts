import { CollectionConfig } from "payload/types";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {},
  access: {
    read: (): boolean => true,
  },
  upload: {
    staticURL: "/media",
    staticDir: "media",
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
  ],
};

export default Media;
