import { client } from "../api/client";
import type { LoginResponse } from "../types/auth";

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
