import React from 'react'
import { ColorPalette } from '../../style/ColorPalette';

const style: React.CSSProperties = {
    margin: "10px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}

interface Props {
    icon: any
    style: {
        backgroundColor: ColorPalette,
        size?: number | string,
        maxSize?: number | string,
        color?: ColorPalette
    }
    onClick: () => void;
}

const ButtonIcon = (props: Props) => {
    return (
        <>
            <button
                className='button'
                onClick={props.onClick}
                style={{
                    backgroundColor: props.style.backgroundColor,
                    width: props.style.size ? props.style.size : "100%",
                    height: props.style.size ? props.style.size : "100%",
                    maxWidth: props.style.maxSize ? props.style.maxSize : "100px",
                    maxHeight: props.style.maxSize ? props.style.maxSize : "100px",
                    color: props.style.color ? props.style.color : ColorPalette.ACCENT,
                    ...style
                }}>
                <props.icon style={{ width:"100%", height:"100%", maxWidth: "100px", maxHeight:"100px" }}>
            </button>
        </>
    )
}

export default ButtonIcon