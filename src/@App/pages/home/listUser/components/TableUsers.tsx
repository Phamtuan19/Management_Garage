
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
                        <TableCell >Chức Vụ</TableCell>
                        <TableCell >Chức năng</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                </TableBody>
            </Table>
        </TableContainer>
    );
}
