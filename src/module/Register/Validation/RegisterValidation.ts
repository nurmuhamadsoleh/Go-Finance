export default function RegisterValidation(values: any) {
    const error: any = {};
    const { email, password } = values;

    if (!email) {
        error.email = "Email Wajib Diisi";
    }
     if (!password) {
        error.password = "Password Wajib Diisi";
    }
    return error;
}