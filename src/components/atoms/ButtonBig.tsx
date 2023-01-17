import React from 'react'
import { ColorPalette } from '../../style/ColorPalette';
import { Box, Button, Grid, Typography } from '@mui/material';
import CustomButton from './CustomButton';

interface Props {
  text: string,
  icon: any,
  sx: {
    backgroundColor: ColorPalette,
    size?: number | string,
    color?: ColorPalette
  }
  onClick: () => void;
}

const ButtonBig = (props: Props) => {
  return (
    <>
      <CustomButton
        variant='contained'
        disableElevation
        sx={{
          backgroundColor: props.sx.backgroundColor,
          color: props.sx.color ? props.sx.color : ColorPalette.ACCENT,
          ':hover': {
            backgroundColor: props.sx.color ? props.sx.color : ColorPalette.ACCENT,
            color: props.sx.backgroundColor,
          }
        }}
        onClick={props.onClick}>
        <Grid
          container
          direction='column'
          justifyContent='center'
          alignItems='center'>
          <Grid item xs={1} lg={1} xl={1}>
            <Box
              sx={{
                width: {
                  xs: "calc(100% - 4px)",
                  lg: "calc(100% - 4px)",
                  xl: "100%"
                },
                height: 'auto',
                aspectRatio: 1,
              }}>
              {props.icon}
            </Box>
          </Grid>
          <Grid item xs={1} lg={1} xl={1}>
            <Box
              sx={{
                width: {
                  xs: "calc(100% - 10px)",
                  lg: "calc(100% - 10px)",
                  xl: "100%"
                },
                height: 'auto',
                aspectRatio: 1,
              }}>
              <Typography variant='body2' component='h6'>
                {props.text}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CustomButton>
    </>
  )
}

export default ButtonBig