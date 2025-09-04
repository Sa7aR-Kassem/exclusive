import * as z from "zod";

export const addressFormSchema = z.object({
    cartId: z.string().optional(),
    details: z.string().nonempty({ message: "Name is required" }),
    city: z.string().nonempty({ message: "City is required" }),
    phone: z
        .string()
        .nonempty({ message: "Phone is required" })
        .regex(/^(002|\+2)?01[0-25][0-9]{8}$/, {
            message: "Invalid egyptian phone number",
        }),
    paymentMethod: z.enum(["cash", "card"]).optional(),
});

export type AddressFormType = z.infer<typeof addressFormSchema>;

export const addressFormState = {
    success: false,
    error: {
        details: [],
        city: [],
        phone: [],
        paymentMethod: [],
    },
    message: null,
};

export type addressFormStateType = {
    success: boolean;
    error: {
        details?: string[];
        city?: string[];
        phone?: string[];
        paymentMethod?: string[];
    };
    message: string | null;
    paymentMethod?: string;
    redirectUrl?: string;
};
