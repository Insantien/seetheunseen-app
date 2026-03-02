import { tourSchema } from "./tour";
import { destinationSchema } from "./destination";
import { experienceTypeSchema } from "./experienceType";
import { blogPostSchema } from "./blogPost";
import { addOnServiceSchema } from "./addOnService";
import { siteSettingsSchema } from "./siteSettings";

export const schemaTypes = [
  // Documents
  tourSchema,
  destinationSchema,
  experienceTypeSchema,
  blogPostSchema,
  addOnServiceSchema,
  siteSettingsSchema,
];
