import ReactDOM from "react-dom";
import Pet from "./Pet";

// const App = () => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", { id: "my-brand" }, "Adopt Me"),
//     React.createElement(Pet, {
//       name: "TobyBoy",
//       animal: "Dog",
//       breed: "Pit Bull/Shepherd",
//     }),
//     React.createElement(Pet, {
//       name: "Junior",
//       animal: "Dog",
//       breed: "Golden Retriever",
//     }),
//     React.createElement(Pet, { name: "Wormy", animal: "Dog", breed: "Heeler" }),
//     React.createElement(Pet, {
//       name: "Lola",
//       animal: "Dog",
//       breed: "Lab/Shepherd",
//     }),
//     React.createElement(Pet, {
//       name: "Bear-Bear",
//       animal: "Dog",
//       breed: "Corgi",
//     }),
//   ]);
// };

const App = () => {
  return (
    <div>
      <h1>Adopt Me</h1>
      <Pet name="TobyBoy" animal="dog" breed="Pit Bull/Shepherd" />
      <Pet name="Lola" animal="dog" breed="Lab/Shepherd" />
      <Pet name="Worm" animal="dog" breed="Heeler" />
      <Pet name="BearBear" animal="dog" breed="Corgi" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
