"use client";

import { addToCart } from "@/services/cart.service";
import { useTransition } from "react";
import CustomButton from "../shared/CustomButton";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { LoaderCircle } from "lucide-react";

export default function AddToCartButton({
    productId,
    ...props
}: {
    productId: string;
    [key: string]: string;
}) {
    const [isPending, startTransition] = useTransition();
    const { getCartDetails } = useCart();

    async function addProductToCart(productId: string) {
        startTransition(async () => {
            console.log(productId);

            const data = await addToCart(productId);
            console.log(data);

            if (data?.success) {
                toast.success(data.message);

                getCartDetails();

                // setCartDetails(data.data);
            } else {
                toast.error(data!.message);
            }
        });
    }

    return (
        // <button onClick={handleClick} disabled={isPending}>
        //     {isPending ? "جاري الإضافة..." : "أضف للسلة"}
        // </button>

        <CustomButton
            {...props}
            onClick={() => addProductToCart(productId)}
            disabled={isPending}
        >
            {isPending ? (
                <LoaderCircle className="animate-spin" />
            ) : (
                "Add to Cart"
            )}
        </CustomButton>
    );
}
