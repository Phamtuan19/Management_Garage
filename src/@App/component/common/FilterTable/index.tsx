import { Box } from '@mui/material';

import SearchInput from './SearchInput';
import SortTable from './SortTable';
import LockButton from './LockButton';


export const FilterTable = (props: { sortList: SortList[]; searchType: SortList[] }) => {
   return (
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
         <SearchInput {...props} />
         <SortTable sortList={props.sortList} />
         {/* <LockButton lock={props.lock} /> */}
      </Box>
   );
};

// export default FilterTable;

export const Lock = (props: {  lock: Lock[] }) => {
   return (
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
         <LockButton lock={props.lock} />
      </Box>
   );
};

// export default  Lock ;