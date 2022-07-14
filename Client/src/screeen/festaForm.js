import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { gql, useMutation} from '@apollo/client';
import { useHistory } from 'react-router-dom'

const ADD_FESTA = gql`
    mutation AddFesta($nome: String!, $data: String!) {
        addFesta (
            nome: $nome
            data: $data
        ){
            nome,
            data,
        }
    }
`

const FestaForm = () => {
    let history = useHistory();
    const classes = useStyles();
    const [addFesta] = useMutation(ADD_FESTA);

    const[nome, setNome] = useState('');
    const[data, setData] = useState('');

    return (
        <div>
            <Link to = "/festa">
            <Button variant="contained" color="secondary">
            Voltar
            </Button>
            </Link>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField value={nome} onChange={e => setNome(e.target.value)} id="Festa" label="Festa" variant="outlined" />
                <TextField value={data} onChange={e => setData(e.target.value)} id="Data" label="Data" variant="outlined" />
                <Button onClick={() => {
                    addFesta({
                        variables : {
                            nome,
                            data,
                        }
                    })
                    .then((res) => {
                        console.log('res', res);
                        history.goBack()
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
        }
    }
}))

export default FestaForm