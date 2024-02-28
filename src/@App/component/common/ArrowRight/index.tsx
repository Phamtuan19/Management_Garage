import Box from '@mui/material/Box';
import { styled } from '@mui/material';

interface ArrowRightType {
   check: string;
   options: { title: string; name: string }[];
}

interface StyledBoxProps {
   item: { title: string; name: string };
   check: string;
   index: number;
   islast: string;
}

const ArrowRight = ({ options, check }: ArrowRightType) => {
   return (
      <Box
         sx={({ base }) => ({
            // border: '1px solid  #d1d5db5e',
            borderRadius: '5px',
            backgroundColor: base.background.white as string,
            display: 'flex',
            justifyContent: 'flex-end',
            border: '1px solid  #d1d5db5e',
         })}
      >
         {options.map((item: { title: string; name: string }, index: number) => (
            <StyledBox
               key={index}
               item={item}
               check={check}
               index={index}
               islast={String(index + 1 === options.length)}
            >
               {index !== 0 && item.name === check && (
                  <Box
                     sx={{
                        position: 'absolute',
                        top: 0,
                        display: 'inline-block',
                        border: `1px solid transparent`,
                        padding: (theme) => theme.spacing(1),
                        left: '-17.1px',
                        borderLeftColor: 'transparent',
                        backgroundColor: item.name === check ? 'white' : 'transparent',
                        transform: 'translateY(20.92px) rotate(-45deg) skew(-15deg, -15deg) translateX(15.5px)',
                     }}
                  />
               )}
               <Box>{item.title}</Box>
               {index + 1 !== options.length && (
                  <Box
                     sx={{
                        position: 'absolute',
                        top: 0,
                        right: '-1px',
                        display: 'inline-block',
                        borderRight: `1px solid #DADADA`,
                        borderBottom: `1px solid #DADADA`,
                        padding: '8.1px',
                        zIndex: 1,
                        borderLeftColor: item.name === check ? '#00AA55' : 'transparent',
                        backgroundColor: item.name === check ? '#00AA55' : 'transparent',
                        transform: 'translateY(20.92px) rotate(-45deg) skew(-15deg, -15deg) translateX(15.5px)',
                     }}
                  />
               )}
            </StyledBox>
         ))}
      </Box>
   );
};

const StyledBox = styled(Box)<StyledBoxProps>(({ theme, item, check, index, islast }) => ({
   position: 'relative',
   height: '32px',
   width: 'auto',
   minWidth: '75.886px',
   backgroundColor: item.name === check ? '#00AA55' : 'transparent',
   borderLeft: index === 0 ? '1px solid #DADADA' : 'none',
   //    borderLeft: index !== 0 ? `1px solid transparent` : 'none',
   paddingLeft: index !== 0 ? theme.spacing(3) : '0',
   paddingRight: islast ? theme.spacing(3) : theme.spacing(2),
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   fontSize: '0.875rem',
   fontWeight: '500',
   fontStyle: 'normal',
   fontVariant: 'normal',
   letterSpacing: 'normal',
   lineHeight: '1.25',
   color: item.name === check ? theme.palette.common.white : theme.palette.text.primary,
}));

export default ArrowRight;
