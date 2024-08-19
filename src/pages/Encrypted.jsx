import React from "react";
import { Link } from "react-router-dom";
import PaymentMethods from "../components/PaymentMethods";
import Prices from "../components/Prices";

function Encrypted() {
  return (
    <section className="w-full main-container flex items-center">
      {/* <PaymentMethods/> */}
      <Prices />
    </section>
  );
}

export default Encrypted;
