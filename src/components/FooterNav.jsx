import React from "react";
import { Link } from "react-router-dom";
function FooterNav() {
  return (
    <footer className="footer-nav">
      <Link to="/">Home</Link>
      <Link to="/history">History</Link>
      <Link to="/payment">Payment</Link>
    </footer>
  );
}
export default FooterNav;
