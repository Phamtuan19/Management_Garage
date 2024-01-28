import { styled, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import SidebarItem from './SidebarItem';

interface SidebarProps {
   openSidebar: boolean;
}

const Sidebar = ({ openSidebar }: SidebarProps) => {
   const theme = useTheme();
   const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));
   return (
      <WarpperSidebar openSidebar={openSidebar} isLgDown={isLgDown}>
         <SidebarItem />
      </WarpperSidebar>
   );
};

const WarpperSidebar = styled('div')<{ openSidebar: boolean; isLgDown: boolean }>(({ theme, openSidebar }) => ({
   boxSizing: 'border-box',
   position: 'fixed',
   top: theme.base.header.height,
   left: openSidebar ? 0 : '-25%',
   width: theme.base.sidebar.width,
   transition: 'left 0.5s ease-in-out', // Hiệu ứng di chuyển khi mở
   overflow: 'hidden',
   height: `calc(100vh - ${theme.base.header.height}px)`,
   backgroundColor: theme.base.sidebar.backgroundColor,
   boxShadow: theme.base.sidebar.boxShadow,
}));

export default Sidebar;
