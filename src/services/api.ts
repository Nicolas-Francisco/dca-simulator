import { BUDA_API_URL } from "@/config/environment";

interface ApiOptions {
  method?: "GET" | "POST";
  body?: Record<string, unknown>;
}

export const budaApi = async <T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> => {
  const { method = "GET", body } = options;

  const response = await fetch(`${BUDA_API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
};
