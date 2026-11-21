import { Routes, Route } from "react-router-dom"
import FirstPage from "../Pages/FirstPage.tsx"
import BuyerDetails from "../Pages/Buyer/BuyerDetails.tsx"
import SellerDetails from "../Pages/Seller/SellerDetails.tsx"

const Routing = () => {

    return (
        <Routes>
            <Route path="/" element={<FirstPage />} />
            <Route path="/BuyerDetails" element={<BuyerDetails />} />
            <Route path="/SelelrDetails" element={<SellerDetails />} />
        </Routes>
    )
}

export default Routing
