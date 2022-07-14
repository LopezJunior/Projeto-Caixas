import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Card from "../componentes/cardVenda";
import { gql, useQuery, useMutation } from "@apollo/client";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import CardCarrinho from "../componentes/cardCarrinho";
import CardTotal from "../componentes/cardTotal";
import VendaContext from "../context/venda";
import "../styles/cardVenda.css";
import moment from "moment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FilledInput from "@material-ui/core/FilledInput";
import InputAdornment from "@material-ui/core/InputAdornment";

const PRODUTO_QUERY = gql`
  query {
    getProdutos {
      id
      nome
      imagem
      valor
    }
  }
`;
const ADD_VENDA_QUERY = gql`
  mutation AddVeda(
    $festa: String!
    $data: String!
    $produto: String
    $valor: Float
    $quantidade: Float!
  ) {
    addVenda(
      festa: $festa
      data: $data
      produto: $produto
      valor: $valor
      quantidade: $quantidade
    ) {
      id
    }
  }
`;
const SUB_PRODUTO = gql`
  subscription {
    produtoAdicionado {
      id
      nome
      imagem
      valor
    }
  }
`;
// Hook
function useKeyPress(targetKey) {
  // State for keeping track of whether key is pressed
  const { zerarVenda } = useContext(VendaContext);
  const [keyPressed, setKeyPressed] = useState(false);
  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  if (keyPressed) {
  }

  return keyPressed;
}

const Venda = () => {
  const { data, loading, error, subscribeToMore, refetch } =
    useQuery(PRODUTO_QUERY);
  const { loadingContext, zerarVenda } = useContext(VendaContext);
  const [addVenda] = useMutation(ADD_VENDA_QUERY);
  const [lista, setLista] = useState([]);
  const [total, setTotal] = useState(0);
  const [primeiraVenda, setPrimeiraVenda] = useState(true);
  const vender = useKeyPress("Enter");
  const [mostraTroco, setMostraTroco] = useState(false);
  const [valorPago, setValorPago] = useState();
  const [valorTroco, setValorTroco] = useState(0);
  const [isEditing, setEditing] = useState(false);
  const inputRef = useRef(null);

  // Add event listeners
  useEffect(() => {
    if (isEditing && mostraTroco) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    if (vender) {
      toggleEditing();
      if (!isEditing) return;
      var content = document.getElementById("teste");
      var pri = document.getElementById("ifmcontentstoprint").contentWindow;
      pri.document.open();
      pri.document.write(content.innerHTML);
      pri.document.close();
      pri.focus();
      pri.print();

      lista.map((produto) => {
        addVenda({
          variables: {
            festa: "1",
            data: moment().format("DD/MM/YYYY HH:mm:ss "),
            produto: produto.id.toString(),
            valor: produto.valor,
            quantidade: produto.quantidade,
          },
        });
      });

      setPrimeiraVenda(false);
      setLista([]);
      setValorPago();
      zerarVenda({
        reset: true,
      });
    }
  }, [vender]);

  useEffect(() => {
    let soma = 0;
    lista.map((item) => {
      soma = soma + item.quantidade * item.valor;
    });
    setTotal(soma);
    console.log("primeiraVenda", primeiraVenda);
    if (!primeiraVenda && lista.length == 0) {
      zerarVenda({
        reset: false,
      });
    }
  }, [lista]);
  useEffect(() => {
    refetch();
    subscribeToMore({
      document: SUB_PRODUTO,
      variables: {},
      updateQuery: (prev, { subscriptionData }) => {
        const novoProduto = subscriptionData.data.produtoAdicionado;
        return Object.assign({}, prev, {
          getProdutos: [novoProduto, ...prev.getProdutos],
        });
      },
    });
  }, []);

  const toggleEditing = () => {
    setEditing(!isEditing);
  };

  const calculaTroco = (valor) => {
    setValorPago(valor);
    setValorTroco(valor - total);
  };

  const carrinho = (newProduto) => {
    setValorTroco(0);
    setValorPago("");
    if (lista.length) {
      const jaExiste = lista.find((item) => item.nome == newProduto.nome);

      jaExiste
        ? newProduto.quantidade
          ? setLista(
              lista.map((item) =>
                item.nome == newProduto.nome ? newProduto : item
              )
            )
          : setLista(lista.filter((item) => item.nome != newProduto.nome))
        : setLista([...lista, newProduto]);
    } else {
      if (newProduto.quantidade) setLista([newProduto]);
    }
  };
  if (loading) {
    return <CircularProgress color="secondary" />;
  }
  if (loadingContext) {
    return <div>Carregando</div>;
  }

  return (
    <>
      <div>
        <div style={{ height: "100%" }}>
          <Grid container>
            <Grid container spacing={1} xs={9}>
              {data.getProdutos.map((item, idx) => {
                return (
                  <Grid item xs={1} sm={2}>
                    <Card
                      key={idx}
                      dados={item}
                      onClick={() => {}}
                      callBack={(produto) => carrinho(produto)}
                    />
                  </Grid>
                );
              })}
            </Grid>
            <Grid item xs={3}>
              <div id="teste" className="principal" style={{ display: "none" }}>
                <style>
                  {`@media print {
                    .pagina{
                        font-size: 10px;
                        width: 65mm;
                        page-break-after: always;
                        padding-top: 9px;
                        padding-bottom: 9px;
                      }
                      .barraquinha{
                        text-align: center;
                        font-size: 20px;
                      }
                      .titulo{
                        text-align: center;
                        font-size: 30px;
                        border: 1px solid black;
                        border-bottom-width: 0px;
                        font-weight: bold;
                        
                    }
                    .preco{
                        text-align: center;
                        font-size: 30px;
                        border: 1px solid black;
                        border-top-width: 0px;
                        font-weight: bold;
                    }
                    .descricao{
                        text-align: center;
                        font-size: 20px;
                    }
                    .hora{
                        text-align: center;
                        font-size: 12px;
                        margin-bottom: 100px ;
                    }
                }`}
                </style>
                {lista.map((item) => {
                  let itens = [];
                  if (item.quantidade > 1) {
                    for (let index = 1; index <= item.quantidade; index++) {
                      itens.push(
                        <div className="pagina">
                          <div className="barraquinha">Festa</div>
                          <div className="titulo">
                            {item.nome.toUpperCase()}
                          </div>
                          <div className="preco">
                            R$ {item.valor.toFixed(2).replace(".", ",")}
                          </div>
                          <div className="descricao">
                            Paróquia Santo Antônio
                          </div>
                          <div className="descricao">Imbituva - Pr</div>
                          <div className="hora">
                            {moment().format("DD/MM/YYYY HH:mm:ss ")}
                          </div>
                        </div>
                      );
                    }
                  } else {
                    itens.push(
                      <div className="pagina">
                        <div className="barraquinha">
                          Jantar de Santo Antônio
                        </div>
                        <div className="titulo">{item.nome.toUpperCase()}</div>
                        <div className="preco">
                          R$ {item.valor.toFixed(2).replace(".", ",")}
                        </div>
                        <div className="descricao">Paróquia Santo Antônio</div>
                        <div className="descricao">Imbituva - Pr</div>
                        <div className="hora">
                          {moment().format("DD/MM/YYYY HH:mm:ss ")}
                        </div>
                      </div>
                    );
                  }
                  console.log("itens", itens);
                  return itens;
                })}
              </div>
              <div style={{ height: "100%" }}>
                <CardCarrinho
                  info
                  dados={{
                    nome: "Nome",
                    valor: "R$",
                    quantidade: "Qtde",
                    total: "Total",
                  }}
                />
                {lista &&
                  lista.map((produto) => <CardCarrinho dados={produto} />)}
              </div>
              <CardTotal title="Total" dados={total} />
              {mostraTroco ? (
                <div>
                  <FormControl fullWidth variant="filled">
                    <div
                      style={{
                        fontSize: 18,
                        textAlign: "center",
                        color: "rgba(0, 0, 0, 0.7) ",
                      }}
                    >
                      Valor recebido
                    </div>
                    <input
                      value={valorPago}
                      onChange={(e) => calculaTroco(e.target.value)}
                      ref={inputRef}
                      style={{
                        border: "1 solid black",
                        fontSize: 18,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    />
                  </FormControl>

                  <CardTotal title="Troco" dados={valorTroco} />
                </div>
              ) : null}
            </Grid>
          </Grid>
        </div>
      </div>
      <FormControlLabel
        control={
          <Checkbox
            checked={mostraTroco}
            onChange={() => setMostraTroco(!mostraTroco)}
            name="checkedB"
            color="primary"
          />
        }
        label="Mostrar Troco"
      />
    </>
  );
};

export default Venda;
