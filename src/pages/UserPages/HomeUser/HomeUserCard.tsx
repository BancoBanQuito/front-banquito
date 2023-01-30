import React from "react";

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  CardMedia,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

interface HomeUserCardProps {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  isLogged: boolean;
}

export const HomeUserCard = (props: HomeUserCardProps) => {
  const { title, description, imageUrl, url, isLogged } = props;
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        cursor: "pointer",
      }}
      onClick={() => isLogged ? navigate(url) : navigate("/usuario/login")}
    >
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        sx={{
          height: "140px",
          width: "100%",
        }}
      />
      <CardContent
        sx={{
          flex: 1,
          textAlign: "center",
        }}
      >
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: "center",
        }}
      >
        <Button component={Link} size="small" to={url}>
          Ir
        </Button>
      </CardActions>
    </Card>
  );
};
