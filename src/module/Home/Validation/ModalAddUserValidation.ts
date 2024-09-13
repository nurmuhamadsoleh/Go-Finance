export default function ModalAddUserValidation(values: any) {
    const error: any = {};
    const { name} = values;
    if (!name) {
      error.name = "Nama Lengkap Wajib Di isi";
    }

    return error;
  }