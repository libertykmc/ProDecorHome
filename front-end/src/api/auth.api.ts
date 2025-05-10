import {
    UserLoginDto,
    UserLoginResponseDto,
    UserRegisterDto,
} from "../dto/user";
import { client } from "./api";

export const authRegister = async (data: UserRegisterDto) => {
    const result = await client({
        method: "POST",
        url: "/user/register",
        data,
    });

    return result.data;
};

export const authLogin = async (data: UserLoginDto) => {
    const result = await client({
        method: "POST",
        url: "/user/login",
        data,
    });

    return result.data as UserLoginResponseDto;
};

export const authLogout = async () => {
    const result = await client({
        method: "POST",
        url: "/user/logout",
    });

    return result.data;
};
