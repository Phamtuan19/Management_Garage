import React, { useState } from 'react';
import { Box, SxProps, TextField, Theme } from '@mui/material';
import { Control, Controller, FieldValues, useWatch } from 'react-hook-form';

interface TextFleidPasswordProps<TFieldValues extends FieldValues = FieldValues> {
   name: string;
   placeholder?: string;
   defaultValue?: string;
   sx?: SxProps<Theme> | undefined;
   control: Control<TFieldValues>;
}

function TextFleidPassword<TFieldValues extends FieldValues = FieldValues>(
   props: TextFleidPasswordProps<TFieldValues>,
) {
   const { name, placeholder, defaultValue, sx, control } = props;

   const [showPassword, setShowPassword] = useState<boolean>(false);

   return (
      <React.Fragment>
         <Box sx={{ position: 'relative' }}>
            <Controller
               render={({ field, fieldState: { error } }) => {
                  return (
                     <React.Fragment>
                        <Box sx={{ position: 'relative' }}>
                           <TextField
                              fullWidth
                              type={!showPassword ? 'password' : 'text'}
                              id={name}
                              variant="outlined"
                              size="small"
                              error={Boolean(error)}
                              sx={{ mb: 0.5, ...sx }}
                              placeholder={placeholder}
                              {...field}
                           />
                           {useWatch({ control })[name] && (
                              <Box
                                 sx={{
                                    width: showPassword ? 24 : 18,
                                    height: showPassword ? 24 : 18,
                                    position: 'absolute',
                                    top: '50%',
                                    right: 10,
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                    zIndex: 100,
                                 }}
                              >
                                 {showPassword ? (
                                    <Box onClick={() => setShowPassword((prev) => !prev)}>
                                       <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 512 512"
                                       >
                                          <path d="M256 128c-81.9 0-145.7 48.8-224 128 67.4 67.7 124 128 224 128 99.9 0 173.4-76.4 224-126.6C428.2 198.6 354.8 128 256 128zm0 219.3c-49.4 0-89.6-41-89.6-91.3 0-50.4 40.2-91.3 89.6-91.3s89.6 41 89.6 91.3c0 50.4-40.2 91.3-89.6 91.3z" />
                                          <path d="M256 224c0-7.9 2.9-15.1 7.6-20.7-2.5-.4-5-.6-7.6-.6-28.8 0-52.3 23.9-52.3 53.3s23.5 53.3 52.3 53.3 52.3-23.9 52.3-53.3c0-2.3-.2-4.6-.4-6.9-5.5 4.3-12.3 6.9-19.8 6.9-17.8 0-32.1-14.3-32.1-32z" />
                                       </svg>
                                    </Box>
                                 ) : (
                                    <Box onClick={() => setShowPassword((prev) => !prev)}>
                                       <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="18"
                                          height="18"
                                          viewBox="0 0 20 20"
                                       >
                                          <path d="M18.521 1.478a1 1 0 0 0-1.414 0L1.48 17.107a1 1 0 1 0 1.414 1.414L18.52 2.892a1 1 0 0 0 0-1.414zM3.108 13.498l2.56-2.56A4.18 4.18 0 0 1 5.555 10c0-2.379 1.99-4.309 4.445-4.309.286 0 .564.032.835.082l1.203-1.202A12.645 12.645 0 0 0 10 4.401C3.44 4.4 0 9.231 0 10c0 .423 1.057 2.09 3.108 3.497zm13.787-6.993l-2.562 2.56c.069.302.111.613.111.935 0 2.379-1.989 4.307-4.444 4.307-.284 0-.56-.032-.829-.081l-1.204 1.203c.642.104 1.316.17 2.033.17 6.56 0 10-4.833 10-5.599 0-.424-1.056-2.09-3.105-3.495z" />
                                       </svg>
                                    </Box>
                                 )}
                              </Box>
                           )}
                        </Box>
                        {error && (
                           <Box component="span" color="red">
                              {error.message}
                           </Box>
                        )}
                     </React.Fragment>
                  );
               }}
               defaultValue={(defaultValue || '') as any}
               name={name as any}
               control={control}
            />
         </Box>
      </React.Fragment>
   );
}

export default TextFleidPassword;
