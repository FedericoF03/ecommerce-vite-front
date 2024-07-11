import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { AuthContext } from "../../context/AuthenticationContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { isAuth, isLoading } = user;
  const navigate = useNavigate();
  const [aprove, setAprove] = useState(false);
  console.log(user)
  useEffect(() => {
    if (!isLoading && !isAuth) navigate("/");
    else if (!isLoading && isAuth) setAprove(true);
  }, [isAuth, isLoading, navigate]);

  if (aprove) return <>{children}</>;
};

ProtectedRoute.propTypes = {
  children: PropTypes.object,
};

export default ProtectedRoute;
