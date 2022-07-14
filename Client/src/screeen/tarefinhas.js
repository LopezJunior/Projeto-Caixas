import React from 'react'
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import SimpleTable from '../componentes/tabela'

const TAREFINHA_QUERY = gql`
    query{
       getProdutos{
            id,
            nome,
            valor,
            imagem
        }
    }
`

function Tarefinha(){
    const {data, loading, error} = useQuery(TAREFINHA_QUERY)
    console.log(data)

    if (loading){
        return <div>Carregando</div>
    }
    return (
        <>
            <div>
                <Link to = '/'>
                    <Button variant="contained" color="secondary">
                        Home
                    </Button>
                </Link>
                <Link to = '/tarefinhaForm'>
                    <Button variant="contained" color="secondary">
                        Cadastro de Produtos
                    </Button>
                </Link>
            </div>
            
            <SimpleTable data={data.getProdutos} />
        </>
    )
}

export default Tarefinha