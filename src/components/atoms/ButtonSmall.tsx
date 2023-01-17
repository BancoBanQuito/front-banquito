import React from 'react'
import { ColorPalette } from '../../style/ColorPalette';
import { Button, Typography, keyframes, styled, withStyles } from '@mui/material';
import CustomButton from './CustomButton';

interface Props {
  text: string,
  sx: {
    backgroundColor: ColorPalette,
    color?: ColorPalette
  }
  onClick: () => void;
}

const ButtonSmall = (props: Props) => {
  return (
    <>
      <CustomButton variant='contained'
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
        <Typography variant='body1'>
          {props.text}
        </Typography>
      </CustomButton>
      {/*  <button
        className='button'
        onClick={props.onClick}
        style={{
          backgroundColor: props.style.backgroundColor,
          width: props.style.width ? props.style.width : "100%",
          height: props.style.height ? props.style.height : "100%",
          maxWidth: props.style.maxWidth ? props.style.maxWidth : "150px",
          maxHeight: props.style.maxHeight ? props.style.maxHeight : "25px",
          color: props.style.color ? props.style.color : ColorPalette.ACCENT,
          ...style
        }}>
        {props.text}
      </button> */}
    </>
  )
}

export default ButtonSmall