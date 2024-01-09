/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
import { createContext, useState, useContext, useCallback, ReactNode } from 'react';
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
   callback: () => Promise<void> | void;
   confirmOk?: string | null;
   icon?: ReactNode;
}

const ConfirmContext = createContext<((props: ConfigType) => void) | null>(null);

export const useConfirm = (): ((props: ConfigType) => void) => {
   const confirm = useContext(ConfirmContext);
   if (!confirm) {
      throw new Error('useConfirm must be used within a ConfirmProvider');
   }

   return confirm;
};

function ConfirmProvider(props: { children: ReactNode }) {
   const [config, setConfig] = useState<ConfigType>({
      title: null,
      content: null,
      color: null,
      confirmOk: null,
      callback: () => {},
   });
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const confirm = useCallback((config: ConfigType) => {
      setConfig(config);
      setIsOpen(true);
   }, []);

   const handleClose = () => {
      setIsOpen(false);
   };

   const handleConfirm = async () => {
      if (config?.callback) {
         setIsLoading(true);
         try {
            await config.callback();
         } catch (error) {
            console.error('Error during callback:', error);
         }
         setIsLoading(false);
         handleClose();
      }
   };

   return (
      <ConfirmContext.Provider value={confirm}>
         {props.children}
         <Dialog
            open={isOpen}
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
                  loading={isLoading}
                  className="text-white"
                  color={(config.color as never) ? (config.color as never) : 'primary'}
                  onClick={() => {
                     void handleConfirm();
                  }}
                  size="medium"
               >
                  {config?.confirmOk ?? 'Xác nhận'}
               </LoadingButton>
            </DialogActions>
         </Dialog>
      </ConfirmContext.Provider>
   );
}

const StyledPaper = styled(Paper)({
   padding: '10px',
   minWidth: '25rem',
   maxWidth: '100%',
   zIndex: 9999,
});

export default ConfirmProvider;
