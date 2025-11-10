import BuyCredit from "./pages/BuyCredit";
import Home from "./pages/Home";
import Result from "./pages/Result";
import {Routes, Route} from 'react-router-dom';

const App = () => {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/result" element={<Result />} />
         <Route path="/buy" element={<BuyCredit />} />
      </Routes>
   );
};

export default App;
