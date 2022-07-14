import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/client';
import client from './client';
import Festa from './screeen/festas'
import Relatorio from "./screeen/relatorios/relatorio"
import FestaForm from './screeen/festaForm'
import Produto from './screeen/produtos'
import ProdutoForm from './screeen/produtoForm'
import Tarefinha from './screeen/tarefinhas'
import FestaProduto from './screeen/festaProduto'
import TarefinhaForm from './screeen/tarefinhaForm'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import ProdutoCard from './screeen/produtoCard'
import Venda from './screeen/venda'
import GlobalStyle from './styles/global'
import { VendaProvider } from './context/venda'


ReactDOM.render(
  <React.StrictMode>
     <ApolloProvider client={client}>
       <GlobalStyle/>
       <BrowserRouter>
       <Switch>
    <Route path = "/" exact = {true} component = {App} /> 
    <Route path = "/festaProduto" component = {FestaProduto} />
    <Route path = "/festa" component = {Festa} />
    <Route path = "/festaForm" component = {FestaForm} />
    <Route path = "/produto" component = {Produto} /> 
    <Route path ="/produtoform" component = {ProdutoForm}/> 
    <Route path ="/tarefinha" component = {Tarefinha}/>
    <Route path ="/tarefinhaform" component = {TarefinhaForm}/>
    <Route path ="/relatorio" component = {Relatorio}/>
    <Route path ="/produtoCard" component = {ProdutoCard}/>
    <VendaProvider>
      <Route path ="/venda" component = {Venda}/> 
    </VendaProvider>

       </Switch>
    </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
