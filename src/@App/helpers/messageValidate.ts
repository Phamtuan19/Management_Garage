const messageValidate = {
   required: (name: string) => {
      return `${name} không được để trống`;
   },
   string: (name: string) => {
      return `${name} phải là chuỗi`;
   },
   minText: (name: string, min: string | number) => {
      return `${name} phải lớn hơn ${min} ký tự`;
   },
   minNumber: (name: string, min: string | number) => {
      return `${name} phải lớn hơn ${min}`;
   },
   maxText: (name: string, max: string | number) => {
      return `${name} không thể lớn hơn ${max} ký tự`;
   },
   maxNumber: (name: string, max: string | number) => {
      return `${name} không được lớn hơn ${max}`;
   },
   email: 'Email không đúng định dạng',
   phone: 'Số điện thoại không đúng định dạng',
   cmnd: 'cmnd không đúng định dạng',
};

export default messageValidate;
