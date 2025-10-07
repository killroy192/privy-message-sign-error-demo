import { failingTypedData } from "./failing";

export const workingTypedData = {
  ...failingTypedData,
  message: {
    ...failingTypedData.message,
    data: failingTypedData.message.data.slice(
      0,
      Math.floor(failingTypedData.message.data.length / 3)
    ),
  },
};
