
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';


export default function TableUsers() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Tên</TableCell>
                        <TableCell >Email</TableCell>
                        <TableCell >Địa chỉ</TableCell>
                        <TableCell >Giới tính</TableCell>
                        <TableCell >SĐT</TableCell>
                        <TableCell >CMND</TableCell>
                        <TableCell >Trạng thái</TableCell>
                        <TableCell >Bộ phận</TableCell>
                        <TableCell >Chức năng</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Thiên</TableCell>
                        <TableCell>thien@gmail.com</TableCell>
                        <TableCell>Nam Định</TableCell>
                        <TableCell>Nam</TableCell>
                        <TableCell>9999999999</TableCell>
                        <TableCell>9999999999</TableCell>
                        <TableCell>Có mặt</TableCell>
                        <TableCell>Bộ phận QC</TableCell>
                        <TableCell>
                            <Button variant='contained' color='warning' sx={{ marginRight: '10px' }}>Sửa</Button>
                            <Button variant='contained' color='error'>Xóa</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
