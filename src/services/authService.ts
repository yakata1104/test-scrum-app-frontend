import { client } from "../api/client";
import type { LoginResponse } from "../types/auth";
import type { User } from "@/types/user";

type LoginParams = {
  email: string;
  password: string;
};

export const login = async ({
  email,
  password,
}: LoginParams): Promise<LoginResponse> => {
  const formData = new URLSearchParams();

  formData.append("username", email);
  formData.append("password", password);

  const response = await client.post<LoginResponse>("/auth/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};

/**
 * ログアウトする.
 */
export const logout = async (): Promise<void> => {
  await client.post("auth/logout");
};

/**
 * ログイン中ユーザーを取得する.
 *
 * Returns:
 *  Promise<User>:
 *    ログイン中ユーザ-
 */
export const fetchMe = async (): Promise<User> => {
  const response = await client.get<User>("/auth/me");

  return response.data;
};
