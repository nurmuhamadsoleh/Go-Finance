export default function LoginValidation(values: any) {
  const error: any = {};
  const { username, password } = values;
  if (!username) {
    error.username = "Username wajib diisi";
  }
  if (!password) {
    error.password = "Password wajib diisi";
  }
  return error;
}
