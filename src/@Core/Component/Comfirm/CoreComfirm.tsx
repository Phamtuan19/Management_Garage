import React, { Context, createContext, useState, useContext, useCallback } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Paper, Typography } from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { LoadingButton } from '@mui/lab';
import styled from 'styled-components';

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
         <Dialog open={open} PaperComponent={StyledPaper} keepMounted onClose={handleClose} maxWidth="sm">
            {config?.title && (
               <DialogTitle
                  className="text-center"
                  variant="h4"
                  sx={{ '& .MuiTypography-root ': { fontSize: '19px', fontWeight: '600' } }}
               >
                  {config?.title}
               </DialogTitle>
            )}
            {config?.content && (
               <DialogContent sx={{ fontSize: '18px', display: 'flex', alignItems: 'center' }}>
                  {config?.isIcon && (config?.icon ?? <DeleteForeverRoundedIcon fontSize="large" color="error" />)}
                  <Typography>{config?.content}</Typography>
               </DialogContent>
            )}
            <Divider sx={{ margin: '10px' }} />
            <DialogActions>
               <Button size="small" variant="outlined" color="primary" className="text-gray-400" onClick={handleClose}>
                  Đóng
               </Button>
               <LoadingButton
                  variant="contained"
                  loading={loading}
                  className="text-white"
                  // color={config.color ? config.color : 'primary'}
                  onClick={handleConfirm}
                  size="small"
               >
                  {config?.confirmOk ?? 'Xoá'}
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
});

export default CoreComfirmProvider;
