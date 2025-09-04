import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
export async function getUserToken() {
  const encodedToken = (await cookies()).get("next-auth.session-token")?.value;

  const decodedToken = await decode({
    token: encodedToken,
    secret: process.env.AUTH_SECRET!,
  });

  console.log("decodedToken", decodedToken!.token);

  return decodedToken!.token;
}
