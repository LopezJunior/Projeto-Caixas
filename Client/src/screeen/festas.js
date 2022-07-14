import React from 'react';
import {gql, useQuery, useMutation} from '@apollo/client'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';


const FESTA_QUERY = gql`
    query{
        getFestas{
            nome
            data
            id
        }
    }
`

const DELETE_FESTA = gql`
    mutation DeleteFesta($id:ID!){
        deleteFesta(id:$id){
            id
        }
    }
`
const Festa = () => {
    const renderFesta = (dados) => {
            return (
            <li>
                {dados.nome}
                </li>
        )}
    const {data, loading, error, refetch } = useQuery(FESTA_QUERY)
    
    const [ deleteFesta ] = useMutation(DELETE_FESTA)
    if(loading){
        return (<div>Carregando</div>)
    }


    return(
        <div>
            <Link to = '/'>
            <Button variant="contained" color="primary">
              Home
            </Button>
            </Link>
            <Link to = '/festaForm'>
            <Button variant="contained" color="secondary">
              Cadastrar Festa
            </Button>
            </Link>
            <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Data</TableCell>
            <TableCell align="right">Produtos</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.getFestas.map((row) => (
            <TableRow key={row.nome}>
              <TableCell component="th" scope="row">
                {row.nome}
              </TableCell>
              <TableCell align="right">{row.data}</TableCell>
              <TableCell align="right">0</TableCell>
              <TableCell align="right">
                <IconButton onClick = { () => {
                    deleteFesta({ variables: { id: row.id } }).then(() => { refetch() }).catch( error => { console.log(JSON.stringify(error)) } )
                        } }>
                        <DeleteIcon />
                        </IconButton > 
                        <Link to = "/festaProduto"><IconButton aria-label="lista" >
                    <AddShoppingCartIcon fontSize="inherit" />
                        </IconButton></Link>

              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 
        </div>
    )
}

export default Festa