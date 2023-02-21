import "../styles/spinner.css";

const Spinner = () => {
  return (
    <div className="container">
      <div className="loader">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </div>
  );
};

export default Spinner;
