import box from "/src/assets/box.png"
import { useNavigate } from "react-router-dom";
import artist from "/src/assets/painter.png"

const Login = () => {
    const Navigate = useNavigate();

    return (
        <>
            <div className="w-full h-screen flex flex-col items-center p-3 py-40 justify-start gap-10 bg-[linear-gradient(to_bottom,#00664d,#d5f7ee,white,white,white)]">
                <h1 className="text-4xl font-serif md:text-7xl lg:text-5xl">Apna Artist</h1>
                <div className="w-full flex items-center justify-center gap-4">
                    <button onClick={() => {
                        Navigate("BuyerDetails");
                    }} className="p-2 lg:text-lg lg:p-3 md:text-4xl md:p-5 rounded-[10px] px-3 flex hover:shadow-[0px_10px_10px_#ddd] hover:-translate-y-0.5 transform transition-all duration-100 justify-around items-center cursor-pointer gap-1 bg-green-900 text-white">
                        <img className="h-7" src={box} alt="box pic" />
                        Become Buyer
                    </button>
                    <button onClick={() => {
                        alert("Hello");
                        Navigate("SelelrDetails");
                    }} className="p-2 lg:text-lg lg:p-3 md:text-4xl md:p-5 rounded-[10px] flex hover:shadow-[0px_10px_10px_#ddd] hover:-translate-y-0.5 transform transition-all duration-100 justify-around items-center cursor-pointer gap-1 px-3 bg-gray-800 text-white">
                        <img className="h-7" src={artist} alt="" />
                        Become Seller
                    </button>
                </div>
            </div>
        </>
    )
}

export default Login
