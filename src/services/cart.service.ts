"use server";

import { getUserToken } from "@/lib/server-utils";

export async function getUserCart() {
    try {
        const token = await getUserToken();
        const res = await fetch(`${process.env.API_BASE_URL}/api/v1/cart`, {
            headers: {
                token: token as string,
            },
        });

        const data = await res.json();
        if (!res.ok) {
            return {
                message: data.message || "Error fetching cart",
                success: false,
                data: null,
            };
        }

        return {
            message: data.message || "Cart fetched successfully",
            success: true,
            data: data,
        };
    } catch (error) {
        return {
            message: (error as Error).message || "Unexpected error",
            success: false,
            data: null,
        };
    }
}

export async function removeUserCart() {
    try {
        const token = await getUserToken();
        const res = await fetch(`${process.env.API_BASE_URL}/api/v1/cart`, {
            method: "DELETE",
            headers: {
                token: token as string,
            },
        });

        const data = await res.json();
        console.log(data);

        if (!res.ok) {
            return {
                message: data.message || "Error removing cart",
                success: false,
                data: null,
            };
        }

        return {
            message: data.message || "Cart removed successfully",
            success: true,
            data: data,
        };
    } catch (error) {
        return {
            message: (error as Error).message || "Unexpected error",
            success: false,
            data: null,
        };
    }
}

export async function addToCart(productId: string) {
    try {
        console.log("productId", productId);

        const token = await getUserToken();
        const res = await fetch(`${process.env.API_BASE_URL}/api/v1/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token as string,
            },
            body: JSON.stringify({ productId }),
        });

        const data = await res.json();
        console.log(data);

        if (!res.ok) {
            return {
                message: data.message || "Product not added to cart",
                success: false,
                data: null,
            };
        }

        return {
            message: data.message || "Product added to cart successfully",
            success: true,
            data: data,
        };
    } catch (error) {
        return {
            message: (error as Error).message || "Unexpected error",
            success: false,
            data: null,
        };
    }
}

export async function removeFromCart(productId: string) {
    try {
        console.log("productId", productId);

        const token = await getUserToken();
        const res = await fetch(
            `${process.env.API_BASE_URL}/api/v1/cart/${productId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    token: token as string,
                },
            }
        );

        const data = await res.json();
        console.log(data);

        if (!res.ok) {
            return {
                message: data.message || "Product not removed from cart",
                success: false,
                data: null,
            };
        }

        return {
            message: data.message || "Product removed from cart successfully",
            success: true,
            data: data,
        };
    } catch (error) {
        return {
            message: (error as Error).message || "Unexpected error",
            success: false,
            data: null,
        };
    }
}

export async function updateQtyCart(productId: string, count: number) {
    try {
        console.log("productId", productId);

        const token = await getUserToken();
        const res = await fetch(
            `${process.env.API_BASE_URL}/api/v1/cart/${productId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    token: token as string,
                },
                body: JSON.stringify({ count }),
            }
        );

        const data = await res.json();
        console.log(data);

        if (!res.ok) {
            return {
                message: data.message || "Product not updated in cart",
                success: false,
                data: null,
            };
        }

        return {
            message: data.message || "Product updated in cart successfully",
            success: true,
            data: data,
        };
    } catch (error) {
        return {
            message: (error as Error).message || "Unexpected error",
            success: false,
            data: null,
        };
    }
}
