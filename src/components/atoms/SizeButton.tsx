import React from 'react'
import { ColorPalette } from '../../style/ColorPalette';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import CustomButton from './CustomButton';
import { ButtonStyle } from '../../style/ButtonStyle';

interface Props {
  text: string,
  style: ButtonStyle,
  palette: {
    backgroundColor: ColorPalette,
    accent?: ColorPalette,
  },
  onClick: () => void,
  column?: boolean,
  icon?: any,
  size?: {
    width: number | string,
    height: number | string
  }
}

export const SizeButton = (props: Props) => {

  const configureWidth = () => {
    let width: number | string;
    if (props.size) {
      width = props.size.width;
    } else {
      switch (props.style) {
        case ButtonStyle.BIG:
          width = '200px';
          break;
        case ButtonStyle.MEDIUM:
          width = '150px';
          break;
        case ButtonStyle.SMALL:
          width = '75px';
          break;
      }
    }

    return width;
  }

  return (
    <>
      <CustomButton
        variant='contained'
        disableElevation
        sx={{
          backgroundColor: props.palette.backgroundColor,
          color: props.palette.accent ? props.palette.accent : ColorPalette.ACCENT,
          width: configureWidth,
          ':hover': {
            backgroundColor: props.palette.accent ? props.palette.accent : 'transparent',
            color: props.palette.backgroundColor,
          }
        }}
        onClick={props.onClick}>
        <Grid
          display='flex'
          flexDirection={(props.column) ? 'column' : 'row'}
          justifyContent='center'
          alignItems='center'
          gap={(props.column) ? 0.5 : 1.5}>
          {props.icon ? <Box display='flex' flexDirection={(props.column != null) ? 'column' : 'row'} justifyContent='center' alignItems='center' sx={{ width: "100%", height: "100%" }}>{props.icon}</Box> : null}
          <Box display='flex' flexDirection={(props.column != null) ? 'column' : 'row'} justifyContent='center' alignItems='center' sx={{ width: "100%", height: "100%" }}>{props.text}</Box>
        </Grid>
      </CustomButton>
    </>
  )
}
