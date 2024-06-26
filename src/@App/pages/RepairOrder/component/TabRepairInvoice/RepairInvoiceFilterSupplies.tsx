// /* eslint-disable @typescript-eslint/no-unsafe-return */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /* eslint-disable @typescript-eslint/no-unsafe-argument */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// /* eslint-disable @typescript-eslint/naming-convention */
// import {
//    Box,
//    Button,
//    ButtonBase,
//    Checkbox,
//    Chip,
//    Grid,
//    InputBase,
//    MenuItem,
//    Select,
//    Stack,
//    Typography,
//    styled,
// } from '@mui/material';
// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import { useRef, useState } from 'react';
// import ScrollbarBase from '@App/component/customs/ScrollbarBase';
// import { useQuery } from '@tanstack/react-query';
// import suppliesService, { SuppliesItem } from '@App/services/supplies.service';
// import useDebounce from '@App/hooks/useDebounce';
// import { useOnClickOutside } from '@App/hooks/useOnClickOutside';
// import LazyLoadingImage from '@App/component/customs/LazyLoadingImage';
// import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';
// import { errorMessage } from '@Core/Helper/message';
// import { STATUS_REPAIR_DETAIL } from '@App/configs/status-config';
// import ControllerLabel from '@Core/Component/Input/ControllerLabel';
// import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

// import { RepairInvoiceSchema } from '../../utils/repair-invoice';

// const columnVisibilityData: Record<string, string> = {
//    stt: 'Số thứ tự',
//    supplies_detail_code: 'Mã vật tư',
//    supplies_detail_name: 'Tên vật tư',
//    distributor_name: 'Nhà phân phối',
//    supplies_invoices_code: 'Mã lô',
//    inventory: 'tồn kho',
//    selling_price: 'Giá bán',
//    quantity: 'Số lượng',
//    total_price: 'Tổng giá',
//    action: 'thao tác',
//    personnel_sc: 'Nhân viên sửa chữa',
//    status_supplies_invoice: 'Trạng thái sửa chữa',
// } as const;

// const RepairInvoiceFilterSupplies = ({
//    fieldArray,
//    form,
//    columnVisibility,
//    setColumnVisibility,
// }: {
//    fieldArray: UseFieldArrayReturn<RepairInvoiceSchema>;
//    form: UseFormReturn<RepairInvoiceSchema>;
//    columnVisibility: any;
//    setColumnVisibility: React.Dispatch<any>;
// }) => {
//    const { append, fields } = fieldArray;

//    const carName = form.watch('car.car_name');

//    const [open, setOpen] = useState<boolean>(false);
//    const [openVisibility, setOpenVisibility] = useState<boolean>(false);
//    const [field, setField] = useState<string>('name_detail');
//    const [valueSearch, setValueSearch] = useState<string>('');
//    const ref = useRef<HTMLElement>(null);
//    const refVisibility = useRef<HTMLElement>(null);

//    useOnClickOutside(ref, () => setOpen(false));
//    useOnClickOutside(refVisibility, () => setOpenVisibility(false));

//    const valueDebounce = useDebounce(valueSearch, 500);

//    const { data: suppliesDetail } = useQuery(['getSupplies', valueDebounce, field, carName], async () => {
//       const res = await suppliesService.getSupplies({
//          q: valueDebounce ?? '',
//          field: field,
//          car_name: carName,
//       });
//       return res.data;
//    });

//    const handleClickSuppliesItem = (suppliesItem: SuppliesItem) => {
//       if (suppliesItem.isInStock) {
//          const isSuppliesInvoiceCode: boolean = fields.some(
//             (item: any) => item.supplies_invoices_code === suppliesItem.supplies_invoices_code,
//          );

//          append({
//             _id: '',
//             supplies_detail_code: suppliesItem.code,
//             distributor_name: suppliesItem.distributor.name,
//             inventory: suppliesItem.supplies_invoices_quantity_received ?? 0,
//             quantity: suppliesItem.supplies_invoices_quantity_received > 0 ? 1 : 0,
//             selling_price: suppliesItem.supplies_invoices_selling_price ?? 0,
//             supplies_detail_id: suppliesItem._id,
//             supplies_detail_name: suppliesItem.name_detail,
//             supplies_invoices_code: isSuppliesInvoiceCode ? '' : suppliesItem.supplies_invoices_code,
//             supplies_invoices_id: isSuppliesInvoiceCode ? '' : suppliesItem.supplies_invoices_id,
//             supplies_id: suppliesItem.supplies_id,
//             describe: '',
//             discount: 0,
//             details: {
//                name: '',
//                describe: '',
//                status: STATUS_REPAIR_DETAIL.empty.key,
//                personnel_id: '',
//                note: '',
//             },
//          });

//          return setOpen(false);
//       }

//       return errorMessage('Vật tư không còn hàng tồn.');
//    };

//    return (
//       <Grid container spacing={2}>
//          <Grid item xs={8.3}>
//             <Box
//                sx={{
//                   position: 'relative',
//                   border: '1px solid #90909080',
//                   borderRadius: '6px',
//                   display: 'flex',
//                   alignItems: 'center',
//                   px: '12px',
//                   width: '100%',
//                }}
//                ref={ref}
//             >
//                <SearchOutlinedIcon sx={{ fontSize: '22px' }} />
//                <InputBase
//                   fullWidth
//                   value={valueSearch}
//                   onChange={(e) => {
//                      setValueSearch(e.target.value);
//                   }}
//                   onClick={() => {
//                      return setOpen(true);
//                   }}
//                   size="small"
//                   sx={{ p: '6px 12px', '.css-7dqvty-MuiInputBase-input': { p: 0 } }}
//                   placeholder="Tìm kiếm vật tư"
//                />

//                {/* List Supplies */}
//                {open && (
//                   <Box
//                      sx={({ base }) => ({
//                         position: 'absolute',
//                         left: 0,
//                         top: '105%',
//                         width: '100%',
//                         maxHeight: '500px',
//                         zIndex: 2,
//                         backgroundColor: base.color.contrastText as string,
//                         border: '1px solid #c7d0dd80',
//                         boxShadow: 'rgba(11, 13, 14, 0.2) 0px 4px 16px',
//                         borderRadius: '3px',
//                      })}
//                      ref={ref}
//                   >
//                      {suppliesDetail && suppliesDetail.length > 0 ? (
//                         <ScrollbarBase
//                            sx={{
//                               'body::-webkit-scrollbar-track': {
//                                  webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
//                                  borderRadius: 10,
//                                  backgroundColor: '#F5F5F5',
//                               },
//                               width: '100%',
//                               flex: 1,
//                               maxHeight: '285px',
//                            }}
//                         >
//                            <Stack sx={{ gap: '6px' }}>
//                               {suppliesDetail.map((item) => {
//                                  return (
//                                     <SearchSuppliesItem
//                                        key={item._id}
//                                        supplie={item}
//                                        handleClickSupplieItem={() => {
//                                           handleClickSuppliesItem(item);
//                                        }}
//                                     />
//                                  );
//                               })}
//                            </Stack>
//                         </ScrollbarBase>
//                      ) : (
//                         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: '12px' }}>
//                            <Typography sx={{ fontSize: '14px' }}>Không tìm thấy vật tư phù hợp</Typography>
//                         </Box>
//                      )}
//                   </Box>
//                )}
//             </Box>
//          </Grid>
//          <Grid item xs={3}>
//             <Select fullWidth onChange={(e) => setField(e.target.value)} value={field}>
//                <MenuItem value="name_detail">Vật tư chi tiết</MenuItem>
//                <MenuItem value="supplies.name">Tên nhóm</MenuItem>
//                <MenuItem value="distributors.name">Nhà phân phối</MenuItem>
//             </Select>
//          </Grid>
//          <Grid item xs={0.7} display="flex" justifyContent="flex-end">
//             <Box position="relative" ref={refVisibility}>
//                <Button
//                   variant="outlined"
//                   color="inherit"
//                   sx={{
//                      bgcolor: 'transparent',
//                      minWidth: 'auto !important',
//                      px: '8px !important',
//                      borderColor: '#ccc !important',
//                      ':hover': { bgcolor: 'transparent' },
//                   }}
//                   onClick={() => setOpenVisibility(!openVisibility)}
//                >
//                   <FilterAltOutlinedIcon sx={{ width: '24px', height: '24px' }} />
//                </Button>
//                {openVisibility && (
//                   <Box
//                      sx={{
//                         position: 'absolute',
//                         top: '110%',
//                         right: 0,
//                         zIndex: 10,
//                         width: 'max-content',
//                         bgcolor: '#FFF',
//                         border: '1px solid #DADADA',
//                         borderRadius: '6px',
//                         boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
//                         py: 1,
//                      }}
//                   >
//                      <ScrollbarBase sx={{ height: '300px', width: 'max-content', minWidth: '230px' }}>
//                         {Object.keys(columnVisibility).map((item) => {
//                            const title = columnVisibilityData[item];
//                            if (!title) {
//                               return;
//                            }

//                            return (
//                               <Box px={1} display="flex" justifyContent="flex-start" alignItems="center" key={item}>
//                                  <Checkbox
//                                     checked={columnVisibility[item]}
//                                     onChange={(e) => {
//                                        setColumnVisibility((prev: any) => ({ ...prev, [item]: e.target.checked }));
//                                     }}
//                                     size="small"
//                                  />
//                                  <ControllerLabel title={title} />
//                               </Box>
//                            );
//                         })}
//                      </ScrollbarBase>
//                   </Box>
//                )}
//             </Box>
//          </Grid>
//       </Grid>
//    );
// };

// interface SearchSuppliesItemSupplie {
//    _id: string;
//    code: string;
//    name_detail: string;
//    isInStock: string;
//    supplies_id: string;
//    unit: string;
//    distributor: {
//       _id: string;
//       name: string;
//    };
// }

// interface SearchSuppliesItemPropsType {
//    supplie: SearchSuppliesItemSupplie;
//    handleClickSupplieItem: (supplie: SearchSuppliesItemSupplie) => void;
// }

// const SearchSuppliesItem = ({ supplie, handleClickSupplieItem }: SearchSuppliesItemPropsType) => {
//    return (
//       <ButtonBase
//          sx={({ base }) => ({
//             width: '100%',
//             display: 'flex',
//             gap: '12px',
//             py: '6px',
//             px: '12px',
//             fontSize: '14px',
//             '&:hover': {
//                backgroundColor: base.text.primary,
//                color: base.color.contrastText as string,
//             },
//          })}
//          onClick={() => handleClickSupplieItem(supplie)}
//       >
//          <LazyLoadingImage src="" w="36" h="36" />
//          <Flex sx={{ flexDirection: 'column', flex: 1, gap: '6px' }}>
//             <Box sx={{ width: '100%', textAlign: 'left' }}>{supplie.name_detail}</Box>
//             <Flex sx={{ width: '100%', gap: '12px' }}>
//                <Box>
//                   <span>#{supplie.code}</span>
//                </Box>
//                <Flex sx={{ flex: 2, gap: '3px' }}>{supplie.distributor.name}</Flex>
//                <Flex sx={{ flex: 1, gap: '6px' }}>
//                   <Chip
//                      label={supplie.isInStock ? 'còn hàng' : 'hết hàng'}
//                      variant="outlined"
//                      color={supplie.isInStock ? 'success' : 'error'}
//                   />
//                </Flex>
//             </Flex>
//          </Flex>
//       </ButtonBase>
//    );
// };

// const Flex = styled('div')({
//    width: '100%',
//    display: 'flex',
//    alignItems: 'center',
//    justifyContent: 'flex-start',
// });

// export default RepairInvoiceFilterSupplies;
