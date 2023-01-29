import { FormLabel, Select, MenuItem } from '@mui/material'

interface ComboBoxProps {
    label: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
}

const LoginBox = ({ value, label, options, onChange }: ComboBoxProps) => {
    return (
        <>
            <FormLabel>{label}</FormLabel>
            <Select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                sx={selectStyles}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value} sx={menuItemStyles}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
};

export default LoginBox;

const selectStyles = () => ({
    width: '200px',
    background: '#1D3557',
    color: 'white',
    fontWeight: 'bold'
});

const menuItemStyles = () => ({
    color: '#1D3557',
});
