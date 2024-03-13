import ButtonCreate from '@App/component/common/ButtonCreate';
import ButtonEdit from '@App/component/common/ButtonEdit';
import ROUTE_PATH from '@App/configs/router-path';
import { STATUS_REPAIR } from '@App/configs/status-config';
import { ResponseFindOneRepairInvoice } from '@App/types/repair-invoice';
import { Box, Button } from '@mui/material';
import { useParams } from 'react-router-dom';

interface RepairDetailActionProps {
   data: ResponseFindOneRepairInvoice | undefined;
}

const RepairDetailAction = ({ data }: RepairDetailActionProps) => {
   const { id: repairInvoicId } = useParams();

   const status = data?.status;

   return (
      <Box mb={1} display="flex" justifyContent="space-between">
         <Box display="flex" gap={1}>
            <ButtonCreate to={ROUTE_PATH.REPAIR_INVOICE + ROUTE_PATH.CREATE} />
            <ButtonEdit to={ROUTE_PATH.REPAIR_INVOICE + '/' + repairInvoicId + '/update'} />
         </Box>
         <Box display="flex" gap={1}>
            <Button color="warning">Chuyển trạng thái</Button>
            {(status === STATUS_REPAIR.create.key || status === STATUS_REPAIR.check.key) && (
               <Button color="error">Hủy</Button>
            )}
         </Box>
      </Box>
   );
};

export default RepairDetailAction;
