import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { currencies } from "../data/currencies";
import useSelect from "../hooks/useSelect";
import Error from "./Error";

const SubmitInput = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 30px;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const Form = ({ setCurrency }) => {
  const [cryptos, setCryptos] = useState([]);
  const [error, setError] = useState(false);
  const [currency, SelectCurrency] = useSelect(
    "Select the currency",
    currencies
  );
  const [cryptoCurrency, SelectCryptoCurrency] = useSelect(
    "Select the cryptocurrency",
    cryptos
  );

  useEffect(() => {
    const getCryptos = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const response = await fetch(url);
      const result = await response.json();
      const arrayCryptos = result.Data.map(({ CoinInfo }) => ({
        id: CoinInfo.Name,
        name: CoinInfo.FullName,
      }));
      setCryptos(arrayCryptos);
    };
    getCryptos();
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    if ([cryptos, currency].includes("")) {
      setError(true);
      return;
    }
    setError(false);
    setCurrency({ cryptoCurrency, currency });
  };
  return (
    <>
      {error && <Error>All fields are required</Error>}

      <form onSubmit={handleForm}>
        <SelectCurrency />
        <SelectCryptoCurrency />
        <SubmitInput type="submit" value="Quote" />
      </form>
    </>
  );
};

export default Form;
