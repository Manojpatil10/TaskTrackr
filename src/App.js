import "./App.css";
import LoginPage from "./Components/LoginPage/LoginPage";
import SignUpPage from "./Components/SignUpPage/SignUpPage";
import ForgetPasswordPage from "./Components/ForgetPassword/ForgetPasswordPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminPage from "./Components/AdminPage/AdminPage";
import UserPage from "./Components/UserPage/UserPage";



function App() {
  const myRouter = createBrowserRouter([
    {
      path:'/',
      element:<LoginPage/> 
    },
    {
      path:'/SignUp',
      element:<SignUpPage/>
    },
    {
      path:'/ForgetPass',
      element:<ForgetPasswordPage/>
    },
    {
      path:'/user/:id',
      element:<UserPage/>
    },
    {
      path:'/admin',
      element:<AdminPage/>
    }
  ],{basename:"/TaskTrackr"})



  return (
    <>
      <RouterProvider router={myRouter}>

      </RouterProvider>      
    </>
  );
}

export default App;
