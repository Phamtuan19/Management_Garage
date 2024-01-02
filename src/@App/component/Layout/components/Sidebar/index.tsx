import { styled, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import SidebarItem from './SidebarItem';

interface SidebarProps {
   setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
   openSidebar: boolean;
}

const Sidebar = ({ openSidebar, setOpenSidebar }: SidebarProps) => {
   const theme = useTheme();
   const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));
   return (
      <>
         {!isLgDown && (
            <WarpperSidebar>
               <SidebarItem />
            </WarpperSidebar>
         )}
         {isLgDown && (
            <ExtendDrawer open={openSidebar} onClose={() => setOpenSidebar(false)}>
               <WarpperSidebar>
                  <SidebarItem />
               </WarpperSidebar>
            </ExtendDrawer>
         )}
      </>
   );
};

const WarpperSidebar = styled('div')(({ theme }) => ({
   boxSizing: 'border-box',
   position: 'fixed',
   top: theme.base.header.height,
   left: 0,
   width: theme.base.sidebar.width + 'px',
   height: `calc(100vh - ${theme.base.header.height}px)`,
   backgroundColor: theme.base.sidebar.backgroundColor,
   boxShadow: theme.base.sidebar.boxShadow,
}));

const ExtendDrawer = styled(Drawer)(({ theme }) => ({
   position: 'fixed',
   top: theme.base.header.height,
   left: 0,
   width: theme.base.sidebar.width + 'px',
   height: `calc(100vh - ${theme.base.header.height}px)`,
   backgroundColor: theme.base.sidebar.backgroundColor,
   boxShadow: theme.base.sidebar.boxShadow,
}));

export default Sidebar;
