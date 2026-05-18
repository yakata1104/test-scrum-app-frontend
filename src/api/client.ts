import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { PiNuclearPlantLight } from "react-icons/pi";

/**
 * 通常API通信用のAxiosクライアント.
 * Cookie認証を利用するため withCredentials を有効化する.
 */
export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

/**
 * アクセストークン再発行専用のAxiosクライアント.
 * interceptorによる無限ループを防ぐため、
 * 通常APIクライアントとは別インスタンスを使用する.
 */
const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

/**
 * リトライ状態を保持可能なAxiosリクエスト設定.
 */
type RetryableAxiosRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

/**
 * 実行中のrefresh処理.
 *
 * 同時に複数APIが401になった場合、
 * refresh APIが多重実行されることを防ぐために使用する.
 */
let refreshPromise: Promise<void> | null = null;

/**
 * アクセストークンを再発行する.
 */
const refreshAccessToken = async (): Promise<void> => {
  // refresh中でなければ新規refresh開始.
  if (!refreshPromise) {
    refreshPromise = refreshClient
      .post("/auth/refresh")
      .then(() => undefined)
      .finally(() => {
        // refresh完了後は次回refresh可能にする.
        refreshPromise = null;
      });
  }

  // refresh中の場合は既存refresh完了を待機する.
  await refreshPromise;
};

/**
 * レスポンスinterceptor.
 *
 * access_token期限切れで401が返却された場合、
 * refresh tokenを用いてアクセストークンを再発行し、
 * 元のリクエストを再実行する.
 */
client.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | RetryableAxiosRequestConfig
      | undefined;

    /**
     * 以下の場合はrefreshを実行しない:
     * - 401以外
     * - リクエスト情報が存在しない
     * - 既にretry済み
     */
    if (
      error.response?.status !== 401 ||
      originalRequest === undefined ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    // 再試行済みフラグを設定する.
    originalRequest._retry = true;

    try {
      // access_tokenを再発行する.
      await refreshAccessToken();

      // 元のリクエストを再実行する.
      return client(originalRequest);
    } catch (refreshError) {
      // refresh失敗時は認証継続不可.
      return Promise.reject(refreshError);
    }
  },
);

/**
 * Cookieから指定した名前の値を取得する.
 *
 * Args:
 *   name:
 *     Cookie名.
 */
const getCookieValue = (name: string): string | null => {
  // document.cookie は以下形式の文字列: "a=xxx; b=yyy; c=zzz"
  const cookies = document.cookie.split("; ");

  // 指定Cookieを検索する.
  const targetCookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));

  if (!targetCookie) {
    return null;
  }

  // "name=value" の value 部分を返却する.
  return decodeURIComponent(targetCookie.split("=")[1]);
};

/**
 * リクエストinterceptor.
 *
 * 更新系API実行時はCSRF対策として
 * Cookieに保存されたcsrf_tokenを
 * X-CSRF-Token Headerへ付与する.
 */
client.interceptors.request.use((config) => {
  // HTTPメソッドを大文字へ統一する.
  const method = config.method?.toUpperCase();

  // 更新系リクエストのみCSRFトークンを付与する. GETはサーバー状態を変更しないため不要.
  if (method && ["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    const csrfToken = getCookieValue("csrf_token");

    if (csrfToken) {
      /**
       * CSRFトークンをHeaderへ設定する.
       *
       * サーバー側では:
       * Cookie csrf_token
       * Header X-CSRF-Token
       * の一致を検証する.
       */
      config.headers.set("X-CSRF-Token", csrfToken);
    }
  }

  return config;
});
