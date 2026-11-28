import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface propsData {
    islogin: boolean,
    name: string,
    avtar: string,
}
const Navbar = (props: propsData) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    useEffect(() => {
        console.log("Hello world:-  islogin:- ", props.islogin);
    }, [props.islogin])
    const loginBtn = (
        <>
            <button onClick={() => navigate("/signup")}
                className="text-sm font-medium text-stone-600 hover:text-stone-900">
                Join as Artist
            </button>
            <button onClick={() => navigate("/signin")}
                className="bg-stone-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-stone-800">
                Login
            </button>
        </>
    )
    const loginforMObile = (
        <>
            <button
                onClick={() => {
                    navigate("/signup");
                    setIsMenuOpen(false);
                }}
                className="text-left py-2 text-stone-600">
                Join as Artist
            </button>

            <button
                onClick={() => {
                    navigate("/signin");
                    setIsMenuOpen(false);
                }}
                className="bg-stone-900 text-white px-4 py-2 rounded-lg">
                Login
            </button>
        </>
    )
    const showSections = (
        <>
            <ul className="px-2 md:flex hidden lg:text-lg items-center justify-around gap-15">
                <li className="cursor-pointer" onClick={() => {
                    navigate("/")
                }}>Home</li>
                <li className="cursor-pointer">Settings</li>
                <li className="cursor-pointer">Contact us</li>
            </ul>
            <div onClick={() => {
                navigate("/Profile")
            }} title={props.name} className="w-9 border-2 border-red-800 h-9 bg-gray-100 rounded-[50%]">
                <img className="h-full cursor-pointer rounded-[50%] w-full" src={props.avtar || "#"} alt={props.name} />
            </div>
        </>
    )

    return (
        <>
            <nav className="bg-white border-b border-stone-200 px-6 lg:px-0 py-4 sticky top-0 z-50">

                <div className="flex justify-around items-center">

                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-amber-700">
                            ApnaArt
                        </span>

                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">
                            100% Human Art
                        </span>
                    </div>

                    {props.islogin ? showSections : ""}

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-4 items-center">
                        {props.islogin ? "" : loginBtn}
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-2xl"
                        aria-label="Toggle navigation menu"
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? "✕" : "☰"}
                    </button>

                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden flex flex-col gap-3 pt-4">
                        {props.islogin ? <>
                            <ul className="px-2 md:hidden flex flex-col lg:text-lg items-center justify-around gap-10">
                                <li className="cursor-pointer" onClick={() => {
                                    navigate("/");
                                }}>Home</li>
                                <li className="cursor-pointer">Settings</li>
                                <li className="cursor-pointer">Contact us</li>
                            </ul></> : ""};
                        {props.islogin ? <>
                        </> : loginforMObile}
                    </div>
                )}

            </nav>
        </>
    )
}

export default Navbar
