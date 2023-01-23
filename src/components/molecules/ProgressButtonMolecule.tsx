import React, { useEffect, useState } from 'react'
import ButtonIcon from '../atoms/ButtonIcon'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { ColorPalette } from '../../style/ColorPalette'
import { Box } from '@mui/material'

interface ProgressButtonMoleculeProps {
    color: string
    itemsCount: number,
    select?: boolean,
    current?: number,
    leftButton?: boolean,
    rightButton?: boolean,
    onUpdate?: (index: number) => void,
}

const ProgressButtonMolecule = (props: ProgressButtonMoleculeProps) => {

    const [index, setindex] = useState<number>(0);
    const [showLeft, setshowLeft] = useState<boolean>(true);
    const [showRight, setshowRight] = useState<boolean>(true);

    useEffect(() => {
        enableButtons();
        return () => { }
    })


    const clickHandler = (flag: boolean) => {
        setindex((flag) ? index + 1 : index - 1);
        enableButtons();
        if (index >= props.itemsCount) setindex(props.itemsCount - 1);
        if (index < 0) setindex(0);
        props.onUpdate?.(index);
    }

    const enableButtons = () => {
        setshowRight(true);
        setshowLeft(true);
        if (index > props.itemsCount - 2) setshowRight(false);
        if (index < 1) setshowLeft(false);
    }

    const manageOpacity = (i: number) => {

        if (props.current) {
            return (props.current == i) ? '100%' : '50%';
        } else {
            return (index == i) ? '100%' : '50%';
        }
    }

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: 'auto'
            }}>
                {
                    showLeft && props.leftButton ? <ButtonIcon
                        color={props.color}
                        icon={<ChevronLeft />}
                        onClick={() => clickHandler(false)} />
                        : <ButtonIcon
                            disabled
                            color='transparent'
                            icon={<ChevronLeft />}
                            onClick={() => clickHandler(false)} />
                }
                <Box sx={{
                    margin: '1px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: 'auto'
                }}>
                    {
                        Array.from(Array(props.itemsCount).keys()).map((i, key) => {
                            return <span
                                key={i}
                                style={{
                                    marginLeft: '1px',
                                    marginRight: '1px',
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: props.color,
                                    opacity: manageOpacity(i),
                                    borderRadius: '100%',
                                    cursor: (!!props.select) ? 'pointer' : 'auto'
                                }}
                                onClick={() => {
                                    if (!!props.select) {
                                        setindex(i);
                                        enableButtons();
                                        props.onUpdate?.(i);
                                    }
                                }} />
                        })
                    }

                </Box>
                {
                    showRight && props.rightButton ? <ButtonIcon
                        color={props.color}
                        icon={<ChevronRight />}
                        onClick={() => clickHandler(true)} />
                        : <ButtonIcon
                            disabled
                            color='transparent'
                            icon={<ChevronLeft />}
                            onClick={() => clickHandler(false)} />
                }
            </Box>
        </>
    )
}

export default ProgressButtonMolecule