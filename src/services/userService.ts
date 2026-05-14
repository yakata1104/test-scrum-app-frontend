import { client } from "@/api/client";
import type { User } from "@/types/user";

type CreateUserParams = {
  name: string;
  email: string;
  password: string;
};

/**
 * ユーザーを登録する.
 *
 * Args:
 *  params:
 *    ユーザー登録パラメータ.
 *
 * Returns:
 *  Promise<User>:
 *    登録したユーザー.
 */
export const createUser = async (params: CreateUserParams): Promise<User> => {
  const response = await client.post<User>("/users", params);

  return response.data;
};
