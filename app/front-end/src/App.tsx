import PastaSoTastyProvider from './context/provider';
import RoutesPastaSoTasty from './helpers/routes';
import './styles/app.css';



function App() {
  return (
    <PastaSoTastyProvider>
      <RoutesPastaSoTasty />
    </PastaSoTastyProvider>
  );
}

export default App;
