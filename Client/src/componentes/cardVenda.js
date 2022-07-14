import React, { useContext, useEffect } from "react";
import { makeStyles, responsiveFontSizes } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import DeleteIcon from "@material-ui/icons/Delete";
// import { grey } from "@material-ui/core/colors";
// import EditIcon from "@material-ui/icons/Edit";
// import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import VendaContext from "../context/venda";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },

  media: {
    backgroundSize: "contain",
    height: 100,
  },
  value: {
    color: "gray",
    textAlign: "center",
  },
  button: {
    padding: 10,
  },
  card: {
    padding: 1,
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "azure",
  },
  cardSelecionado: {
    border: "3px solid black",
    padding: 1,
    color: "black",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "azure",
  },
  titulo: {
    marginBottom: 0,
    fontSize: 16,
    fontWeight: 600,
    color: "black",
  },
  adicionar: {},
});

export default function CardVenda(props) {
  const { dados, onClick, callBack } = props;
  const { zerar } = useContext(VendaContext);
  const classes = useStyles();
  const [quantidade, setQuantidade] = useState(0);
  const img = require(`../assets/Icones/${dados.nome}.png`);
  const alteraQuantidade = (valor) => {
    setQuantidade(valor);
    callBack({
      id: dados.id,
      nome: dados.nome,
      valor: dados.valor,
      quantidade: valor,
    });
  };

  if (zerar && quantidade) {
    setQuantidade(0);
  }

  return (
    <Card className={classes[quantidade ? "cardSelecionado" : "card"]}>
      <CardActionArea>
        <CardMedia
          onClick={() => {
            alteraQuantidade(quantidade + 1);
          }}
          className={classes.media}
          image={img}
          title="Produto"
        />
        <CardContent
          onClick={() => {
            alteraQuantidade(quantidade + 1);
          }}
          className={classes.card}
        >
          <Typography
            className={classes.titulo}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {dados.nome.toUpperCase()}
          </Typography>
          <Typography className={classes.value} variant="body2" component="p">
            R$ {dados.valor && dados.valor.toFixed(2)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton
          key={1}
          className={classes.button}
          aria-label="delete"
          onClick={() => {
            if (quantidade > 0) alteraQuantidade(quantidade - 1);
          }}
          disabled={!quantidade}
        >
          <RemoveIcon />
        </IconButton>
        <TextField
          className={classes.value}
          id="standard-number"
          label={"Qdte"}
          // type="number"
          min={0}
          value={quantidade}
          onChange={(e) => {
            alteraQuantidade(e.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            className: classes.value,
          }}
        />
        <IconButton
          key={2}
          className={classes.button}
          aria-label="edit"
          onClick={() => {
            alteraQuantidade(0);
          }}
          disabled={!quantidade}
        >
          <DeleteForeverIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
