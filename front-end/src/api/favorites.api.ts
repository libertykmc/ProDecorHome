import { FavoritesDto } from "../dto/favorites";
import { client } from "./api";

export const getFavorites = async (user_id: string) => {
    const result = await client({
        method: "GET",
        url: `/favorites`,
        params: { user_id },
    });

    return result.data as FavoritesDto[];
};

export const createFavorites = async (data: {
    user_id: string;
    product_id: string;
}) => {
    const result = await client({
        method: "POST",
        url: `/favorites`,
        data,
    });

    return result.data as FavoritesDto;
};

export const deleteFavorites = async (id: string) => {
    const result = await client({
        method: "DELETE",
        url: `/favorites/${id}`,
    });

    return result.data;
};
