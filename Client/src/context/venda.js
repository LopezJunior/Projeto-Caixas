import React, { createContext, useState, useEffect } from "react";

const VendaContext = createContext({});

export const VendaProvider = ({ children }) => {
  const [venda, setVenda] = useState();
  const [zerar, setZerar] = useState(false)
  const [loadingContext, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false)
  },[])

  function zerarVenda(props) {
    const { reset } = props
    if (reset != zerar) setZerar(reset)
  }

  return (
    <VendaContext.Provider
      value={{ loadingContext, venda, zerar, zerarVenda }}
    >
      {children}
    </VendaContext.Provider>
  );
};

export default VendaContext;
