// import { useState } from "react";
import AddCabin from "../features/cabins/AddCabin";
import CabinTable from "../features/cabins/CabinTable";
import CabinTableOprations from "../features/cabins/CabinTableOprations";
// import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOprations />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
