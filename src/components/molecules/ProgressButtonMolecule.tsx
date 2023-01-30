import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import ButtonIcon from '../atoms/ButtonIcon'

interface ProgressButtonMoleculeProps {
    color: string
    itemsCount: number,
    select?: boolean,
    current?: number,
    leftButton?: boolean,
    rightButton?: boolean,
    onUpdate?: (index: number) => void,
    spotSize?: number | string,
    indicatorHidden?: boolean
}

const spanChild = (color: string, opacity: number | string, spotSize?: number | string, select?: boolean, onClick?: () => void) => <span
    style={{
        marginLeft: '1px',
        marginRight: '1px',
        width: spotSize || '20px',
        height: spotSize || '20px',
        backgroundColor: color,
        opacity: opacity,
        borderRadius: '100%',
        cursor: (!!select) ? 'pointer' : 'auto'
    }}
    onClick={onClick && onClick} />

const ProgressButtonMolecule = (props: ProgressButtonMoleculeProps) => {

    const [index, setindex] = useState<number>(0);
    const [showLeft, setshowLeft] = useState<boolean>(true);
    const [showRight, setshowRight] = useState<boolean>(true);

    useEffect(() => {
        enableButtons();
        return () => { }
    }, [index]);


    const clickHandler = (flag: boolean) => {
        enableButtons();
        updateIndex(flag ? index + 1 : index - 1);
    }

    const updateIndex = (value: number) => {
        if (value <= 0) {
            value = 0;
        } else if (value >= props.itemsCount - 1) {
            value - 1;
        }
        setindex(value);
        props.onUpdate?.(value);
    }

    const enableButtons = () => {
        setshowRight(true);
        setshowLeft(true);
        if (index >= props.itemsCount - 2) setshowRight(false);
        if (index <= 0) setshowLeft(false);
    }

    const manageOpacity = (i: number) => {
        if (props.current) {
            return (props.current == i) ? '100%' : '50%';
        } else {
            return (index == i) ? '100%' : '50%';
        }
    }

    return (
        <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {
                <div style={{ margin: '5px' }}>
                    <ButtonIcon
                        color={(showLeft && props.leftButton) ? props.color : 'transparent'}
                        disabled={(showLeft && props.leftButton)}
                        icon={<ChevronLeft />}
                        onClick={() => (showLeft && props.leftButton) && clickHandler(false)} />
                </div>
            }
            {
                !!!props.indicatorHidden && [...Array(5).keys()].map(value => {
                    return spanChild(
                        props.color,
                        manageOpacity(value),
                        props.spotSize,
                        props.select,
                        () => { props.select && updateIndex(value) }
                    );
                })
            }
            {
                <div style={{ margin: '5px' }}>
                    <ButtonIcon
                        color={(showRight && props.rightButton) ? props.color : 'transparent'}
                        disabled={(showRight && props.rightButton)}
                        icon={<ChevronRight />}
                        onClick={() => (showRight && props.rightButton) && clickHandler(true)} />
                </div>
            }
        </div>
    )
}

export default ProgressButtonMolecule