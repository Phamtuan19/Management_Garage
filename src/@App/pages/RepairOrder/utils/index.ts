import { STATUS_REPAIR_DETAIL } from '@App/configs/status-config';

export const arrowRightOption = [
   {
      title: 'Tạo phiếu',
      name: 'create',
   },
   {
      title: 'Kiểm tra xe',
      name: 'check',
   },
   {
      title: 'Lấy vật tư',
      name: 'shipped',
   },
   {
      title: 'Sửa chữa',
      name: 'repair',
   },
   {
      title: 'Thanh toán',
      name: 'pay',
   },
   {
      title: 'Hoàn thành',
      name: 'complete',
   },
   {
      title: 'Hủy',
      name: 'close',
   },
];

export const dataStatus = [STATUS_REPAIR_DETAIL.complete, STATUS_REPAIR_DETAIL.empty, STATUS_REPAIR_DETAIL.repair];
