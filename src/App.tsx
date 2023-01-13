import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from "./Pages/Login"
import Home from './Pages/Home'
import Register from './Pages/Register'
import { store } from './App/store'
import { Provider } from 'react-redux'

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
