import ReactDOM from "react-dom";
import Pet from "./Pet";

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
