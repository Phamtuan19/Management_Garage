import { DeliveryNoteDataDetail } from '@App/types/delivery';

interface ModalExportSuppliesRef {
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   setData: React.Dispatch<React.SetStateAction<null | DeliveryNoteDataDetail>>;
}
