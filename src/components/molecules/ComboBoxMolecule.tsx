import { FormControl, FormLabel, RadioGroup } from '@mui/material'
import React from 'react'
import RadioButtonAtom from '../atoms/RadioButtonAtom';
import { ColorType } from '../../types/ColorType';

interface ComboBoxMoleculeProps {
    name: string;
    options: { value: any, label: string }[];
    row?: boolean;
    defaultValue?: any;
    label?: string;
    color?: ColorType;
}

const ComboBoxMolecule = (props: ComboBoxMoleculeProps) => {
    return (
        <div style={{ margin: '1rem' }}>
            <FormControl>
                <FormLabel>{props.label}</FormLabel>
                <RadioGroup
                    row={!!props.row}
                    name={props.name}
                    defaultValue={props.defaultValue}>
                    {
                        props.options.map((option, index) => {
                            return <RadioButtonAtom
                                key={index}
                                color={props.color}
                                option={option} />
                        })
                    }

                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default ComboBoxMolecule