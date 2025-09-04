import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
export async function getUserToken() {
    // __Secure-next-auth.session-token
    const cookieStore = await cookies();

    const encodedToken =
        cookieStore.get("__Secure-next-auth.session-token")?.value ||
        cookieStore.get("next-auth.session-token")?.value;
    // const encodedToken = (await cookies()).get(
    //     "next-auth.session-token"
    // )?.value;

    const decodedToken = await decode({
        token: encodedToken,
        secret: process.env.AUTH_SECRET!,
    });

    console.log("decodedToken", decodedToken!.token);

    return decodedToken!.token;
}
