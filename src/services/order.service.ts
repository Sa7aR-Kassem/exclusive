"use server";

import { getUserToken } from "@/lib/server-utils";
import {
    addressFormSchema,
    addressFormStateType,
} from "@/schema/address.schema";

export async function handelCheckout(
    formState: addressFormStateType,
    formData: FormData
): Promise<addressFormStateType> {
    const paymentMethod = (formData.get("paymentMethod") ?? "cash") as string;

    const formValues = {
        details: formData.get("details"),
        city: formData.get("city"),
        phone: formData.get("phone"),
        paymentMethod: paymentMethod,
    };
    const cartId = formData.get("cartId");
    console.log("cartId", cartId);

    const parsedData = addressFormSchema.safeParse(formValues);

    if (!parsedData.success) {
        return {
            success: false,
            error: parsedData.error?.flatten().fieldErrors,
            message: null,
        };
    }

    const endpoint =
        paymentMethod === "cash"
            ? `api/v1/orders/${cartId}`
            : `api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`;
    try {
        const token = await getUserToken();

        const res = await fetch(`${process.env.API_BASE_URL}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token as string,
            },
            body: JSON.stringify({
                details: formData.get("details"),
                city: formData.get("city"),
                phone: formData.get("phone"),
            }),
        });

        const data = await res.json();

        console.log(data);

        if (!res.ok) {
            return {
                success: false,
                error: {},
                message: data.message || "Error creating order",
            };
        }

        return {
            success: true,
            error: {},
            message: data.message || "Order placed successfully",
            redirectUrl:
                paymentMethod === "cash" ? `/allorders` : data.session.url,
            paymentMethod: paymentMethod,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: {},
            message: (error as Error).message || "Unexpected error",
        };
    }
}
