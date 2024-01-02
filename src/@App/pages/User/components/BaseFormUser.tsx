import ControllerLabel from "@Core/Component/Input/ControllerLabel";
import { Grid, FormControl } from "@mui/material";
import ControllerTextField from "@Core/Component/Input/ControllerTextField";
import { LoadingButton } from "@mui/lab";
import ControllerRadioGroup from "@Core/Component/Input/ControllerRadioGroup";

const BaseFormUser = () => {
    return (
         <form>
         <Grid container spacing={2}>
            <Grid item md={3}>
               <ControllerLabel title="Tên" required />
               <ControllerTextField name="name" control={control}/>
            </Grid>
            <Grid item md={3}>
               <ControllerLabel title="Email" />
               <ControllerTextField name="email"control={control}/>
            </Grid>
              <Grid item md={3}>
               <ControllerLabel title="Địa chỉ" />
               <ControllerTextField name="address"control={control} />
            </Grid>
            <Grid item md={3}>
               <ControllerLabel title="SĐT" />
               <ControllerTextField name="phone"control={control} />
            </Grid>
             <Grid item md={3}>
               <ControllerLabel title="CMND" />
               <ControllerTextField name="cmnd"control={control} />
            </Grid>
               <Grid item md={3}>
               <ControllerLabel title="Birthday" />
               <ControllerTextField name="birthday"control={control} />
            </Grid>
             <Grid item md={3}>
               <FormControl>
                  <ControllerLabel title="Giới tính" />
                  <ControllerRadioGroup
                     sx={{ display: 'flex', alignItems: 'center' }}
                     name="gender"
                     options={[
                        { id: 'nam', title: 'nam' },
                        { id: 'nu', title: 'nữ' },
                     ]}
                     valuePath="id"
                     titlePath="title"
                     control={control}
                  />
               </FormControl>
            </Grid>

             <Grid item xs={12}>
               <LoadingButton type="submit" variant="contained">
                  Thêm
               </LoadingButton>
            </Grid>
         </Grid>
      </form>
    )
}

export default BaseFormUser;