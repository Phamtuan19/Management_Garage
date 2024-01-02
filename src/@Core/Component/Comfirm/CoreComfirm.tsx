/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Context, createContext, useState, useContext, useCallback } from 'react';
import {
   Box,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Divider,
   Paper,
   Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import styled from 'styled-components';
import LazyLoadingImage from '@App/component/customs/LazyLoadingImage';
import svg from '@App/assets/svg';

interface ConfigType {
   title?: string | null;
   content?: string | null;
   isIcon?: boolean;
   color?: string | null;
   callback: () => Promise<void> | void; // Định kiểu cho callback là một hàm không có tham số và trả về một Promise không có giá trị trả về.
   confirmOk?: string | null;
   icon?: React.ReactNode;
}

const ComfirmContext: Context<any> = createContext(null);

export const useConfirm = () => {
   const confirm = useContext(ComfirmContext);
   if (!confirm) {
      throw new Error('useConfirm must be used within a ComfirmProvider');
   }

   const coreConfirm = (props: ConfigType) => {
      return confirm(props);
   };

   return coreConfirm;
};

function CoreComfirmProvider(props: { children: React.ReactNode }) {
   const [config, setConfig] = useState<ConfigType>({
      title: null,
      content: null,
      color: null,
      confirmOk: null,
      callback: () => {},
   });
   const [open, setOpen] = useState<boolean>(false);
   const [loading, setLoading] = useState<boolean>(false);

   const confirm = useCallback((config: ConfigType) => {
      setConfig(config);
      setOpen(true);
   }, []);

   const handleClose = () => {
      setOpen(false);
   };

   const handleConfirm = async () => {
      if (config?.callback) {
         setLoading(true);
         try {
            await config?.callback();
         } catch (error) {}
         setLoading(false);
         handleClose();
      }
   };

   return (
      <ComfirmContext.Provider value={confirm}>
         {props.children}
         <Dialog
            open={open}
            PaperComponent={StyledPaper}
            keepMounted
            onClose={handleClose}
            maxWidth="sm"
            sx={{
               zIndex: 9999,
            }}
         >
            {config?.title && (
               <DialogTitle
                  className="text-center"
                  variant="h4"
                  sx={{ '& .MuiTypography-root ': { fontSize: '18px', fontWeight: '600' } }}
               >
                  {config?.title}
               </DialogTitle>
            )}
            {config?.content && (
               <DialogContent
                  sx={{ fontSize: '18px', display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 2 }}
               >
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                     {config?.isIcon && (config?.icon ?? <Box component={LazyLoadingImage} src={svg.confirmDelete} />)}
                  </Box>
                  <Typography component="h6" sx={{ display: 'block', fontSize: '16px', fontWeight: 600 }}>
                     {config?.content}
                  </Typography>
               </DialogContent>
            )}
            <Divider sx={{ margin: '10px' }} />
            <DialogActions>
               <Button size="medium" variant="outlined" color="primary" className="text-gray-400" onClick={handleClose}>
                  Hủy bỏ
               </Button>
               <LoadingButton
                  variant="contained"
                  loading={loading}
                  className="text-white"
                  // color={config.color ? config.color : 'primary'}
                  onClick={handleConfirm}
                  size="medium"
               >
                  {config?.confirmOk ?? 'Xác nhận'}
               </LoadingButton>
            </DialogActions>
         </Dialog>
      </ComfirmContext.Provider>
   );
}

const StyledPaper = styled(Paper)({
   padding: '10px',
   minWidth: '25rem',
   maxWidth: '100%',
   zIndex: 9999,
});

export default CoreComfirmProvider;
