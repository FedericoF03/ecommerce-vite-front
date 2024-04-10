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
  children: PropTypes.element
};

export default HeaderAndFooter;
