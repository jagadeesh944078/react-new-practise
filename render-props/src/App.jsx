import "./App.css";
import Input from "./Input";

function App() {
  const showValue = (value) => (
    <>
      <b>The Value is {value}</b>
    </>
  );
  const multipledValue = (value) => <>THe multipled value {value * 10}</>;
  return (
    <div>
      <Input renderTextBelow={showValue} />
      <br />
      <Input renderTextBelow={multipledValue} />
    </div>
  );
}

export default App;
