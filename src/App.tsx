import { useState, ChangeEvent as ReactChangeEvent } from "react";
import { Box, Card, CardContent, TextField, Typography, Slider, Stack } from "@mui/material";
import { ReactBarcode } from "react-jsbarcode";
import JsBarcode from "jsbarcode";

const Barcode = ({
  code,
  format,
  height,
  fontSize,
}: {
  code: string;
  format: string;
  height: number;
  fontSize: number;
}) => {
  let value: string = "";
  JsBarcode({}, code, {
    format,
    valid: (v) => {
      if (v) {
        value = format;
      }
    },
  });
  if (value === "") return <div></div>;

  const hasFlatStyle = ["EAN13", "EAN8", "UPC"].includes(format);

  return (
    <Box sx={{ display: "inline-block" }}>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Box display="flex" flexDirection="column">
          <div>default</div>
          <ReactBarcode
            value={code}
            options={{
              format,
              displayValue: true,
              fontSize,
              text: code,
              flat: false,
              height,
              valid: (_valid) => {},
            }}
          />
        </Box>
        {hasFlatStyle && (
          <Box display="flex" flexDirection="column" ml={8}>
            <div>flat</div>
            <ReactBarcode
              value={code}
              options={{
                format,
                displayValue: true,
                fontSize,
                text: code,
                flat: true,
                height,
                valid: (_valid) => {},
              }}
            />
          </Box>
        )}
      </Stack>

      {/*
      <Box>
        <Button variant="contained">SAVE(JPEG)</Button>
      </Box>
      */}
    </Box>
  );
};

export default function App() {
  const [code, setCode] = useState("");
  const [height, setHeight] = useState(48);
  const [fontSize, setFontSize] = useState(20);

  const handleCodeChange = (e: ReactChangeEvent<HTMLInputElement>) => {
    setCode(e.currentTarget.value);
  };

  const formats = [
    { title: "EAN-13(JAN13)", format: "EAN13" },
    { title: "EAN-8", format: "EAN8" },
    { title: "EAN-5", format: "EAN5" },
    { title: "UPC", format: "UPC" },
    { title: "ITF-14", format: "ITF14" },
    { title: "CODE39", format: "CODE39" },
    { title: "CODE128", format: "CODE128" },
  ];

  return (
    <Box>
      <TextField placeholder="1234567890123" label="code" onChange={handleCodeChange} />
      <Box maxWidth={240}>
        高さ
        <Slider
          size="small"
          min={1}
          max={128}
          defaultValue={48}
          aria-label="Small"
          valueLabelDisplay="auto"
          onChange={(_e, value) => {
            setHeight(value as number);
          }}
        />
        フォントサイズ
        <Slider
          size="small"
          min={1}
          max={64}
          defaultValue={20}
          aria-label="Small"
          valueLabelDisplay="auto"
          onChange={(_e, value) => {
            setFontSize(value as number);
          }}
        />
      </Box>
      <Box>※チェックディジットは省略される場合があります</Box>

      <Stack spacing={1} mt={4}>
        {formats.map((f) => (
          <Box key={f.format}>
            <Card variant="outlined">
              <Typography variant="h5" component="div" pl={1} pt={1}>
                {f.title}
              </Typography>
              <CardContent>
                <Barcode format={f.format} code={code} height={height} fontSize={fontSize} />
              </CardContent>
            </Card>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
