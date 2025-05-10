export interface UserLoginDto {
    login: string;
    password: string;
}

export interface UserLoginResponseDto {
    id: string;
    token: string;
}

export interface UserDto extends UserLoginDto {
    id: string;
    first: string;
    last?: string;
    second?: string;
    phone?: string;
    news?: boolean;
    role: string;
}

export interface UserUpdateDto
    extends Omit<UserDto, "id" | "login" | "password" | "role"> {}

export interface UserUpdateDtoAdmin
    extends Omit<UserDto, "id" | "password" | "role"> {}
export interface UserRegisterDto extends Omit<UserDto, "id"> {}

export interface UserPasswordDto extends Omit<UserLoginDto, "login"> {
    password: string;
}
