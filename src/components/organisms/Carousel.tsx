import React, { useState } from 'react'
import ProgressButtonMolecule from '../molecules/ProgressButtonMolecule'
import { ColorPalette } from '../../style/ColorPalette'

interface CarouselProps {
    items: any[];
    activeButtons?: boolean;
    activeSelect?: boolean;
}

const Carousel = (props: CarouselProps) => {
    const [currentIndex, setcurrentIndex] = useState<number>(0);

    const infiteScroll = () => {
        if (currentIndex === props.items.length - 1) {
            setcurrentIndex(0);
        }
        setcurrentIndex(1);
    }

    const handleSelection = (index: number) => {

    }

    return (
        <div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center'
            }}>
                {
                    props.items.map((item: any, index: number) => {
                        return <div key={index}>
                            {item}
                        </div>
                    })
                }
            </div>
            <ProgressButtonMolecule
                color={ColorPalette.PRIMARY}
                select={props.activeSelect}
                onUpdate={handleSelection}
                spotSize={10}
                leftButton={props.activeButtons}
                rightButton={props.activeButtons}
                itemsCount={props.items.length} />
        </div>

    )
}

export default Carousel