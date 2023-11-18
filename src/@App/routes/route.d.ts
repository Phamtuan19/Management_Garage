interface RoutePermission {
   action: PageActionPropsType;
   module: ModulePagePropsType;
   path: RoutePathPropsType;
   children: React.ReactNode;
   fallback?: React.ReactNode;
}
