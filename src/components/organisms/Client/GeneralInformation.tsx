import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { ButtonStyle } from '../../../style/ButtonStyle';
import { Dropdown } from '../../atoms/Dropdown';
import { SizeButton } from '../../atoms/SizeButton';

export const GeneralInformation = () => {
  const items = [
    { name: 'Cédula', value: 'DNI' },
    { name: 'RUC', value: 'RUC' },
    { name: 'Pasaporte', value: 'PASS' },
  ];
  const handleChange = (value) => {
    console.log(value);
  }
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}