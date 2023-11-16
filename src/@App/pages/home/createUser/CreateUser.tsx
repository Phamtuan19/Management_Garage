import { yupResolver } from "@hookform/resolvers/yup";
import { ValidationFormCreate } from "./utils/yup.validate";
import { useForm } from 'react-hook-form';
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack } from "@mui/material";
import ControlLabel from "@Core/Component/Input/ControlLabel";
import ControlTextField from "@Core/Component/Input/ControlTextField";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import ControlSelect from "@Core/Component/Input/ControlSelect";

function CreateUser() {

    // select radio gender
    const [selectGender, setSelectGender] = useState('nam');
    const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectGender((event.target as HTMLInputElement).value);
    };


    // select radio status
    const [selectStatus, setSelectStatus] = useState('present');
    const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectStatus((event.target as HTMLInputElement).value);
    };

    const { handleSubmit, control } = useForm<ValidationFormCreate>({
        resolver: yupResolver(ValidationFormCreate),
        defaultValues: {
            name: '',
            email: '',
            address: '',
            sdt: '',
            cmnd: '',
            role: '',
        },
    });
    const onSubmitForm = () => {

    };
    return (
        <Box width={'75%'} marginLeft={20} >
            <ControlLabel title="Thêm Mới Nhân Viên" sx={{ fontSize: '40px' }} />
            <form onSubmit={handleSubmit(onSubmitForm)} >
                <Box mb={1} >
                    <ControlLabel title="Tên" sx={{ width: '500px' }} />
                    <ControlTextField name="name" control={control} />
                </Box>
                <Box mb={1} >
                    <ControlLabel title="Email" />
                    <ControlTextField name="email" control={control} />
                </Box>
                <Box mb={1}>
                    <ControlLabel title="Địa chỉ" />
                    <ControlTextField name="address" control={control} />
                </Box>
                <Box mb={1}>
                    <ControlLabel title="SĐT" />
                    <ControlTextField name="sdt" control={control} />
                </Box>
                <Box mb={1}>
                    <ControlLabel title="CMND" />
                    <ControlTextField name="cmnd" control={control} />
                </Box>
                <Box mb={3}>
                    <ControlLabel title="Bộ phận" />
                    <ControlSelect
                        options={[
                            { id: 1, lable: 'Bộ phận sửa chữa' },
                            { id: 2, lable: 'Bộ phận Kho' },
                            { id: 3, lable: 'Bộ phận Bảo dưỡng' },
                            { id: 4, lable: 'Bộ phận chăm sóc khách hàng' },
                            { id: 5, lable: 'Bộ phận QC' }
                        ]}
                        _id="id"
                        _value="lable"
                        defaultValue=''
                        name="role"
                        control={control}
                    />
                </Box>
                <Box>
                    <Stack direction="row" alignItems="center" spacing={10}>
                        <Box mb={1} >
                            <FormControl>
                                <FormLabel id="demo-controlled-radio-buttons-group">Giới tính</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group gender"
                                    value={selectGender}
                                    onChange={handleChangeGender}
                                >
                                    <FormControlLabel value="nam" control={<Radio />} label="Nam" />
                                    <FormControlLabel value="nu" control={<Radio />} label="Nữ" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Box mb={1} >
                            <FormControl>
                                <FormLabel id="demo-controlled-radio-buttons-group">Trạng thái</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group status"
                                    value={selectStatus}
                                    onChange={handleChangeStatus}
                                >
                                    <FormControlLabel value="present" control={<Radio />} label="Có mặt" />
                                    <FormControlLabel value="absent" control={<Radio />} label="Vắng mặt" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </Stack>
                </Box>
                <LoadingButton sx={{ marginTop: '20px' }} size="large" variant="contained" type="submit" >
                    Thêm
                </LoadingButton>
            </form>
        </Box>
    );
}

export default CreateUser;