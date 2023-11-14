import messageValidate from '@App/helpers/messageValidate';
import Regexs from '@Core/Configs/Regexs';
import * as yup from 'yup';

export const ValidationFormCreate = yup.object({
    name: yup
        .string()
        .required(messageValidate.required('Tên')),

    email: yup
        .string()
        .required(messageValidate.required('Email'))
        .matches(Regexs.email, messageValidate.email)
        .max(100, messageValidate.maxText('Email', 100)),
    address: yup
        .string()
        .required(messageValidate.required('Địa chỉ')),
    gender: yup
        .string()
        .required(messageValidate.required('Giới tính')),
    sdt: yup
        .string()
        .required(messageValidate.required('SDT')),
    cmnd: yup
        .string()
        .required(messageValidate.required('Giới tính')),
    status: yup
        .string()
        .required(messageValidate.required('Trạng thái')),
    role: yup
        .string()
        .required(messageValidate.required('Chức vụ')),

});

export type ValidationFormCreate = yup.InferType<typeof ValidationFormCreate>;