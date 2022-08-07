import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {createOrder} from "../../features/orders/ordersSlice";
import {deleteCart} from "../../features/cart/cartSlice";

export default function SuccessCard() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //Create an order 
    useEffect(() => {
        dispatch(createOrder());
        dispatch(deleteCart())
    }, [dispatch]);

  return (
    <Card sx={{ minWidth: 275, marginTop: 19 }}>
      <CardContent>
      <Box
         display="flex"
         justifyContent="center"
         alignItems="center"
      >
          <Avatar
              alt="success"
              src="https://t3.ftcdn.net/jpg/03/15/38/26/360_F_315382644_8vspaLuKiYsWl1CFHkRdsXnyvAMgnexl.jpg"
              sx={{ width: 100, height: 70 }}
          />
      </Box>

         
        <Typography variant="h5" component="div" sx={{ fontSize: 50 }} color= "green" >
             Success
        </Typography>
        
        <Typography variant="body2">
          Your payment have been successfull
          <br />
          {'"Thanks for choosing us!"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate("/")}>Go back to home</Button>
      </CardActions>
    </Card>
  );
}
