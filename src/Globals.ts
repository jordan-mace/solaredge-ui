export const API_HTTPS = process.env.SE_API_HTTPS
  ? Boolean(process.env.SE_API_HTTPS)
  : false;
export const API_HOST = process.env.SE_API_HOST
  ? process.env.SE_API_HOST
  : "localhost:8080";

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
