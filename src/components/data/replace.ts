import { failingTypedData } from "./failing";

export const replaceTypedData = (regexp: RegExp) => ({
  ...failingTypedData,
  message: {
    ...failingTypedData.message,
    data: failingTypedData.message.data.replace(regexp, "0"),
  },
});
