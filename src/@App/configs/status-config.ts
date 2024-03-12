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
   REPAIR: {
      id: 'REPAIR',
      title: 'Sửa chữa',
      color: 'secondary',
   },
   EMPTY: {
      id: 'EMPTY',
      title: 'Trống',
      color: 'default',
   },
} as const;

export type CarStatusKeys = keyof typeof CAR_STATUS;

/**
 *
 * Loại hình thanh toán
 *
 * @TRANSFER - Chuyển khoản
 * @CASH - Tiền mặt
 * @TRANSFER_CASH - chuyển khoản và tiền mặt
 * @EMPTY - trống
 *
 */
export const PAYMENT_TYPE = {
   TRANSFER: 'TRANSFER',
   CASH: 'CASH',
   TRANSFER_CASH: 'TRANSFER_CASH',
   EMPTY: 'EMPTY',
} as const;

export type PaymentType = keyof typeof PAYMENT_TYPE;

/**
 *
 * Trạng thái thanh toán
 * @PAID - Đã thanh toán
 * @UNPAID - Chưa thanh toán
 * @DEBT - Công nợ
 *
 */
export const STATUS_PAYMENT = {
   PAID: {
      key: 'PAID',
      title: 'Đã thanh toán',
      color: 'success',
   },
   UNPAID: {
      key: 'UNPAID',
      title: 'Chưa thanh toán',
      color: 'error',
   },
   DEBT: {
      key: 'DEBT',
      title: 'Công nợ',
      color: 'warning',
   },
} as const;

export type StatusPayment = keyof typeof STATUS_PAYMENT;

/**
 *
 * Trạng thái sửa chữa
 * @DRAFT - Xóa
 * @CHECK - Kiểm tra
 * @REPAIR - Sửa chữa
 * @COMPLETE - Hoàn thành
 *
 */

export const STATUS_REPAIR = {
   create: {
      title: 'Tạo phiếu',
      color: 'error',
      key: 'create',
   },
   check: {
      title: 'Kiểm tra',
      color: 'default',
      key: 'check',
   },
   repair: {
      title: 'Sửa chữa',
      color: 'secondary',
      key: 'repair',
   },
   pay: {
      title: 'Thanh toán',
      color: 'warning',
      key: 'pay',
   },
   complete: {
      title: 'Hoàn thành',
      color: 'success',
      key: 'complete',
   },
   close: {
      title: 'Hủy',
      color: 'error',
      key: 'close',
   },
   shipped: {
      title: 'Lấy vật tư',
      color: 'info',
      key: 'shipped',
   },
} as const;

export type StatusRepair = keyof typeof STATUS_REPAIR;

export const STATUS_DELIVERY = {
   unconfimred: {
      title: 'Chờ xác nhận',
      key: 'unconfimred',
      color: 'info',
   },
   confirmed: {
      title: 'Đã xác nhận',
      key: 'confirmed',
      color: 'success',
   },
   close: {
      title: 'Hủy',
      key: 'close',
      color: 'error',
   },
} as const;

export type StatusDelivery = keyof typeof STATUS_DELIVERY;

export const STATUS_REPAIR_DETAIL = {
   complete: {
      key: 'complete',
      title: 'Hoàn thành',
      color: 'success',
   },
   check: {
      key: 'check',
      title: 'Kiểm tra',
      color: 'warning',
   },
   repair: {
      key: 'repair',
      title: 'Sửa chữa',
      color: 'warning',
   },
   empty: {
      key: 'empty',
      title: 'Trống',
      color: 'info',
   },
   close: {
      key: 'close',
      title: 'Hủy',
      color: 'error',
   },
} as const;

export type StatusRepairDetail = keyof typeof STATUS_REPAIR_DETAIL;
