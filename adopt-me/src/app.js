import React from "react";
import ReactDOM from "react-dom";
import Pet from "./Pet";

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", { id: "my-brand" }, "Adopt Me"),
    React.createElement(Pet, {
      name: "TobyBoy",
      animal: "Dog",
      breed: "Pit Bull/Shepherd",
    }),
    React.createElement(Pet, {
      name: "Junior",
      animal: "Dog",
      breed: "Golden Retriever",
    }),
    React.createElement(Pet, { name: "Wormy", animal: "Dog", breed: "Heeler" }),
    React.createElement(Pet, {
      name: "Lola",
      animal: "Dog",
      breed: "Lab/Shepherd",
    }),
    React.createElement(Pet, {
      name: "Bear-Bear",
      animal: "Dog",
      breed: "Corgi",
    }),
  ]);
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
