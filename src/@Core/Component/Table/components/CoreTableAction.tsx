import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import { useConfirm } from '@Core/Component/Comfirm/CoreComfirm';

export const CoreTableActionDelete = ({
   callback = () => {},
   content = 'Bạn có chắc chắn muốn xóa bản ghi này?',
}: {
   callback?: () => void;
   content?: string;
}) => {
   const coreConfirm = useConfirm();

   const handleDelete = () => {
      coreConfirm({
         content: content,
         isIcon: true,
         color: 'error',
         callback,
      });
   };

   return (
      <Tooltip title="Xoá">
         <IconButton color="error" onClick={handleDelete}>
            <DeleteIcon />
         </IconButton>
      </Tooltip>
   );
};

export const CoreTableActionEdit = ({ callback = () => {} }) => {
   return (
      <Tooltip title="Sửa">
         <IconButton color="success" onClick={callback}>
            <RateReviewRoundedIcon />
         </IconButton>
      </Tooltip>
   );
};
