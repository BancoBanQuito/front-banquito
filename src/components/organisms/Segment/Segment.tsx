import React, { useEffect } from "react";
import { ColorPalette } from "../../../style/ColorPalette";
import { Dropdown } from "../../atoms/Dropdown";
import TextFieldAtom from "../../atoms/TextFieldAtom";
import styled from 'styled-components';

export const ContainerSegment = styled.div
`
justify-content: flex-start;
display: flex;
flex-direction: column;
align-items: center;
`

export const Segment = () => {
    const [segmentName, setSegmentName] = React.useState("");
    
    const getSegments = async () => {
        try {
            const response = await fetch('http://localhost:8083/api/segments');
            const data = await response.json();
            console.log(data);
            const segments = data.map((segment: any) => {
                return {
                    id: segment.id,
                    name: segment.name,
                    status: segment.status,
                };
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect (() => {
        getSegments();
    }, [segmentName]);
    return(
    <ContainerSegment>
        <h1>Segmento</h1>
        <div>
            <span>Nombre: </span>
            <TextFieldAtom
                id="segmentName"
                label="Nombre del Segmento"
                type="text"
                placeholder="tipo de segmento"
                variant="standard"
                color="primary"
            />
            <TextFieldAtom
                            id="id"
                            label="Nombre tasa de interes"
                            color="primary"
                            type="text"
                            placeholder="id"
                            variant="standard"
                            action={(event) => setSegmentName(event.target.value)}
                            value={segmentName}
                        />
        </div>
        <br />
        <div>
            <span>Estado: </span>
                <Dropdown
                    label=""
                    items={[
                        { name: "Tasa de interes 1", value: "1" },
                        { name: "Tasa de interes 2", value: "2" },
                    ]}
                    width={200}
                    height={40}
                    // onChange={(event: { target: { value: any } }) =>
                    //     console.log(event.target.value)
                    // }
                    backgroundColor={ColorPalette.SECONDARY}
                />
        </div>
    </ContainerSegment>);
};
