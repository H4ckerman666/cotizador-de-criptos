import styled from "@emotion/styled";

const Result = styled.div`
  color: #fff;
  font-family: "Lato", sans-serif;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 30px;
`;
const Image = styled.img`
  display: block;
  width: 120px;
`;
const Text = styled.div`
  font-size: 18px;
  span {
    font-weight: 400;
  }
`;
const Price = styled.div`
  font-size: 24px;
  span {
    font-weight: 700;
  }
`;
const Response = ({ results }) => {
  const {
    PRICE: price,
    HIGHDAY: highDay,
    LOWDAY: lowDay,
    IMAGEURL: imageUrl,
    LASTUPDATE: lastUpdate,
    CHANGEPCT24HOUR: dayChanges,
  } = results;
  return (
    <Result>
      <Image
        src={`https://cryptocompare.com/${imageUrl}`}
        alt="crypto-image"
      ></Image>
      <div>
        <Price>
          Current price: <span>{price}</span>
        </Price>
        <Text>
          Highest price of the day: <span>{highDay}</span>
        </Text>
        <Text>
          Lowest price of the day: <span>{lowDay}</span>
        </Text>
        <Text>
          Changes of the day: <span>{dayChanges}</span>
        </Text>
        <Text>
          Last update: <span>{lastUpdate}</span>
        </Text>
      </div>
    </Result>
  );
};

export default Response;
