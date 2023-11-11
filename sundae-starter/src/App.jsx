import SummaryForm from "./pages/summary/SummaryForm";
import OrderEntry from "./pages/entry/OrderEntry";

function App() {
  return (
    <div>
      <h1>Sundaes on Demand</h1>
      <OrderEntry />
      <SummaryForm />
    </div>
  );
}

export default App;
