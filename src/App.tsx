import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import ProtectedRoute from "./Components/ProtectedRoute";
import { store } from "./App/store";
import { Provider } from "react-redux";

function App() {
   return (
      <Provider store={store}>
         <Router>
            <Routes>
               <Route path="/" element={<Login />} />
               <Route
                  path="/home"
                  element={
                     <ProtectedRoute>
                        <Home />
                     </ProtectedRoute>
                  }
               />
               <Route path="/register" element={<Register />} />
            </Routes>
         </Router>
      </Provider>
   );
}

export default App;
