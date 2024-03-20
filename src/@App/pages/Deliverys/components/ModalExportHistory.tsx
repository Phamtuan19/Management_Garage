// /* eslint-disable @typescript-eslint/naming-convention */
// /* eslint-disable no-empty-pattern */
// import { DeliveryNoteDataDetail } from '@App/types/delivery';
// import { Box, ButtonBase, Chip, Modal, Typography } from '@mui/material';
// import React, { forwardRef, useImperativeHandle, useState } from 'react';
// import { STATUS_DELIVERY } from '@App/configs/status-config';
// import CloseIcon from '@mui/icons-material/Close';
// import ScrollbarBase from '@App/component/customs/ScrollbarBase';

// import { ModalExportSuppliesRef } from '../utils/modal-export-supplies';

// interface ModalExportHistoryProps {}

// const ModalExportHistory = forwardRef<ModalExportSuppliesRef, ModalExportHistoryProps>(({}, ref) => {
//    const [open, setOpen] = useState<boolean>(false);
//    const [data, setData] = useState<DeliveryNoteDataDetail | null>(null);

//    useImperativeHandle(ref, () => ({
//       setOpen: setOpen,
//       setData: setData,
//    }));
//    return (
//       <Modal open={open}>
//          <Box sx={style} component="form">
//             <Box mb={1.5} display="flex" alignItems="center" justifyContent="space-between">
//                <Typography id="modal-modal-title" variant="h6" component="h2">
//                   Lịch sử yêu cầu.
//                </Typography>
//                <ButtonBase onClick={() => setOpen(false)}>
//                   <CloseIcon />
//                </ButtonBase>
//             </Box>
//             <Box sx={{ borderBottom: '1px solid #DADADA' }}></Box>
//             <Box my={1}>
//                <ScrollbarBase sx={{ height: 400 }}>
//                   {data?.history?.map((item, index) => {
//                      return (
//                         <React.Fragment key={index}>
//                            <Box
//                               sx={() => ({
//                                  py: 0.5,
//                                  px: 1,
//                                  mb: 1,
//                                  borderRadius: '6px',
//                                  display: 'flex',
//                                  justifyContent: 'space-between',
//                                  bgcolor: item.type === STATUS_DELIVERY.export.key ? '' : '#DADADA',
//                               })}
//                            >
//                               <Typography sx={{ display: 'flex', alignItems: 'center', gap: 3, width: '250px' }}>
//                                  {item.type === (STATUS_DELIVERY.export.key as string)
//                                     ? 'Yêu cầu xuất vật tư'
//                                     : 'Yêu cầu trả vật tư'}
//                               </Typography>

//                               <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
//                                  <Typography>Số lượng:</Typography>
//                                  <Chip
//                                     label={
//                                        item.type === STATUS_DELIVERY.export.key ? item.quantity : `- ${item.quantity}`
//                                     }
//                                     color="primary"
//                                  />
//                               </Box>

//                               <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
//                                  {/* {item.isSuccess ? <></> : <Button>Xác nhận</Button>} */}
//                               </Box>
//                            </Box>
//                         </React.Fragment>
//                      );
//                   })}
//                </ScrollbarBase>
//             </Box>
//          </Box>
//       </Modal>
//    );
// });

// const style = {
//    position: 'absolute',
//    top: '50%',
//    left: '50%',
//    transform: 'translate(-50%, -50%)',
//    width: 650,
//    bgcolor: 'background.paper',
//    boxShadow: 24,
//    p: '12px',
//    borderRadius: '6px',
// };

// export default ModalExportHistory;
