import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(nome, valor, imagem) {
  return { nome, valor, imagem };
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0),

// ];
const renderRow = (row) => {
console.log(Object.keys(row))

    return(<TableRow key={row.nome}>
        {renderCell(row)}
        
      </TableRow>)
}
//<TableCell align="right">{row.imagem}</TableCell>

const renderCell =(dados) =>{
    return(
        Object.keys(dados).map(cell =>{
            if(cell != "id" && cell != "__typename" )
            return (<TableCell>{dados[cell]}</TableCell>)
        })
    )
   
}
export default function SimpleTable(props) {
    const {data} = props
    console.log('props',props.teste)
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Produto</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>imagem</TableCell>
       
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
              renderRow(row)
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

