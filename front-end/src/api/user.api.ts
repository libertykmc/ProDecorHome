import {
    UserDto,
    UserPasswordDto,
    UserUpdateDto,
    UserUpdateDtoAdmin,
} from "../dto/user";
import { client } from "./api";

export const getUsers = async () => {
    const result = await client({
        method: "GET",
        url: `/user`,
    });

    return result.data as UserDto[];
};

export const getUser = async (id: string) => {
    const result = await client({
        method: "GET",
        url: `/user/${id}`,
    });

    return result.data as UserDto;
};

export const updateUser = async (
    id: string,
    data: UserUpdateDto | UserUpdateDtoAdmin
) => {
    const result = await client({
        method: "PUT",
        url: `/user/${id}`,
        data,
    });
    return result.data as UserDto;
};

export const deleteUser = async (id: string) => {
    const result = await client({
        method: "DELETE",
        url: `/user/${id}`,
    });

    return result.data;
};

export const updateUserPassword = async (id: string, data: UserPasswordDto) => {
    const result = await client({
        method: "PUT",
        url: `/user/${id}/change-password`,
        data,
    });

    return result.data;
};
