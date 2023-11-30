export const CHIP_COLOR = {
   view: 'primary',
   create: 'success',
   update: 'secondary',
   show: 'info',
   edit: 'warning',
   delete: 'error',
} as const;

export const ACTION_MODULE = [
   {
      value: 'view',
      title: 'view',
   },
   {
      value: 'create',
      title: 'create',
   },
   {
      value: 'update',
      title: 'update',
   },
   {
      value: 'show',
      title: 'show',
   },
   {
      value: 'edit',
      title: 'edit',
   },
   {
      value: 'delete',
      title: 'delete',
   },
];
