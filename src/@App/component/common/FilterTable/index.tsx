import { Box } from '@mui/material';

import SearchInput from './SearchInput';
import SortTable from './SortTable';

const FilterTable = (props: {
   sortList?: SortList[];
   searchType?: SortList[];
   isSearch?: boolean;
   isDate?: boolean;
   children?: React.ReactNode;
}) => {
   const { sortList } = props;

   return (
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
         <SearchInput {...props} />
         <SortTable sortList={sortList || []} />
      </Box>
   );
};

export default FilterTable;
