import React from "react";
import { makeStyles, responsiveFontSizes } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 150,
    width: 150,
  },
  card: {
    width: 150,
    backgroundColor: "pink",
  },
  titule: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default function CardItem(props) {
  const { dados, onClick } = props;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQrGG6xXblTEto_5j6laC3fZG__gEWy4wDPXQ&usqp=CAU"
          title="Smile"
        />
        <CardContent>
          <Typography
            className={classes.titule}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {dados.nome}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            R$ {dados.valor && dados.valor.toFixed(2)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton aria-label="delete" onClick={onClick}>
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
