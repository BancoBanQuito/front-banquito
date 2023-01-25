import React, { useEffect } from "react";
import styled from "styled-components";
import BranchBox from "../Branch/BranchBox";

export const ContainerSegment = styled.div`
  justify-content: flex-start;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Segment = () => {
  const [segmentName, setSegmentName] = React.useState("");

  const getSegments = async () => {
    try {
      const response = await fetch("http://localhost:8083/api/segments");
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
  };

  useEffect(() => {
    getSegments();
  }, [segmentName]);
  return (
    <ContainerSegment>
      <div>
        <span>Nombre del segmento: </span>
        <div style={{ marginRight: '10px' }}>
                    <BranchBox
                        label="Selecciona el segmento:"
                        value={segmentName}
                        options={segmentName}
                        onChange={segmentName}
                    />
                </div>
      </div>
    </ContainerSegment>
  );
};
