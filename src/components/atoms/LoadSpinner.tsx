import { makeStyles } from '@mui/material';
import React from 'react'

import { styled } from '@mui/material/styles';
import { borderTopColor, keyframes } from '@mui/system';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const RotatedBox = styled("div")({
  borderTop: '2px solid',
  borderRadius: '100px',
  animation: `${spin} 1s infinite ease`
});

interface LoadSpinnerProps {
  color?: string,
  size?: string | number
}

const LoadSpinner = (props: LoadSpinnerProps) => {
  return (
    <RotatedBox
      style={{
        borderTopColor: props.color || '#000',
        width: props.size || 50,
        height: props.size || 50
      }} />
  )
}

export default LoadSpinner