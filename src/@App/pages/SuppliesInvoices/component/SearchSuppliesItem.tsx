/* eslint-disable @typescript-eslint/naming-convention */
import LazyLoadingImage from '@App/component/customs/LazyLoadingImage';
import { ReadSupplies } from '@App/services/supplies.service';
import handlePrice from '@Core/Helper/formatPrice';
import { Box, ButtonBase, styled } from '@mui/material';

interface SearchSuppliesitemprops {
   supplie: ReadSupplies;
   handleClickSupplieItem: (supplie: ReadSupplies) => void;
}

const SearchSuppliesItem = ({ supplie, handleClickSupplieItem }: SearchSuppliesitemprops) => {
   return (
      <ButtonBase
         sx={({ base }) => ({
            width: '100%',
            display: 'flex',
            gap: '12px',
            py: '6px',
            px: '12px',
            fontSize: '14px',
            '&:hover': {
               backgroundColor: base.text.primary,
               color: base.color.contrastText as string,
            },
         })}
         onClick={() => handleClickSupplieItem(supplie)}
      >
         <LazyLoadingImage src="" w="36" h="36" />
         <Flex sx={{ flexDirection: 'column', flex: 1, gap: '6px' }}>
            <Box sx={{ width: '100%', textOverflow: 'ellipsis', overflow: 'hidden', textAlign: 'left' }}>
               {supplie.name_detail} - {supplie.name_distributor}
            </Box>
            <Flex sx={{ width: '100%', gap: '12px' }}>
               <Box>
                  <span>#1122</span>
               </Box>
               <Flex sx={{ flex: 2, gap: '3px' }}>
                  <p>Giá nhập:</p>
                  <p>{handlePrice(supplie.imported_price ?? 0)}</p>
               </Flex>
               <Flex sx={{ flex: 1, gap: '6px' }}>
                  <Box>Tồn:</Box>
                  <Box>{supplie.supplies_invoice_total}</Box>
               </Flex>
            </Flex>
         </Flex>
      </ButtonBase>
   );
};

const Flex = styled('div')({
   width: '100%',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'flex-start',
});

export default SearchSuppliesItem;
