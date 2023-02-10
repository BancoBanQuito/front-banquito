import React from 'react'
// material-ui radio button
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material'
import { blue } from '@mui/material/colors';
import { ColorType } from '../../types/ColorType';

interface ComboBoxProps {
    option: { value: any, label: string };
    // onChange?: (value: string) => void;
    size?: 'small' | 'medium';
    // direction?: 'row' | 'column';
    labelPlacement?: "end" | "start" | "top" | "bottom";
    color?: ColorType;
}
// radio button component
const RadioButtonAtom = (props: ComboBoxProps) => {

    return (
        <>
            {/* <FormControl>
            <FormLabel ></FormLabel>
            <RadioGroup aria-label={label} name={label} value={value} onChange={handleChange}
            sx={{
                flexDirection: direction
            }}
            >
            {options.map((option) => (
                <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio color={color} size={size} />}
                label={option.label}
                labelPlacement={labelPlacement}
                />
                ))}
                </RadioGroup>
            </FormControl> */}
            <FormControlLabel
                value={props.option.value}
                control={
                    <Radio color={props.color || 'primary'} size={props.size || 'medium'} />
                }
                label={props.option.label}
                labelPlacement={props.labelPlacement}
            />
        </>
    )
}

export default RadioButtonAtom