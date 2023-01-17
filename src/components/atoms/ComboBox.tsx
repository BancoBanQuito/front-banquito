import React from 'react'
// material-ui radio button
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material'
import { blue } from '@mui/material/colors';

interface ComboBoxProps {
    label: string
    items: string[]
    onChange: (value: string) => void
    size?: 'small' | 'medium',
    labelPlacement?: 'top' | 'start' | 'bottom' | 'end',
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
}
// radio button component
const ComboBox = ({ label, items, onChange, size = 'medium', labelPlacement = 'end', direction = 'row' }: ComboBoxProps) => {
    const [value, setValue] = React.useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value)
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
                {items.map((item, index) => (
                    <FormControlLabel key={index} value={item}
                        labelPlacement={labelPlacement}
                        control={<Radio
                            sx={{
                                color: blue[500]
                            }}
                            size={size}
                        />} label={item} />
                ))}
            </RadioGroup>
        </FormControl>
    )
}

export default ComboBox