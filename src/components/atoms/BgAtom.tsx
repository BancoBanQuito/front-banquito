import React from 'react'
import BgImage from '../../assets/wood.jpg';

const BgAtom = () => {
    return (
        <div style={{
            backgroundImage: `url(${BgImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: 'cover',
            width: '100vw',
            height: '100%',
            zIndex: -1,
            position: 'fixed',
            top: 0,
            left: 0
        }} />
    )
}

export default BgAtom