import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import SimpleTable from '../componentes/tabela'

const PRODUTOS_QUERY = gql`
  query{
    getProdutos{
      id
      nome
      valor
      imagem
    }
  }
`

function Produto() {
  const {data, loading, error} = useQuery(PRODUTOS_QUERY)
  console.log(data)
  
 

  if(loading){
    return <div>carregando</div>
  }
  return (
    <>
        <div>
        <Link to = "/">
            <Button variant="contained" color="primary">
            Home
            </Button>
        </Link>
        <Link to = "/produtoform">
            <Button variant="contained" color="primary">
            Cadastro de Produto
            </Button>
        </Link>
    </div>
  
<SimpleTable data={data.getProdutos} teste="testando"/>
    
    </>
  );
 
}

export default Produto;
