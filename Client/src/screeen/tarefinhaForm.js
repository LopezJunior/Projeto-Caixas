import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { gql, useMutation} from '@apollo/client';
import { useHistory } from 'react-router-dom'

const CAD_PRODUTOS = gql`
    mutation AddProduto($nome: String!, $valor: Float, $imagem: String) {
        addProduto(
            nome: $nome
            valor: $valor
            imagem: $imagem
        ){
            nome
            valor
            imagem
        }
    }
`

const TarefinhaForm = () => {
    let history = useHistory();
    const classes = useStyles();
    const [addProduto] = useMutation(CAD_PRODUTOS)

    const [nome, setNome] = useState('')
    const [valor, setValor] = useState('')
    const [imagem, setImagem] = useState('')

    return (
        <div>
            <Link to = "/tarefinha">
                <Button variant="contained" color="secondary">
                    Voltar
                </Button>
            </Link>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField value={nome} onChange={e => setNome(e.target.value)} id="Produto" label="Produto" variant="outlined" />
                <TextField value={valor} onChange={e => setValor(e.target.value)} id="Valor" label="Valor" variant="outlined" />
                <TextField value={imagem} onChange={e => setImagem(e.target.value)} id="Imagem" label="Imagem" variant="outlined" />
                <Button onClick={() => {
                    addProduto({
                        variables: {
                            nome,
                            valor: parseFloat(valor),
                            imagem,
                        }
                    })
                    .then((res) => {
                        console.log('res', res);
                        history.goBack()
                        // alerta res.data.addProduto.nome Salvo com Sucesso
                    })
                }} variant="contained" color="secondary">
                    Salvar
                </Button>
            </form>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}))

export default TarefinhaForm