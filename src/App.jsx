import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import CryptoImage from "./img/crypto-images.png";
import Form from "./components/Form";
import Response from "./components/Response";
import Spinner from "./components/Spinner";

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 50px;
  font-size: 34px;
  &&::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;
const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

function App() {
  const [currency, setCurrency] = useState({});
  const [results, setResults] = useState({});
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    if (!Object.keys(currency).length) {
      return;
    }
    const quoteCrypto = async () => {
      setSpinner(true);
      setResults({});
      const { currency: currencyCode, cryptoCurrency } = currency;
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currencyCode}`;
      const request = await fetch(url);
      const response = await request.json();
      setResults(response.DISPLAY[cryptoCurrency][currencyCode]);
      setSpinner(false);
    };
    quoteCrypto();
  }, [currency]);

  return (
    <Container>
      <Image src={CryptoImage} alt="crypto image" />
      <div>
        <Heading>Quote cryptocurrencies instantly</Heading>
        <Form setCurrency={setCurrency} />
        {results.PRICE && <Response results={results} />}
        {spinner && <Spinner />}
      </div>
    </Container>
  );
}

export default App;
