import { Navigate } from "react-router-dom";

const Home = () => {
  // Demomento se redirige a /menu pero en un futuro se puede hacer una página de bienvenida
  return (<Navigate to="/menu" replace />);
};

export default Home;
