import React from 'react'
import { ColorPalette } from '../../style/ColorPalette';
import { Shape } from '../../style/Shape';

const style: React.CSSProperties = {
    margin: "10px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}

interface Props {
    icon: any,
    style: {
        backgroundColor: ColorPalette,
        size?: number | string,
        maxSize?: number | string,
        color?: ColorPalette
    }
    onClick: () => void;
    shape?: Shape,
    isFloating?: boolean,
    top?: boolean
    bottom?: boolean,
    left?: boolean,
    right?: boolean,
}

const ButtonIcon = (props: Props) => {

    const createStyle = (): React.CSSProperties => {

        if (!props.shape) {
            if (props.shape == Shape.SQUARE) {
                return {
                    backgroundColor: props.style.backgroundColor,
                    width: props.style.size ? props.style.size : "100%",
                    height: props.style.size ? props.style.size : "100%",
                    maxWidth: props.style.maxSize ? props.style.maxSize : "100px",
                    maxHeight: props.style.maxSize ? props.style.maxSize : "100px",
                    color: props.style.color ? props.style.color : ColorPalette.ACCENT,
                    ...style
                };
            }
        }
        return {
            borderRadius: "100%",
            backgroundColor: props.style.backgroundColor,
            width: props.style.size ? props.style.size : "100%",
            height: props.style.size ? props.style.size : "100%",
            maxWidth: props.style.maxSize ? props.style.maxSize : "100px",
            maxHeight: props.style.maxSize ? props.style.maxSize : "100px",
            color: props.style.color ? props.style.color : ColorPalette.ACCENT,
            ...style
        };
    }

    const floatingStyle = () => {
        let style = {};
        if(!!props.isFloating && !!props.top){
            style = {...style, top: 0};
        } else if(!!props.isFloating && !!props.bottom){
            style = {...style, bottom: 0};
        }

        if(!!props.isFloating && !!props.left){
            style = {...style, left: 0};
        } else if(!!props.isFloating && !!props.right){
            style = {...style, right: 0};
        }
        return style;
    }

    return (
        <>
            <button
                className={`button ${props.isFloating ? 'float' : ''}`}
                onClick={props.onClick}
                style={{ ...floatingStyle(), ...createStyle() }}>
                <props.icon style={{ width: "100%", height: "100%", maxWidth: "100px", maxHeight: "100px" }} />
            </button>
        </>
    )
}

export default ButtonIcon