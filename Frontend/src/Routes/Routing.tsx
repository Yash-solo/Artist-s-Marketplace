import { Routes, Route } from "react-router-dom"
import BuyerDetails from "../Pages/Buyer/BuyerDetails.tsx"
import SellerDetails from "../Pages/Seller/SellerDetails.tsx"
import Home from "../Pages/Home/Home.tsx"
import ArtistProfile from "../Pages/AritstProfile/ArtistProfile.tsx"
import ArtistDashboard from "../Pages/Deshboard/ArtistDesh.tsx"
import SignIn from "../Pages/Signin.tsx"
import Signup from "../Pages/Signup.tsx"

const Routing = () => {

    return (
        <Routes>
            <Route path="/BuyerDetails" element={<BuyerDetails />} />
            <Route path="/Login/SellerDetails" element={<SellerDetails />} />
            <Route path="/" element={<Home />} />
            <Route path="/Profile" element={<ArtistProfile />} />
            <Route path="/Deshboard" element={<ArtistDashboard />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    )
}

export default Routing
