import { BrowserRouter, Routes } from "react-router-dom";
import routes from "./routes/Routes";
import "./app.css"

export const App = () => {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          {routes}
        </Routes>
      </main>
    </BrowserRouter>
  )
}
