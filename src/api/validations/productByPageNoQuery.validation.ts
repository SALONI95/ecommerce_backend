import * as yup from "yup";

// Define schema for query validation
export const pageByNoQuerySchema = yup.object({
  page: yup.number().integer().positive().required("Page is required"),
  limit: yup.number().integer().positive().required("Limit is required"),
  //search: yup.string().optional(),
});
