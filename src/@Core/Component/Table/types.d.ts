interface CoreTableContrainerProps {
   isLoading?: boolean;
   children: React.ReactNode;
}

interface CoreWrapperTableProps {
   children: React.ReactNode;
}
interface HookCoreTabeProps {
   data: { [key: string]: string }[] | { [key: string]: string } | null;
   pageSize: number;
   pageIndex: number;
   total: number;
}
