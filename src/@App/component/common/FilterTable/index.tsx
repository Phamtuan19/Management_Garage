import { Box } from '@mui/material';

import SearchInput from './SearchInput';
import SortTable from './SortTable';

const FilterTable = (props: { sortList: SortList[]; searchType: SortList[] }) => {
   return (
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
         <SearchInput {...props} />
         {/* Sort table */}
         <SortTable sortList={props.sortList} />
      </Box>
   );
};

export default FilterTable;
