import './App.css'
import Routing from './Routes/Routing'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './Componants/Navbar'
import { useEffect, useState } from 'react'

function App() {
  const [islogin, setlogin] = useState<boolean>(false);
  const [navUserData, setuserData] = useState({
    name: "",
    avtar: "",
  })
  useEffect(() => {
    async function userLogin() {
      try {
        const response = await fetch("http://localhost:3000/Profile", {
          method: "GET",
          credentials: "include"
        });
        if (response.ok) {
          const data = await response.json();
          if (data.user.role === "buyer" || data.user.role === "artist") {
            setlogin(true);
            setuserData({ name: data.user.name, avtar: data.user.avatar });
          }
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log("There is an error :- ", err)
        }
      }

      setlogin(true);
    }
    userLogin();
  }, [])

  return (
    <>
      <BrowserRouter>
        <Navbar islogin={islogin} name={navUserData.name} avtar={navUserData.avtar} />
        <Routing />
      </BrowserRouter>
    </>
  )
}

export default App
