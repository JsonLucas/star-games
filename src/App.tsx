import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<></>} />
        <Route path='/sign-up' element={<></>} />
        <Route path='/home' element={<></>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App