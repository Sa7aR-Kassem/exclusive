"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import CustomButton from "@/components/shared/CustomButton";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

import { useActionState, useEffect } from "react";
import { addressFormState, AddressFormType } from "@/schema/address.schema";
import { addressFormSchema } from "../../../schema/address.schema";
import { handelCheckout } from "@/services/order.service";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
export default function CheckoutPage() {
    const { cartDetails, setCartDetails } = useCart();
    const [action, formAction] = useActionState(
        handelCheckout,
        addressFormState
    );
    const router = useRouter();
    const form = useForm<AddressFormType>({
        resolver: zodResolver(addressFormSchema),
        defaultValues: {
            details: "",
            city: "",
            phone: "",
            paymentMethod: "cash",
        },
    });

    useEffect(() => {
        if (cartDetails?.cartId) {
            form.setValue("cartId", cartDetails.cartId.toString());
        }
    }, [cartDetails?.cartId, form]);

    useEffect(() => {
        if (action) {
            console.log("action", action);

            if (action.success) {
                if (action.paymentMethod === "cash") {
                    setCartDetails(null);
                    toast.success(action.message);
                    router.push((action.redirectUrl as string) || "/");
                } else {
                    window.location.href = action.redirectUrl as string;
                }
            } else if (!action.success && action.message) {
                toast.error(action.message);
            }
        }
    }, [action, router, setCartDetails]);

    return (
        <section className="py-20">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Register</h1>
                <Form {...form}>
                    <form action={formAction} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="cartId"
                            render={({ field }) => (
                                <input
                                    type="hidden"
                                    {...field}
                                    value={cartDetails?.cartId?.toString()}
                                />
                            )}
                        />

                        {/********** Name Field  *******/}
                        <FormField
                            control={form.control}
                            name="details"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John Doe"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {action?.error?.details?.[0]}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        {/********** Email Field  *******/}
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="username@domain.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {action?.error?.city?.[0]}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        {/********** Phone Field  *******/}
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="***********"
                                            {...field}
                                            type="tel"
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {action?.error?.phone?.[0]}
                                    </FormMessage>{" "}
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Payment Method</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            value={field.value}
                                            className="flex flex-col"
                                            name={field.name}
                                            onValueChange={field.onChange}
                                            defaultValue={"cash"}
                                        >
                                            <FormItem className="flex items-center gap-3">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        value="cash"
                                                        defaultChecked
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Cash
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center gap-3">
                                                <FormControl>
                                                    <RadioGroupItem value="card" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Card
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage>
                                        {action?.error.paymentMethod?.[0]}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        <CustomButton type="submit" variant={"destructive"}>
                            Place Order
                        </CustomButton>
                    </form>
                </Form>
            </div>
        </section>
    );
}
