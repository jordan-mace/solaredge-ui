require("process");

export const API_HOST = process.env.REACT_APP_API_HOST
  ? process.env.REACT_APP_API_HOST
  : "localhost";
export const API_PORT = process.env.REACT_APP_API_HOST
  ? process.env.REACT_APP_API_HOST
  : 8080;

export function canParseJSON(jsonString: string | null) {
  if (jsonString === null) return false;
  try {
    var o = JSON.parse(jsonString);

    if (o && typeof o === "object") {
      return o;
    }
  } catch (e) {}

  return false;
}
