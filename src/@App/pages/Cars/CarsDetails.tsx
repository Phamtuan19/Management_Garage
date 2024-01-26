/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ROUTE_PATH from '@App/configs/router-path';
import { useQuery } from '@tanstack/react-query';
import MODULE_PAGE from '@App/configs/module-page';
import theme from '@Core/Theme';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import { Box, Typography, Stack, Button, Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import carsService from '@App/services/cars.service';
import { format } from "date-fns";


const breadcrumbs = [
    {
        title: 'Dịch vụ sửa chữa xe',
        link: ROUTE_PATH.CARS,
    },
];

const formatDate = (dateString: string | number | Date) => {
    return dateString ? format(new Date(dateString), "MM-dd-yyyy") : '';
};

const DetailsItem = ({ label, value }) => (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={3}>
            <Typography sx={{ p: 1, fontWeight: '700', fontSize: '1rem', color: theme.palette.grey[800] }}>
                {label}
            </Typography>
        </Grid>
        <Grid item xs={9}>
            <Typography sx={{ p: 1, flexGrow: 1, fontSize: '1rem' }}>
                {value}
            </Typography>
            <Divider variant="inset" sx={{ m: 0 }} />
        </Grid>
    </Grid>
);

const DetailsSection = ({ details }) => (
    details.map((detail: { label: string; value: string; }, index: React.Key | null | undefined) => (
        <Grid key={index}>
            <DetailsItem label={detail.label} value={detail.value} />
        </Grid>
    ))
)

const CarsDetails = () => {
    const { id: carsId } = useParams();
    const navigate = useNavigate();
    const { data: cars } = useQuery(['getCarsDetails'], async () => {
        const res = await carsService.find(carsId as string);
        return res.data;
    });

    const customerDetails = [
        { label: 'Tên khách hàng', value: cars?.customer_id.name },
        { label: 'Số điện thoại', value: cars?.customer_id.phone },
        { label: 'Giới tính', value: cars?.customer_id.gender },
        { label: 'Ngày tạo', value: formatDate(cars?.customer_id.createdAt) },
        { label: 'Ngày cập nhật cuối', value: formatDate(cars?.customer_id.updatedAt) },
    ];

    const carDetails = [
        { label: 'Tên xe', value: cars?.name },
        { label: 'Thương hiệu xe', value: cars?.brand_car },
        { label: 'Biển số xe', value: cars?.license_plate },
        { label: 'Năm sản xuất', value: cars?.production_year },
        { label: 'Màu xe', value: cars?.car_color },
        { label: 'Loại xe', value: cars?.car_type },
        { label: 'Trạng thái', value: cars?.status },
        { label: 'Ngày tạo', value: formatDate(cars?.createdAt) },
        { label: 'Ngày cập nhật cuối', value: formatDate(cars?.updatedAt) },
    ];

    return (
        <Box>
            <BaseBreadcrumbs
                breadcrumbs={breadcrumbs}
                arialabel="Chi tiết nhà phân phối"
                sx={({ base }) => ({ bgcolor: base.background.default, border: 'none', p: 0 })}
            >
                {cars && (
                    <Stack>
                        <Box sx={{ mt: 3, bgcolor: '#FFFF', p: '0px 16px 16px 16px', borderRadius: 2, position: 'relative' }}>
                            <Box sx={{ position: 'absolute', top: '0', right: '0', p: 1 }}>
                                <PermissionAccessRoute module={MODULE_PAGE.CARS} action="VIEW_ALL">
                                    <Button
                                        variant="contained"
                                        onClick={() => navigate(ROUTE_PATH.CARS + '/' + carsId + '/update')}
                                        endIcon={<RateReviewRoundedIcon />}
                                    >
                                        Chỉnh sửa
                                    </Button>
                                </PermissionAccessRoute>
                            </Box>
                            <Box>
                                <Box sx={{ mt: 4, p: 4, borderRadius: 2, position: 'relative' }}>
                                    <Box sx={{ mb: 2, minHeight: '50px', display: 'flex', gap: 25 }}>
                                        <Typography
                                            sx={{ fontWeight: '900', fontSize: '1.5rem', color: theme.palette.grey[800] }}
                                        >
                                            Thông tin khách hàng
                                        </Typography>
                                    </Box>
                                    <DetailsSection details={customerDetails} />
                                </Box>
                                <Box sx={{ mt: 4, p: 4, borderRadius: 2, position: 'relative' }}>
                                    <Box sx={{ mb: 2, minHeight: '50px', display: 'flex', gap: 25 }}>
                                        <Typography sx={{ fontWeight: '900', fontSize: '1.5rem', color: theme.palette.grey[800] }}>
                                            Thông tin xe
                                        </Typography>
                                    </Box>
                                    <DetailsSection details={carDetails} />
                                </Box>
                            </Box>
                        </Box>
                    </Stack>
                )}
            </BaseBreadcrumbs>
        </Box>
    );
};

export default CarsDetails;
