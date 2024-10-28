import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <>
      <h1>Ez a weboldal nem létezik...</h1>
      <Link to="/">A linkre kattintva térhetsz vissza a főoldalra!</Link>
    </>
  );
}

export default ErrorPage;
