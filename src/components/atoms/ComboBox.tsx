import React from 'react'
// material-ui radio button
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material'
import { blue } from '@mui/material/colors';

interface ComboBoxProps {
    label: string
    value: string
    options: { value: string, label: string }[]
    onChange: (value: string) => void
    size?: 'small' | 'medium',
    labelPlacement?: 'top' | 'start' | 'bottom' | 'end',
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
}
// radio button component
const ComboBox = ({ value, label, options, onChange, size = 'medium', labelPlacement = 'end', direction = 'row' }: ComboBoxProps) => {
    

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange((event.target as HTMLInputElement).value)
    }

    return (
        <FormControl>
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
                        control={<Radio sx={{
                            color: blue[400]
                        }} size={size} />}
                        label={option.label}
                        labelPlacement={labelPlacement}

                    />
                ))}
            </RadioGroup>
        </FormControl>
    )
}

export default ComboBox