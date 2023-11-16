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
    sdt: yup
        .string()
        .required(messageValidate.required('SDT'))
        .matches(Regexs.phoneVn, messageValidate.phone),

    cmnd: yup
        .string()
        .required(messageValidate.required('CMND'))
        .matches(Regexs.cmnd, messageValidate.cmnd),

    role: yup
        .string()
        .required(messageValidate.required('Bộ phận ')),

});

export type ValidationFormCreate = yup.InferType<typeof ValidationFormCreate>;