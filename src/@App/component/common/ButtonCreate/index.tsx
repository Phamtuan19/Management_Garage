import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface ButtonCreateProps {
   to: string;
}

const ButtonCreate = ({ to }: ButtonCreateProps) => {
   return (
      <Button startIcon={<AddOutlinedIcon />} component={Link} to={to}>
         Thêm mới
      </Button>
   );
};

export default ButtonCreate;
