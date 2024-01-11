import MODULE_PAGE from '@App/configs/module-page';
import messageValidate from '@App/helpers/messageValidate';
import * as yup from 'yup';

export const validationFormCreate = yup.object({
   name: yup.string().required(messageValidate.required('Tên')).default(''),
   describe: yup.string().default(''),
   permission: yup
      .object({
         [MODULE_PAGE.PERSONNELS]: yup.mixed().required('Quyền truy cập').default([]),
         [MODULE_PAGE.ROLES]: yup.mixed().required('Quyền truy cập').default([]),
         [MODULE_PAGE.MATERIALS_CATALOGS]: yup.mixed().required('Quyền truy cập').default([]),
         [MODULE_PAGE.DISTRIBUTORS]: yup.mixed().required('Quyền truy cập').default([]),
      })
      .required(messageValidate.required('Quyền truy cập')),
});

export type ValidationFormCreate = yup.InferType<typeof validationFormCreate>;
