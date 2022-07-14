import React, { useContext } from "react";
import { makeStyles, responsiveFontSizes } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
// import CardActions from "@material-ui/core/CardActions";
// import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/Delete";
// import IconButton from "@material-ui/core/IconButton";
// import EditIcon from "@material-ui/icons/Edit";
// import AddIcon from "@material-ui/icons/Add";
// import RemoveIcon from "@material-ui/icons/Remove";
// import { grey } from "@material-ui/core/colors";
// import TextField from "@material-ui/core/TextField";
// import { useState } from "react";
// import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  card: {
    padding: 4,
    color: "white",
    fontSize: 16,
    backgroundColor: "black",
    fontWeight: "bold",
    // border: "2px solid #696969",
  },
  nome: {
    textAlign: "center",
  },
  valores: {
    paddingLeft: 3,
    textAlign: "right",
  },
  total: {
    textAlign: "right",
    fontWeight: "bold",
  },
  titulo: {
    marginBottom: 0,
    fontSize: 16,
    fontWeight: 600,
    color: "black",
  },
  adicionar: {},
});

export default function CardTotal(props) {
  const { dados, info, title } = props;

  const classes = useStyles();

  return (
    <Card
    // className={classes["card"]}
    >
      <CardActionArea>
        <CardContent className={classes.card}>
          <Grid container>
            <Grid item xs={12} className={classes.nome}>
              {title}: R$ {dados && dados.toFixed(2)}
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
