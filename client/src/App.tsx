import { useEffect, useState } from "react";
import "./App.css";
import {
  Paper,
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { ProductCard } from "./ProductCard.tsx";

export enum Source {
  Rozetka = "ROZETKA",
  Telemart = "TELEMART",
}

export interface IData {
  _id: string;
  title: string;
  type: string;
  specification?: string;
  description?: string;
  price: number;
  pfp: string;
  itemSource: Source;
  link: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

function App() {
  const [data, setData] = useState<IData[]>([]);
  const [dataUrl, setDataUrl] = useState<string>("Place your ulr");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [loadSource, setLoadSource] = useState<Source>(Source.Rozetka);
  const fetchAllData = async () => {
    return fetch("http://localhost:5000/goods")
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  };
  useEffect(() => {
    fetchAllData().then((data) => setData(data));
  }, []);
  const handleScrapeClick = () => {
    setLoading(true);
    fetch(
      `http://localhost:5000/goods/${
        loadSource === Source.Rozetka ? "rztk" : "telemart"
      }`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          goodsUrl: dataUrl,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  };
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoadSource((event.target as HTMLInputElement).value as Source);
  };
  return (
    <>
      <Container fixed>
        <Paper sx={{ padding: 2 }}>
          <Typography variant={"overline"} fontSize={24}>
            To add new items to the database, please, place valid rozetka or
            telemart catalog page url, for example:
            "https://telemart.ua/ua/laptops/apple/"
            <br />
            Sometimes loading time may be quite long (up to 2 minutes)
          </Typography>
        </Paper>
        <Paper sx={{ padding: 2 }}>
          <Box
            display={"flex"}
            gap={3}
            justifyContent={"center"}
            marginTop={2}
            marginBottom={2}
          >
            <Box>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Gender
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={loadSource}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="ROZETKA"
                    control={<Radio />}
                    label="Rozetka"
                  />
                  <FormControlLabel
                    value="TELEMART"
                    control={<Radio />}
                    label="Telemart"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Button variant={"contained"} onClick={handleScrapeClick}>
              {isLoading ? "Loading" : "Scrape catalog"}
            </Button>
            <TextField
              variant={"filled"}
              label={"Catalog URL"}
              value={dataUrl}
              onChange={(e) => setDataUrl(e.target.value)}
            ></TextField>
          </Box>
        </Paper>
        <Paper
          variant={"outlined"}
          sx={{
            padding: 0,
            display: "flex",
            flexWrap: "wrap",
            gap: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {data.map((item) => (
            <ProductCard key={item._id} dataItem={item} />
          ))}
        </Paper>
      </Container>
    </>
  );
}

export default App;
