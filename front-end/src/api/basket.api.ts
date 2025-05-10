import { BasketDto } from "../dto/basket.dto";
import { client } from "./api";

export const getBasket = async (user_id: string) => {
    const result = await client({
        method: "GET",
        url: `/basket`,
        params: { user_id },
    });

    return result.data as BasketDto[];
};

export const createBasket = async (data: {
    user_id: string;
    product_id: string;
    quantity: number;
}) => {
    const result = await client({
        method: "POST",
        url: `/basket`,
        data,
    });

    return result.data as BasketDto;
};

export const deleteBacket = async (id: string) => {
    const result = await client({
        method: "DELETE",
        url: `/basket/${id}`,
    });

    return result.data;
};

export const updateQuantity = async (data: {
    id: string;
    quantity: number;
}) => {
    const result = await client({
        method: "PUT",
        url: `/basket/${data.id}`,
        data: {
            quantity: data.quantity,
        },
    });
    return result.data;
};
