import { yupResolver } from "@hookform/resolvers/yup";
import { ValidationFormCreate } from "./utils/yup.validate";
import { useForm } from 'react-hook-form';
import { Box, Button } from "@mui/material";
import ControlLabel from "@Core/Component/Input/ControlLabel";
import ControlTextField from "@Core/Component/Input/ControlTextField";
import { LoadingButton } from "@mui/lab";
import ControlSelect from "@Core/Component/Input/ControlSelect";
function CreateUser() {

    const { handleSubmit, control } = useForm<ValidationFormCreate>({
        resolver: yupResolver(ValidationFormCreate),
        defaultValues: {
            name: '',
            email: '',
            address: '',
            gender: '',
            sdt: '',
            cmnd: '',
            status: '',
            role: '',
        },
    });
    const onSubmitForm = () => {

    };
    return (
        <Box>
            <ControlLabel title="Thêm Mới Nhân Viên" sx={{ fontSize: '40px' }} />
            <form onSubmit={handleSubmit(onSubmitForm)} >
                <Box mb={1} width={'60%'}>
                    <ControlLabel title="Tên" />
                    <ControlTextField name="name" control={control} />
                </Box>
                <Box mb={1} width={'60%'} >
                    <ControlLabel title="Email" />
                    <ControlTextField name="email" control={control} />
                </Box>
                <Box mb={1} width={'60%'}>
                    <ControlLabel title="Địa chỉ" />
                    <ControlTextField name="address" control={control} />
                </Box>

                <Box mb={1} width={'60%'}>
                    <ControlLabel title="Giới tính" />
                    <ControlSelect
                        options={[
                            { id: 1, label: 'Nam' },
                            { id: 2, label: 'Nữ' },
                        ]}
                        _id="id"
                        _value="label"
                        defaultValue=""
                        name="gender"
                        control={control}
                    />
                </Box>
                <Box mb={1} width={'60%'}>
                    <ControlLabel title="SĐT" />
                    <ControlTextField name="sdt" control={control} />
                </Box>
                <Box mb={1} width={'60%'}>
                    <ControlLabel title="CMND" />
                    <ControlTextField name="cmnd" control={control} />
                </Box>
                <Box mb={1} width={'60%'}>
                    <ControlLabel title="Trạng Thái" />
                    <ControlSelect
                        options={[
                            { id: 1, label: 'Có mặt' },
                            { id: 2, label: 'Vắng Mặt' },
                        ]}
                        _id="id"
                        _value="label"
                        defaultValue=""
                        name="status"
                        control={control} />
                </Box>
                <Box mb={3} width={'60%'}>
                    <ControlLabel title="Chức vụ" />
                    <ControlTextField name="role" control={control} />
                </Box>
                <LoadingButton sx={{ textAlign: 'right' }} size="large" variant="contained" type="submit" >
                    Thêm
                </LoadingButton>
            </form>
        </Box>


    );
}

export default CreateUser;