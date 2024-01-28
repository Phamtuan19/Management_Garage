/* eslint-disable @typescript-eslint/naming-convention */
import GlobalStyles from '@mui/material/GlobalStyles';

export default function GlobalBaseline() {
   return (
      <GlobalStyles
         styles={({ palette }) => ({
            html: {
               overflowY: 'auto',
               backgroundColor: palette.background.default,
            },
            'html, body, #root': {
               boxSizing: 'border-box',
               padding: '0 !important',
               margin: '0 !important',
            },
            // 'html::-webkit-scrollbar': {
            //    width: 12,
            //    backgroundColor: '#F5F5F5',
            // },
            // 'html::-webkit-scrollbar-thumb': {
            //    borderRadius: 0,
            //    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,.3)',
            //    backgroundColor: 'rgba(0, 0, 0, 0.4)',
            // },
            '#nprogress': {
               pointerEvents: 'none',
            },
            '#nprogress .bar': {
               backgroundColor: '#1976d2',
               position: 'fixed',
               zIndex: 1998,
               top: 0,
               left: 0,
               width: '100%',
               height: 2,
            },
         })}
      />
   );
}
