import react, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Dayjs } from "dayjs";
import DatePickerAtom from "@/components/atoms/DatePicker";
import { SizeButton } from "@/components/atoms/SizeButton";
import TableMolecule from "@/components/molecules/TableMolecule";
import { ButtonStyle } from "@/style/ButtonStyle";
import { ColorPalette } from "@/style/ColorPalette";

const TransactionBeetwenDates = () => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [showTable, setShowTable] = useState<boolean>(false);

  const headersMock = [
    <Typography>Fecha</Typography>,
    <Typography>Movimiento</Typography>,
    <Typography>Concepto</Typography>,
    <Typography>Monto</Typography>,
    <Typography>Saldo disponible</Typography>
  ]

  const rowsMock = [
    [
      <Typography>Cell 1</Typography>,
      <Typography>Cell 2</Typography>,
      <Typography>Cell 3</Typography>,
      <Typography>Cell 4</Typography>,
      <Typography>Cell 5</Typography>,
      //<Dropdown label='Cell 4' items={['Cell 1']} width={200} height={50} />
    ],
    [
      <Typography>Cell 5</Typography>,
      <Typography>Cell 6</Typography>,
      <Typography>Cell 7</Typography>,
      <Typography>Cell 7</Typography>,
      <Typography>Cell 7</Typography>,
      //<Button variant='contained'>Cell 8</Button>
    ]
  ]

  useEffect(() => {
    console.log(date?.format("YYYY-MM-DD"));
  }, [date]);

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          verticalAlign: "middle",
          alignText: "center",
        }}
      >
        <div
          style={{
            margin: "2rem",
          }}
        >
          <Typography variant="h4">
            Búsqueda de transacciones por fecha
          </Typography>
        </div>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          verticalAlign: "middle",
          alignText: "center",
        }}
      >
        <div
          style={{
            margin: "1rem",
          }}
        >
          <Typography variant="h6"> Desde:</Typography>
        </div>

        <Box>
          <DatePickerAtom label="Date" value={date} onChange={setDate} />
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          verticalAlign: "middle",
          alignText: "center",
        }}
      >
        <div
          style={{
            margin: "1rem",
          }}
        >
          <Typography variant="h6"> Hasta:</Typography>
        </div>

        <Box>
          <DatePickerAtom label="Date" value={date} onChange={setDate} />
        </Box>

        <div>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alingItems: "center",
              verticalAlign: "middle",
              alignText: "center",
            }}
          >
            <div
              style={{
                margin: "2rem",
              }}
            >
              <SizeButton
                text={"Buscar"}
                style={ButtonStyle.MEDIUM}
                palette={{
                  backgroundColor: ColorPalette.PRIMARY,
                }}
                onClick={() => {
                    setShowTable(true);
                }}
              ></SizeButton>
            </div>
          </Box>
        </div>
      </Box>
      {
            showTable ? <div><TableMolecule headers={headersMock} rows={rowsMock} /></div> : null
      }
    </div>
  );
};
export default TransactionBeetwenDates;
