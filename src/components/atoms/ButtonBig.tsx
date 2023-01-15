import React from 'react'
import { ColorPalette } from '../../style/ColorPalette';
import CodeIcon from '@mui/icons-material/Code';

const style: React.CSSProperties = {
  width: "100%",
  height: "100vh",
  padding: "20px",
  margin: "10px",
  display: "flex",
  flexDirection: "column",
}

interface Props {
  text: string,
  icon: any,
  style: {
    backgroundColor: ColorPalette,
    size?: number,
    fontSize?: number | string,
    color?: ColorPalette
  }
  onClick: () => void;
}

const ButtonBig = (props: Props) => {
  return (
    <button
      className='button'
      onClick={props.onClick}
      style={{
        backgroundColor: props.style.backgroundColor,
        fontSize: props.style.fontSize ? props.style.fontSize : "15px",
        maxWidth: props.style.size ? props.style.size : "50px",
        maxHeight: props.style.size ? props.style.size : "50px",
        color: props.style.color ? props.style.color : ColorPalette.ACCENT,
        ...style
      }}>
      <props.icon style={{ width: "100%", height: "100%", maxWidth: "100px", maxHeight: "100px" }} />
      {props.text}
    </button>
  )
}

export default ButtonBig