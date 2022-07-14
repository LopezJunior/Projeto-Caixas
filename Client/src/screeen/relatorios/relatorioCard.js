import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";

const useStyles = makeStyles({
  table: {
    width: "120mm",
    borderCollapse: "unset",
  },
  cellPrint: {
    fontWeight: "bold",
    fontSize: "16px",
  },
  hora: {
    fontWeight: "bold",
    textAlign: "center",
  },
});

function createData(nome, valor, imagem) {
  return { nome, valor, imagem };
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0),

// ];
const renderRow = (row) => {
  console.log(Object.keys(row));

  return (
    <TableRow key={row.nome}>
      <TableCell
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          textAlign: "left",
          padding: 0,
          color: "black",
        }}
      >
        {row.nome}
      </TableCell>
      <TableCell
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          textAlign: "center",
          padding: 0,
          color: "black",
        }}
      >
        {row.valor.toFixed(2).replace(".", ",")}
      </TableCell>
      <TableCell
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          textAlign: "center",
          padding: 0,
          color: "black",
        }}
      >
        {row.qtde}
      </TableCell>
      <TableCell
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          textAlign: "right",
          padding: 0,
          color: "black",
        }}
      >
        R$ {row.total.toFixed(2).replace(".", ",")}
      </TableCell>
    </TableRow>
  );
};
//<TableCell align="right">{row.imagem}</TableCell>

const renderCell = (dados) => {
  return Object.keys(dados).map((cell) => {
    if (cell != "id" && cell != "__typename")
      return (
        <TableCell
          style={{ fontWeight: "bold", textAlign: "center", padding: 0 }}
        >
          {dados[cell]}
        </TableCell>
      );
  });
};
export default function SimpleTable(props) {
  const { data } = props;
  console.log("props", props.teste);
  const classes = useStyles();
  const [total, setTotal] = useState(0);
  const calculaTotal = (dados) => {
    console.log("dados", dados);
    let somaTotal = 0;
    dados.map((item) => {
      somaTotal = somaTotal + item.total;
    });
    setTotal(somaTotal);
  };
  useEffect(() => {
    calculaTotal(data);
  }, []);

  return (
    <>
      <style>
        {`@media print {
                  .total{
                    back-ground-color: black
                  },
                    .pagina{
                        font-size: 16px;
                        color: black;
                        width: 300mm; 
                        height: 50mm;
                        page-break-after: always;
                    }
                    .barraquinha{
                        text-align: center;
                        font-size: 20px;
                    }
                    .titulo{
                        text-align: center;
                        font-size: 35px;
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
                    }
                }`}
      </style>
      <div
        style={{
          fontSize: "25px",
          fontWeight: "bold",
          textAlign: "center",
          color: "black",
        }}
      >
        RELATÓRIO
      </div>
      <Table
        style={{
          padding: "10px",
          width: "110mm",
          borderCollapse: "unset",
          border: "1px solid black",
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                fontSize: "20px",
                color: "black",
                textAlign: "left",
                paddingLeft: 0,
              }}
            >
              Produto
            </TableCell>
            <TableCell style={{ fontSize: "20px", color: "black" }}>
              R${" "}
            </TableCell>
            <TableCell style={{ fontSize: "20px", color: "black" }}>
              Qtde
            </TableCell>
            <TableCell
              style={{ textAlign: "right", fontSize: "20px", color: "black" }}
            >
              Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => renderRow(row))}
          <TableRow>
            <TableCell></TableCell>
          </TableRow>
          <TableRow style={{ width: "80mm" }}>
            <TableCell
              className={"total"}
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                textAlign: "left",
                width: "40mm",
                padding: 0,
                margin: 0,
                color: "black",
              }}
            >
              Total:
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                textAlign: "right",
                width: "40mm",
                padding: 0,
                margin: 0,
                color: "black",
              }}
            >
              R${total.toFixed(2).replace(".", ",")}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div style={{ textAlign: "center", fontSize: "18px", color: "black" }}>
        Barraquinhas de Santo Antônio
      </div>
      <div
        style={{ textAlign: "center", color: "black", fontSize: "16px" }}
        className="hora"
      >
        {moment().format("DD/MM/YYYY HH:mm:ss ")}
      </div>
    </>
  );
}
