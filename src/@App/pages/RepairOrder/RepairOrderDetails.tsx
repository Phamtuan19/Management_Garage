/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useParams, useNavigate } from 'react-router-dom';
import ROUTE_PATH from '@App/configs/router-path';
import { useMutation, useQuery } from '@tanstack/react-query';
import MODULE_PAGE from '@App/configs/module-page';
import theme from '@Core/Theme';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Typography, Stack, Button, Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import { format } from 'date-fns';
import repairorderService from '@App/services/repairorder.service';
import { STATUS_REPAIR } from '@App/configs/status-config';
import { AxiosResponseData, HandleErrorApi } from '@Core/Api/axios-config';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';

const breadcrumbs = [
  {
    title: 'Phiếu sửa chữa',
    link: ROUTE_PATH.REPAIR_ORDERS,
  },
];
const RepairOrderDetails = () => {
  const { id: repairorderId } = useParams();

  const navigate = useNavigate();
  const { data: repairorder } = useQuery(['getRepairOrderDetails', repairorderId], async () => {
    const repairorderRes = await repairorderService.get();
    return repairorderRes.data;
  });
  console.log(repairorder);
  

  const { mutate: handleDelete } = useMutation({
    mutationFn: async (id: string) => {
      const res = await repairorderService.delete(id);
      return res;
    },
    onSuccess: (data: AxiosResponseData) => {
      successMessage(data.message || 'Xóa thành công');
      const refetch = repairorder.refetch;
      navigate(ROUTE_PATH.REPAIR_ORDERS);
      return refetch();
    },
    onError: (err: AxiosError) => {
      const dataError = err.response?.data as HandleErrorApi;

      return errorMessage((dataError?.message as unknown as string) || 'Xóa thất bại');
    },
  });


  const formatDate = (dateString: string | number | Date) => {
    return dateString ? format(new Date(dateString), 'MM-dd-yyyy') : '';
  };

  const status = repairorder?.data[0]?.status;

  const statusTitle = status ? STATUS_REPAIR[status].title : '';

  const repairOrderDetails = [
    { label: 'Mã sửa chữa', value: repairorder?.data[0]?.code },
    { label: 'Người tạo', value: repairorder?.data[0].personnel_id.full_name },

    { label: 'Kilomet', value: repairorder?.data[0].kilometer },
    { label: 'Trạng thái', value: statusTitle },
    { label: 'Ngày tạo', value: formatDate(repairorder?.data[0]?.createdAt) },
    { label: 'Ngày cập nhật cuối', value: formatDate(repairorder?.data[0]?.updatedAt) },

  ];

  const car = [
    { label: 'Mã xe', value: repairorder?.data[0]?.car_id.code },
    { label: 'Thương hiệu xe', value: repairorder?.data[0]?.car_id.brand_car },
    { label: 'Biển số xe', value: repairorder?.data[0]?.car_id.license_plate },
    { label: 'Năm sản xuất', value: repairorder?.data[0]?.car_id.production_year },
    { label: 'Màu xe', value: repairorder?.data[0]?.car_id.car_color },
    { label: 'Loại xe', value: repairorder?.data[0]?.car_id.car_type },
    { label: 'Trạng thái', value: repairorder?.data[0]?.car_id.status },
    { label: 'Ngày tạo', value: formatDate(repairorder?.data[0]?.car_id.createdAt) },
    { label: 'Ngày cập nhật cuối', value: formatDate(repairorder?.data[0]?.car_id.updatedAt) }
  ];
  // const services = [
  //   { label: 'Mã xe', value: repairorder?.data[0]?.car_id.code },
  //   { label: 'Thương hiệu xe', value: repairorder?.data[0]?.car_id.brand_car },
  //   { label: 'Biển số xe', value: repairorder?.data[0]?.car_id.license_plate },
  //   { label: 'Năm sản xuất', value: repairorder?.data[0]?.car_id.production_year },
  //   { label: 'Màu xe', value: repairorder?.data[0]?.car_id.car_color },
  //   { label: 'Loại xe', value: repairorder?.data[0]?.car_id.car_type },
  //   { label: 'Trạng thái', value: repairorder?.data[0]?.car_id.status },
  //   { label: 'Ngày tạo', value: formatDate(repairorder?.data[0]?.car_id.createdAt) },
  //   { label: 'Ngày cập nhật cuối', value: formatDate(repairorder?.data[0]?.car_id.updatedAt) }
  // ];
  return (
    <Box>
      <BaseBreadcrumbs
        breadcrumbs={breadcrumbs}
        arialabel="Chi tiết phiếu sửa chữa"
        sx={({ base }) => ({ bgcolor: base.background.default, border: 'none', p: 0 })}
      >
        {repairorder && (
          <Stack>
            <Box sx={{ mt: 3, bgcolor: '#FFFF', p: '0px 16px 16px 16px', borderRadius: 2, position: 'relative' }}>
              <Box sx={{ position: 'absolute', top: '0', right: '0', p: 1 }}>
                <PermissionAccessRoute module={MODULE_PAGE.REPAIR_ORDERS} action="DELETE">
                  <Button
                  sx={{background: '#e74c3c'}}
                  endIcon={<DeleteIcon />}
                    onClick={() => handleDelete(repairorderId)}
                  >
                    Xóa
                    {/* <CoreTableActionDelete callback={() => handleDelete(repairorderId)} /> */}
                  </Button>
                </PermissionAccessRoute>
              </Box>

              <Box>
                <Box sx={{ mt: 4, p: 4, borderRadius: 2, position: 'relative' }}>
                  <Box sx={{ mb: 2, minHeight: '50px', display: 'flex', gap: 25 }}>
                    <Typography
                      sx={{ fontWeight: '900', fontSize: '1.5rem', color: theme.palette.grey[800] }}
                    >
                      Thông tin phiếu sửa chữa
                    </Typography>
                  </Box>

                  {repairOrderDetails.map((detail, index) => (
                    <Grid key={index}>
                      <DetailsItem label={detail.label} value={detail.value} />
                    </Grid>
                  ))}
                </Box>
                <Box sx={{ mt: 4, p: 4, borderRadius: 2, position: 'relative' }}>
                  <Box sx={{ mb: 2, minHeight: '50px', display: 'flex', gap: 25 }}>
                    <Typography
                      sx={{ fontWeight: '900', fontSize: '1.5rem', color: theme.palette.grey[800] }}
                    >
                      Thông tin xe
                    </Typography>
                  </Box>

                  {car.map((detail, index) => (
                    <Grid key={index}>
                      <DetailsItem label={detail.label} value={detail.value} />
                    </Grid>
                  ))}
                </Box>
              </Box>
            </Box>
          </Stack>
        )}
      </BaseBreadcrumbs>
    </Box>
  );
};
const DetailsItem = ({ label, value }: { label: string; value: string }) => (
  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    <Grid item xs={3}>
      <Typography sx={{ p: 1, fontWeight: '700', fontSize: '1rem', color: theme.palette.grey[800] }}>
        {label}
      </Typography>
    </Grid>
    <Grid item xs={9}>
      <Typography sx={{ p: 1, flexGrow: 1, fontSize: '1rem' }}>{value}</Typography>
      <Divider variant="inset" sx={{ m: 0 }} />
    </Grid>
  </Grid>
);
export default RepairOrderDetails;
