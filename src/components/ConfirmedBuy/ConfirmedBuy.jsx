import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmedBuy = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => navigate("/"), 5000);
  }, [navigate]);

  return <div>Confirmed</div>;
};

export default ConfirmedBuy;
