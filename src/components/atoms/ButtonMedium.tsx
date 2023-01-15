import React from 'react'
import { ColorPalette } from '../../style/ColorPalette';

const style: React.CSSProperties = {
  padding: "20px 10px",
  margin: "10px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

interface Props {
  text: string,
  icon: any,
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


export const ButtonMedium = (props: Props) => {
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
        <div style={
          { width: "25%" }
        }>
          <props.icon style={{
            width: "auto",
            height: "auto"
          }} />
        </div>
        <div style={
          { width: "75%" }
        }>
          {props.text}
        </div>
      </button>
    </>
  )
}
