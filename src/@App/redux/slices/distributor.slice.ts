import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { PageActionPropsType } from "@App/configs/page-action";
import distributorsService from "@App/services/distributor.service";

const initialState = {
    distributor: [],
    userPermission: null,
    loading: false,
    error: ""
} as {
    distributor: any[],
    userPermission: UserPermission | null;
    loading: boolean,
    error: string
}
export const getDistributors = createAsyncThunk(
    'distributor/getDistributor',
    async () => {
        try {
            const data = await distributorsService.get()
            return data.data
        } catch (error: any) {
            throw new Error(error);
        }
    }
)

type UserPermission = {
    [key: string]: PageActionPropsType[];
};

const distributorSlice = createSlice({
    name: "distributor",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getDistributors.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getDistributors.fulfilled, (state, action) => {
            const { distributor, access: permissionAccess } = action.payload;
            state.loading = false;
            state.distributor = distributor;
            state.userPermission = {
                permissions: ['view', 'create', 'update', 'delete', 'show'],
                distributors: ['view', 'create', 'update', 'delete', 'show'],
                ...JSON.parse(permissionAccess),
            };
        })
        builder.addCase(getDistributors.rejected, (state, action) => {
            state.loading = false;
        })
    }
})


export const distributorReducer = distributorSlice.reducer