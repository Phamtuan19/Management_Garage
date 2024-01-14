/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-floating-promises */

import theme from '@Core/Theme';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import roleService, { RoleResponseData } from '@App/services/role.service';
import MODULE_PAGE from '@App/configs/module-page';
import ROUTE_PATH from '@App/configs/router-path';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';

import { ROLES } from '../utils';

import RoleDetailText from './RoleDetailText';

const RoleDetailTextSection = () => {
   // const [roleDetail, setRoleDetail] = useState<RoleResponseData | []>([]);
   const { id: roleId } = useParams();
   const navigate = useNavigate();

   // useEffect(() => {
   //    const getRoleDetail = async () => {
   //       try {
   //          const res = await roleService.find(roleId as string);
   //          console.log(res);
   //          setRoleDetail(res?.data | []);
   //       } catch (error) {
   //          console.log(error);
   //       }
   //    };
   //    getRoleDetail();
   // }, []);

   return (
      
   );
};

export default RoleDetailTextSection;
