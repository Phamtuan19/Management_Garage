import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import { useConfirm } from '@Core/Component/Comfirm/CoreComfirm';
import PreviewIcon from '@mui/icons-material/Preview';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenSharpIcon from '@mui/icons-material/LockOpenSharp';
import HistoryIcon from '@mui/icons-material/History';

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
         callbackOK: callback,
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

export const CoreTableActionViewDetail = ({
   title,
   callback = () => {},
}: {
   title?: string;
   callback?: () => void;
}) => {
   return (
      <Tooltip title={title ?? 'Chi tiết'}>
         <IconButton color="success" onClick={callback}>
            <PreviewIcon />
         </IconButton>
      </Tooltip>
   );
};

export const CoreTableActionHistory = ({ title, callback = () => {} }: { title?: string; callback?: () => void }) => {
   return (
      <Tooltip title={title ?? 'Lịch sử'}>
         <IconButton color="success" onClick={callback}>
            <HistoryIcon />
         </IconButton>
      </Tooltip>
   );
};

export const CoreTableActionLock = ({ callback = () => {} }) => {
   return (
      <Tooltip title="Khóa">
         <IconButton color="warning" onClick={callback}>
            <LockIcon />
         </IconButton>
      </Tooltip>
   );
};
export const CoreTableActionLockOpen = ({ callback = () => {} }) => {
   return (
      <Tooltip title="Khóa">
         <IconButton color="success" onClick={callback}>
            <LockOpenSharpIcon />
         </IconButton>
      </Tooltip>
   );
};
