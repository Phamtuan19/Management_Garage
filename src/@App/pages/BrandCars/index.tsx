/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import PageContent from '@App/component/customs/PageContent';
import MODULE_PAGE from '@App/configs/module-page';
import ROUTE_PATH from '@App/configs/router-path';
import useCoreTable from '@App/hooks/useCoreTable';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import brandCarService from '@App/services/brand-car.service';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { CoreTableActionEdit, CoreTableActionViewDetail } from '@Core/Component/Table/components/CoreTableAction';
import { Box, Chip } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// const sortList = [
//    {
//       title: 'Mã',
//       value: 'code',
//    },
//    {
//       title: 'Tên',
//       value: 'name',
//    },
//    {
//       title: 'Biển số xe',
//       value: 'license_plate',
//    },
//    {
//       title: 'Loại xe',
//       value: 'car_type',
//    },
//    {
//       title: 'Thương hiệu',
//       value: 'brand_car',
//    },
// ];

const index = () => {
   const navigate = useNavigate();

   const queryTable = useQuery(['getBrandCarAll'], async () => {
      const res = await brandCarService.get({ isPagination: true });
      return res.data;
   });

   const data = useCoreTable(queryTable);

   const columns = useMemo(() => {
      return [
         columnHelper.accessor((_, index) => index + 1, {
            id: 'STT',
            header: () => <Box sx={{ textAlign: 'center' }}>STT</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('name', {
            header: () => <Box sx={{ textAlign: 'center' }}>Tên thương hiệu</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('Dòng xe', {
            header: () => <Box sx={{ textAlign: 'center' }}>Tên thương hiệu</Box>,
            cell: ({ row }) => {
               const brandCar = row.original as any;
               return (
                  <Box
                     sx={{
                        textAlign: 'center',
                        maxWidth: '85%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                     }}
                  >
                     {brandCar?.models.map((item: string) => {
                        return <Chip variant="outlined" label={item} />;
                     })}
                  </Box>
               );
            },
         }),
         columnHelper.accessor('action', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const brandCar = row.original as any;
               return (
                  <Box>
                     <PermissionAccessRoute module={MODULE_PAGE.CARS} action="VIEW_ONE">
                        <CoreTableActionViewDetail
                           callback={() => navigate(ROUTE_PATH.CARS + '/' + brandCar._id + '/details')}
                        />
                     </PermissionAccessRoute>
                     {/* <CoreTableActionDelete /> */}

                     <PermissionAccessRoute module={MODULE_PAGE.CARS} action="UPDATE">
                        <CoreTableActionEdit
                           callback={() => navigate(ROUTE_PATH.CARS + '/' + brandCar._id + '/update')}
                        />
                     </PermissionAccessRoute>
                  </Box>
               );
            },
         }),
      ];
   }, []);

   return (
      <BaseBreadcrumbs arialabel="Thương hiệu xe">
         {/* <Box>
             <PermissionAccessRoute module={MODULE_PAGE.BRAND_CARS} action={PAGE_ACTION.CREATE}>
               <Button component={Link} to="create" size="medium">
                  Thêm mới
               </Button>
            </PermissionAccessRoute> 
         </Box> */}
         <PageContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               {/* <FilterTable sortList={sortList} searchType={sortList}></FilterTable> */}

               {/* <Button component={Link} to="create" endIcon={<AddIcon />}>
                  Thêm mới
               </Button> */}
            </Box>
            <TableCore columns={columns} {...data} />
         </PageContent>
      </BaseBreadcrumbs>
   );
};

export default index;
