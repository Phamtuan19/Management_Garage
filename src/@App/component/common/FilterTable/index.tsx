import { Box } from '@mui/material';

import SearchInput from './SearchInput';
import SortTable from './SortTable';
import LockButton from './LockButton';


const FilterTable = (props: { sortList: SortList[]; searchType: SortList[]; lock: Lock[] }) => {
   return (
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
         <SearchInput {...props} />
         <SortTable sortList={props.sortList} />
         <LockButton lock={props.lock} />
      </Box>
   );
};

export default FilterTable;
