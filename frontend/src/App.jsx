import { BrowserRouter, Routes } from "react-router-dom";
import routes from "./routes/Routes";
import "./app.css"
import { Task } from "./components/Task";

export const App = () => {
  return (

    <BrowserRouter>
      <main>
        <Routes>
          {routes}
        </Routes>
    <Task />
      </main>
    </BrowserRouter>
  )
}
