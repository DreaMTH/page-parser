import { IData } from "./App.tsx";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";

type Props = {
  dataItem: IData
}
export const ProductCard = ({ dataItem }: Props) => {
  const [hovered, setHovered] = useState<boolean>(false)
  return (
    <a href={ dataItem.link } target={ '_blank' }>
      <Box>
        <Card id={ dataItem._id } sx={ {
          width: 250,
          margin: 0,
          height: hovered ? 'auto' : 350,
        } } onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
          <CardContent
            sx={ { justifyContent: 'center', alignItems: 'center' } }>
            <Typography>
              { dataItem.title ?? ' asd' }
            </Typography>
            <Typography>
              { dataItem.type }
            </Typography>
            <img src={ dataItem.pfp } alt={ dataItem.type } height={ '150vh' }
                 width={ '150vw' }
                 sizes={ 'filled' } style={ {
              margin: 'auto', display: 'block', objectFit: 'cover'
            } }/>
            <Typography>
              { dataItem.price }₴
            </Typography>
            { dataItem.description &&
                <Typography>
                  { hovered ? dataItem.description : dataItem.description.slice(
                    0, 50) + '...' }
                </Typography>
            }
            <br />
            {dataItem.specification &&
                <Typography>
                  { hovered ? dataItem.specification : dataItem.specification.slice(
                    0, 50) + '...' }
                </Typography>
            }
          </CardContent>
        </Card>
      </Box>
    </a>
  )
}