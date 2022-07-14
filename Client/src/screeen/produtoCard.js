import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '../componentes/card';
import { gql, useQuery, useMutation } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';



const PRODUTO_QUERY = gql`
    query{
        getProdutos{
            id
            nome
            imagem
            valor
        }
    }
   
`
const DELETE_PRODUTO = gql`
    mutation DeleteProduto($id:ID!){
        deleteProduto(
            id: $id

        ) {
            nome
        }
    }    
`
const SUB_PRODUTO = gql `
subscription {
    produtoAdicionado{
        id
            nome
            imagem
            valor
    } 
}
`

const ProdutoCard = () => {
    const { data, loading, error, subscribeToMore } = useQuery(PRODUTO_QUERY)
    const [deleteProduto] = useMutation(DELETE_PRODUTO)
        
    
    useEffect(()=> {
        subscribeToMore({
            document: SUB_PRODUTO,
            variables: {},
            updateQuery: (prev, {subscriptionData}) =>{
                const novoProduto = subscriptionData.data.produtoAdicionado
                return Object.assign({}, prev, {
                    getProdutos: [novoProduto, ...prev.getProdutos]
                })
            }
        }) 
    }, []) 
    
    if (loading){
        return (<CircularProgress color="secondary" />
     )
}
    

    return (
    <>
    <Link to='/'>
        <Button variant="contained" color="primary">      
            Home
        </Button>
    </Link>
    <Grid container spacing={1}>
    {data.getProdutos.map(item => {
        return (
        
            <Grid item xs={1} sm={3}>
        <Card dados={item} onClick= {() => {
            deleteProduto({variables: {id:item.id}}) 
        } }/>
    </Grid>
        )
    } )}
      </Grid>
      
        </>
    )
}

export default ProdutoCard