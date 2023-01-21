import React from 'react'
import { Box, Button, Grid } from '@mui/material';
import { ButtonStyle } from '../../style/ButtonStyle';

interface Props {
  text: string,
  style: ButtonStyle,
  palette: {
    backgroundColor: string,
    accent?: string,
  },
  submit?: boolean
  onClick?: () => void,
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
      <Button
        variant='contained'
        type={(!!props.submit ? 'submit' : 'button')}
        disableElevation
        sx={{
          backgroundColor: props.palette.backgroundColor,
          color: props.palette.accent ? props.palette.accent : '#F1FAEE',
          borderRadius: "10px",
          transition: "all .3s ease- out",
          width: configureWidth,
          height: props.size?.height ? props.size.height : 'auto',
          ':hover': {
            backgroundColor: props.palette.accent ? props.palette.accent : 'transparent',
            color: props.palette.backgroundColor,
            filter: "opacity(0.75)",
            transition: "all .3s ease-in-out"
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
      </Button>
    </>
  )
}
