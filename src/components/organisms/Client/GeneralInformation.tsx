import { Button } from '@mui/material';
import React from 'react';
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
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%' }}>
      <SizeButton
        text="Datos Generales"
        style={ButtonStyle.BIG}
        palette={{ backgroundColor: "#1D3557", accent: "#F1FAEE" }}
      />
      </div>
      <div>
        <div>
          <label>
            Tipo de Identificación  
          </label>
          <br />
          <label>
            Identificación
          </label>
          <br />
          <label>
          Apellido y Nombre
          </label>
          <br />
          <label>
          Estado
          </label>
          <br />
          <label>
          Nocionalidad
          </label>
          <br />
          <label>
          Segmento
          </label>
          <br />
          <label>
          Correo Electronico  
          </label>
          <br />
          <label>
          Tipo de Cliente
          </label>
        </div>
      </div>
      <div style={{ width: '50%' }}>
        <div>
          <Dropdown
            label="Select an option"
            items={items}
            width={200}
            height={40}
            backgroundColor="white"
            selectedTextColor="#4B4B4B"
            onChange={handleChange}
            inputLabelColor="#4B4B4B"
            inputFocusedLabelColor="#4B4B4B"
          />
          <label>
            <input type="text" name="name" />
          </label>
          <br />
          <label>
            <input type="text" name="email" />
          </label>
        </div>
      </div>
    </div>
  );
}