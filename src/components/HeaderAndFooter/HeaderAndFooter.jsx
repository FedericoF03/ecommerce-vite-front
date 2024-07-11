import { PropTypes } from "prop-types";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const HeaderAndFooter = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

HeaderAndFooter.propTypes = {
  children: PropTypes.object,
};

export default HeaderAndFooter;
