import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

export default function ContactForm() {
  return (
    <div className='flex justify-center' >
            <Box
                component="form"
                sx={{
                    width: 500,
                    maxWidth: '100%',
                }}
                noValidate
                autoComplete="on"
                className='flex flex-wrap gap-x-4 gap-y-5'
            >
                <TextField id="outlined-basic" label="Nombre" variant="outlined" className='flex-1 shrink-0 basis-[48%] flex' />
                <TextField id="outlined-basic" label="Teléfono" variant="outlined" className='flex-1 shrink-0 basis-[48%] flex' />
                <TextField id="outlined-basic" label="Correo" type="email" variant="outlined" className='flex-1 shrink-0  flex' />
                
                <TextField
                    id="outlined-multiline-static"
                    label="Mensaje"
                    multiline
                    maxRows={7}
                    fullWidth
                />
                <input type="checkbox" name="acepto" id="" /><span>Acepto politica de tratamiento de datos</span>
                <Stack direction="row" spacing={1}>                    
                    <Button variant="contained" endIcon={<SendIcon />} size='large'>
                        Enviar Mensaje
                    </Button>
                </Stack>
            </Box>
        </div>
  )
}