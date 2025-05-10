export interface OrderDto {
    id: string;
    user_id: string;
    product_ids: string[];
    values: {
        name: string;
        address: string;
        phone: string;
        total: number;
    };
}
