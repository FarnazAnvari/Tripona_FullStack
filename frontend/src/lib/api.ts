const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

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
 * تابع اصلی برای ارسال درخواست‌ها به Backend
 */
export async function apiFetch<T = any>(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const { token, headers: customHeaders, ...restOptions } = options;

  // دریافت توکن: اگر صریح پاس داده شده بود استفاده می‌شود، در غیر این صورت از LocalStorage خوانده می‌شود
  const authToken =
    token ??
    (typeof window !== 'undefined'
      ? localStorage.getItem('tripona_token')
      : null);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(customHeaders as Record<string, string>),
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  // اطمینان از ساختار درست آدرس endpoint
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;

  try {
    const response = await fetch(url, {
      ...restOptions,
      headers,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMessage =
        data?.message ||
        data?.error ||
        `خطایی با وضعیت ${response.status} رخ داده است`;
      throw new Error(errorMessage);
    }

    return data as T;
  } catch (error: any) {
    console.error(`[API Error] ${endpoint}:`, error.message || error);
    throw error;
  }
}

// توابع کمکی کاربردی برای راحتی کار در صفحات و کامپوننت‌ها
export const api = {
  get: <T = any>(endpoint: string, options?: ApiFetchOptions) =>
    apiFetch<T>(endpoint, { ...options, method: 'GET' }),

  post: <T = any>(endpoint: string, body?: any, options?: ApiFetchOptions) =>
    apiFetch<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T = any>(endpoint: string, body?: any, options?: ApiFetchOptions) =>
    apiFetch<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T = any>(endpoint: string, options?: ApiFetchOptions) =>
    apiFetch<T>(endpoint, { ...options, method: 'DELETE' }),
};
