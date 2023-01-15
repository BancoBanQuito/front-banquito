import React from 'react'
import { ColorPalette } from '../../style/ColorPalette';

const style: React.CSSProperties = {
  padding: "20px 10px",
  margin: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

interface Props {
  text: string,
  style: {
    backgroundColor: ColorPalette,
    width?: number | string,
    height?: number | string,
    maxWidth?: number | string,
    maxHeight?: number | string,
    fontSize?: number | string,
    color?: ColorPalette
  }
  onClick: () => void;
}

const ButtonSmall = (props: Props) => {
  return (
    <>
      <button
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
      </button>
    </>
  )
}

export default ButtonSmall