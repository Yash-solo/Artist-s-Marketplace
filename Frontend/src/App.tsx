import './App.css'
import Routing from './Routes/Routing'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './Componants/Navbar'
import { useEffect, useState } from 'react'

function App() {
  const [islogin, setlogin] = useState<boolean>(false);
  const [isloader, setIsLoader] = useState(false);
  const [navUserData, setuserData] = useState({
    name: "",
    avtar: "",
  })

  useEffect(() => {
    async function userLogin() {
      try {
        setIsLoader(true);
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
        } else {
          if (response.status === 401) {
            setlogin(false);
          }
        }
        setIsLoader(false);
      } catch (err: unknown) {
        console.log("We are in error block");
        if (err instanceof Error) {
          setIsLoader(false);
        } else {
          console.log(err)
          setIsLoader(false);
        }
      }

    }
    userLogin();
  }, [islogin])

  const loader = (
    <>
      <div className='w-full h-screen z-1000 fixed flex items-center justify-center bg-[rgba(255,255,255,0.3)] backdrop-blur-[20px]'>
        <div className='h-9 rotateloader w-9 border border-l-3 rounded-[50%] border-t-[#a6a6a6] border-r-[#9a9a9a] border-collapse]'></div>
      </div>
    </>
  )

  return (
    <>
      {isloader ? loader : ""}
      <BrowserRouter>
        <Navbar islogin={islogin} name={navUserData.name} avtar={navUserData.avtar} />
        <Routing />
      </BrowserRouter>
    </>
  )
}

export default App
