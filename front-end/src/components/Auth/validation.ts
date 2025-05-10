export const isValidEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const isValidPassword = (password: string) => {
    return String(password).match(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
};

export const isValidName = (name: string) => {
    return String(name).length > 0;
};

export const isValidPhone = (phone: string | undefined) => {
    return String(phone).match(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    );
};
