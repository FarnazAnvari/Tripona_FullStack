const BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

export interface ApiFetchOptions extends RequestInit {
  token?: string | null;
}

export interface ApiErrorResponse {
  success?: boolean;
  message?: string;
  error?: string;
  [key: string]: any;
}

/**
 * دریافت توکن ذخیره شده از مرورگر با بررسی کلیدهای متداول
 */
function getClientToken(): string | null {
  if (typeof window === "undefined") return null;

  const possibleKeys = ["tripona_token", "token", "accessToken", "jwt"];
  for (const key of possibleKeys) {
    const val = localStorage.getItem(key);
    if (val && val.trim() !== "" && val !== "undefined" && val !== "null") {
      let cleanVal = val.trim();
      // در صورتی که توکن داخل دابل‌کوتیشن JSON ذخیره شده باشد
      if (cleanVal.startsWith('"') && cleanVal.endsWith('"')) {
        cleanVal = cleanVal.slice(1, -1);
      }
      return cleanVal;
    }
  }

  // بررسی کوکی‌ها در صورتی که توکن به عنوان کوکی ذخیره شده باشد
  const match = document.cookie.match(
    /(?:^|;\s*)(?:tripona_token|token|accessToken)=([^;]*)/,
  );
  if (match && match[1]) {
    return decodeURIComponent(match[1]);
  }

  return null;
}

/**
 * تابع اصلی برای ارسال درخواست‌ها به Backend
 */
export async function apiFetch<T = any>(
  endpoint: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const { token, headers: customHeaders, ...restOptions } = options;

  // ۱. دریافت توکن
  let authToken: string | null = token ?? getClientToken();

  // ۲. آماده‌سازی هدرها
  const headers: Record<string, string> = {};

  if (!(restOptions.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (customHeaders) {
    if (customHeaders instanceof Headers) {
      customHeaders.forEach((value, key) => {
        headers[key] = value;
      });
    } else if (Array.isArray(customHeaders)) {
      customHeaders.forEach(([key, value]) => {
        headers[key] = value;
      });
    } else {
      Object.assign(headers, customHeaders);
    }
  }

  // ۳. افزودن هدر Authorization
  if (authToken) {
    headers["Authorization"] = authToken.startsWith("Bearer ")
      ? authToken
      : `Bearer ${authToken}`;
  }

  // ۴. نرمال‌سازی آدرس Endpoint
  let cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  if (cleanEndpoint.startsWith("/api/")) {
    cleanEndpoint = cleanEndpoint.replace(/^\/api/, "");
  }

  const fullUrl = `${BASE_URL}${cleanEndpoint}`;

  if (process.env.NODE_ENV !== "production") {
    console.log(`[API Request] ${restOptions.method || "GET"} -> ${fullUrl}`, {
      hasAuthToken: Boolean(headers["Authorization"]),
    });
  }

  try {
    const response = await fetch(fullUrl, {
      ...restOptions,
      headers,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Please sign in to your account first.");
      }

      const errorMessage =
        data?.message ||
        data?.error ||
        `An error occurred with status ${response.status}`;

      throw new Error(errorMessage);
    }

    return data as T;
  } catch (error: any) {
    console.error(`[API Error] ${cleanEndpoint}:`, error?.message || error);
    throw error;
  }
}

// متدهای کمکی
export const api = {
  get: <T = any>(endpoint: string, options?: ApiFetchOptions) =>
    apiFetch<T>(endpoint, { ...options, method: "GET" }),

  post: <T = any>(endpoint: string, body?: any, options?: ApiFetchOptions) =>
    apiFetch<T>(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T = any>(endpoint: string, body?: any, options?: ApiFetchOptions) =>
    apiFetch<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T = any>(endpoint: string, options?: ApiFetchOptions) =>
    apiFetch<T>(endpoint, { ...options, method: "DELETE" }),
};
