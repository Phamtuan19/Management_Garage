// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// /* eslint-disable @typescript-eslint/no-unsafe-call */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /* eslint-disable @typescript-eslint/no-unsafe-return */
// /* eslint-disable import/order */
// import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
// import ROUTE_PATH from '@App/configs/router-path';
// import { SubmitHandler, useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useMutation, useQuery } from '@tanstack/react-query';
// import { errorMessage, successMessage } from '@Core/Helper/message';
// import { AxiosError } from 'axios';
// import HttpStatusCode from '@Core/Configs/HttpStatusCode';
// import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
// import { useParams } from 'react-router-dom';
// import setValueHookForm from '@App/helpers/setValueHookForm';
// import { HandleErrorApi } from '@Core/Api/axios-config';
// import { useNavigate } from 'react-router-dom';
// import BaseFormCustomer from '../Customer/components/BaseFormCustomer';
// import { ValidationFormCreate, validationFormCreate } from './utils/personnel.schema';
// const breadcrumbs = [
//    {
//       title: 'Nhân viên',
//       link: ROUTE_PATH.PERSONNELS,
//    },
// ];
// const PersonelUpdate = () => {
//    const { id: personnelId } = useParams();
//    const navigate = useNavigate();
//    const form = useForm<ValidationFormCreate>({
//       resolver: yupResolver(validationFormCreate),
//       defaultValues: validationFormCreate.getDefault(),
//    });

//    const { refetch: getPersonnels } = useQuery(
//       ['getPersonnels', personnelId],
//       async () => {
//          const res = await validationFormCreate.find(personnelId!);
//          return res.data;
//       },
//       {
//          onSuccess: (data) => {
//             setValueHookForm(form.setValue, data as never);
//          },
//       },
//    );

//    const { mutate: Personnel, isLoading } = useMutation({
//       mutationFn: async (data: ValidationFormCreate) => {
//          return await validationFormCreate.update(data, personnelId, 'patch');
//       },
//       onSuccess: async () => {
//          successMessage('Cập nhật thành công !');
//          await getPersonnels();
//          navigate('/user/profile');
//       },
//       onError: (err: AxiosError) => {
//          const dataError = err.response?.data as HandleErrorApi;

//          if (Number(dataError.statusCode) === Number(HttpStatusCode.BAD_REQUEST)) {
//             return setErrorMessageHookForm(form.setError, dataError.message);
//          }
//          return errorMessage(err);
//       },
//    });

//    const onSubmitForm: SubmitHandler<ValidationFormCreate> = (data) => Personnel(data);

//    return (
//       <BaseBreadcrumbs arialabel="Cập nhật thông tin" breadcrumbs={breadcrumbs}>
//          <BaseFormCustomer onSubmitForm={onSubmitForm} form={form} isLoading={isLoading} isUpdate />
//       </BaseBreadcrumbs>
//    );
// };

// export default PersonelUpdate;

const PersonelUpdate = () => {
   return <div>PersonelUpdate</div>;
};

export default PersonelUpdate;
