interface PermissionAccessType {
   action: PageActionPropsType;
   module: ModulePagePropsType;
   path: RoutePathPropsType;
   isMenu?: boolean;
   children: React.ReactNode;
   fallback?: React.ReactNode;
}
