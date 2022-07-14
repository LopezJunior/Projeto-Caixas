import React from "react";
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
    padding: 2,
    color: "white",
    fontSize: 13,
    backgroundColor: "black",
    fontWeight: "bold",
  },
  nome: {
    textAlign: "left",
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
  cardProduto: {
    padding: 2,
    color: "black",
    fontSize: 15,
    backgroundColor: "white",
    marginBottom: 2,
  },
});

export default function CardCarrinho(props) {
  const { dados, info } = props;
  const classes = useStyles();

  return (
    <Card className={classes[info ? "card" : "cardProduto"]}>
      <CardActionArea>
        <CardContent className={classes[info ? "card" : "cardProduto"]}>
          <Grid container>
            <Grid item xs={6} className={classes.nome}>
              {dados.nome.toUpperCase()}
            </Grid>
            <Grid item xs={2} className={classes.valores}>
              {info ? dados.valor : dados.valor.toFixed(2)}
            </Grid>
            <Grid item xs={2} className={classes.valores}>
              {dados.quantidade}
            </Grid>
            <Grid item xs={2} className={(classes.valores, classes.total)}>
              {info ? dados.total : (dados.quantidade * dados.valor).toFixed(2)}
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
