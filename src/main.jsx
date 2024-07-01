import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter ,RouterProvider } from 'react-router-dom'
import Twoplayer from './Components/Twoplayer/Twoplayer.jsx'
import Home from './Components/Home/Home.jsx'
import Computer from './Components/Computer/Computer.jsx'

const router= createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/Pass-N-Play',
        element:<Twoplayer/>
      },
      {
        path:'/Computer',
        element:<Computer/>
      },
      
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/> 
  </React.StrictMode>
)
