import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface ButtonEditProps {
   to: string;
}

const ButtonEdit = ({ to }: ButtonEditProps) => {
   return (
      <Button startIcon={<BorderColorIcon />} component={Link} to={to} color="inherit">
         Chỉnh sửa
      </Button>
   );
};

export default ButtonEdit;
