    import React, { useEffect } from 'react'
import { gql, useQuery } from '@apollo/client';
import {
    BrowserRouter as Router,
    useRouteMatch
  } from "react-router-dom";
import Button from '@material-ui/core/Button';
import SimpleTable from './relatorioCard'

const RELATORIO_QUERY = gql`
    query{
       getVendas{
            nome,
            valor,
            qtde,
            total,
        }
    }
`

function Relatorio(){
    const {data, loading, error, refetch} = useQuery(RELATORIO_QUERY, { 
        fetchPolicy:"no-cache"
     })
    let { path, url } = useRouteMatch();
    useEffect(() => {
        refetch()  
    }, [url]);

    if (loading){
        return <div>Carregando...</div>
    }
    return (
        <>
        
            
            <div className={ "hid" } style={{ width: "420px", height: "50px", fontSize: "16px" }} >

            <SimpleTable className={"pagina"} impressao data={data.getVendas} />
            </div>
        </>
    )
}

export default Relatorio