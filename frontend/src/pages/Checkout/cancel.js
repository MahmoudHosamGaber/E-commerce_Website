import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';


export default function CancelCard() {
    const navigate = useNavigate()
  return (
    <Card sx={{ minWidth: 275, marginTop: 19 }}>
      <CardContent>
      <Box
         display="flex"
         justifyContent="center"
         alignItems="center"
      >
          <Avatar
              alt="Cancel"
              src="https://www.kindpng.com/picc/m/503-5036239_red-x-mark-icon-good-mark-hd-png.png"
              sx={{ width: 100, height: 70 }}
          />
      </Box>

         
        <Typography variant="h5" component="div" sx={{ fontSize: 50 }} color= "red" >
             Cancelled
        </Typography>
        
        <Typography variant="body2">
          Your payment have been cancelled
          <br />
          {'"Please enter your information correctly and try again later"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate("/")}>Go back to home</Button>
      </CardActions>
    </Card>
  );
}
