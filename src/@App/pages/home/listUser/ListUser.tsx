
import TableUsers from "./components/TableUsers";
import { Grid, TextField } from '@mui/material';


function ListUser() {
    return (

        <>
            <Grid direction="column" columnSpacing={4}>
                <TextField placeholder="Search" name="search" size="small" sx={{ marginBottom: '20px' }} />
                <TableUsers />
            </Grid >

        </>
    );
}

export default ListUser;