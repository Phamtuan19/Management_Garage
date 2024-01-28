/**
 *
 * Trạng thái sửa chữa
 *
 * @CHECK - Tiến hành kiếm tra
 * @ORDER_SPARE_PARTS - Đặt phụ tùng (nếu cần)
 * @REPAIR - Tiến hành sửa chữa
 * @COMPLETE - Hoàn thành sửa chữa
 * @CAR_DELIVERY - Giao trả xe cho khách hàng
 * @WAIT_FOR_PAYMENT - Trờ thanh toán
 * @EMPTY - trống
 *
 */

export const CAR_STATUS = {
   CHECK: {
      id: 'CHECK',
      title: 'Kiểm tra',
      color: 'default',
   },
   ORDER_SPARE_PARTS: {
      id: 'ORDER_SPARE_PARTS',
      title: 'Đặt phụ tùng',
      color: 'error',
   },
   REPAIR: {
      id: 'REPAIR',
      title: 'Sửa chữa',
      color: 'secondary',
   },
   COMPLETE: {
      id: 'COMPLETE',
      title: 'Hoàn thành',
      color: 'success',
   },
   CAR_DELIVERY: {
      id: 'CAR_DELIVERY',
      title: 'Bàn giao xe',
      color: 'warning',
   },
   WAIT_FOR_PAYMENT: {
      id: 'WAIT_FOR_PAYMENT',
      title: 'Trờ thanh toán',
      color: 'info',
   },
   EMPTY: {
      id: 'EMPTY',
      title: 'Trống',
      color: 'default',
   },
} as const;

export type CarStatusKeys = keyof typeof CAR_STATUS;
