import { OrderDto } from "../dto/order";
import { client } from "./api";

export const createOrder = async (data: {
    user_id: string;
    product_ids: string[];
    values: {
        name: string;
        address: string;
        phone: string;
        total: number;
    };
}) => {
    const result = await client({ method: "POST", url: "/order", data });
    return result.data as OrderDto;
};

export const getOrders = async () => {
    const result = await client({
        method: "GET",
        url: "/order/orders",
    });

    return result.data as OrderDto[];
};
