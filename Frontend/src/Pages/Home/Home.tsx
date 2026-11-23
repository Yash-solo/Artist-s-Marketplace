import { useState } from "react";
import { useNavigate } from "react-router-dom";
// ==========================================
// 1. TYPES & INTERFACES
// ==========================================

type ListingType = "portfolio_sample" | "ready_to_ship";

type ArtworkCategory =
    | "Pencil Sketch"
    | "Charcoal"
    | "Watercolor"
    | "Oil Painting";

type CategoryFilter = "All" | ArtworkCategory;

interface Artist {
    name: string;
    username: string;
    city: string;
    completedOrders: number;
}

interface Artwork {
    id: number;
    title: string;
    category: ArtworkCategory;
    size: string;
    price: number;
    deliveryDays: number;
    listingType: ListingType;
    imageUrl: string;
    proofUrl: string;
    artist: Artist;
}

// ==========================================
// 2. DUMMY DATA
// ==========================================

const DUMMY_ARTWORKS: Artwork[] = [
    {
        id: 1,
        title: "Hyper-Realistic Couple Portrait",
        category: "Pencil Sketch",
        size: "A4",
        price: 899,
        deliveryDays: 4,
        listingType: "portfolio_sample",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjRXq0_DQ3ssQFjQduyFaZy_TzHLjIL39Z9KTvD1uEEuhxQ5R3fDgj8R4N&s=10",
        proofUrl: "https://unsplash.com",
        artist: {
            name: "Aarav Sharma",
            username: "aarav_sketches",
            city: "Jaipur",
            completedOrders: 4
        }
    },
    {
        id: 2,
        title: "Rajasthani Heritage Watercolor",
        category: "Watercolor",
        size: "12x16 inch",
        price: 1499,
        deliveryDays: 3,
        listingType: "ready_to_ship",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf8beEi_e-JEaoPwehUvWu10An1IEtfOowgh61jgVSXg&s=10",
        proofUrl: "https://unsplash.com",
        artist: {
            name: "Priya Verma",
            username: "priya_colors",
            city: "Udaipur",
            completedOrders: 0
        }
    },
    {
        id: 3,
        title: "Charcoal Pet Portrait",
        category: "Charcoal",
        size: "A3",
        price: 1299,
        deliveryDays: 5,
        listingType: "portfolio_sample",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4ELCA-SAo_lmo0u5FNfeVxXGdISzaLbmsOVq41WD2dg&s=10",
        proofUrl: "https://unsplash.com",
        artist: {
            name: "Rohan Das",
            username: "rohan_charcoal",
            city: "Bikaner",
            completedOrders: 2
        }
    }
];

// ==========================================
// 3. CONSTANTS
// ==========================================

const CATEGORIES: CategoryFilter[] = [
    "All",
    "Pencil Sketch",
    "Charcoal",
    "Watercolor",
    "Oil Painting"
];

// ==========================================
// 4. HOME COMPONENT
// ==========================================

export default function Home() {
    const navigate = useNavigate();

    // State Types
    const [selectedCategory, setSelectedCategory] =
        useState<CategoryFilter>("All");

    const [maxPrice, setMaxPrice] =
        useState<number>(3000);

    const [showProofMap, setShowProofMap] =
        useState<Record<number, boolean>>({});

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    // ==========================================
    // 5. TOGGLE PROOF
    // ==========================================

    const toggleProof = (id: number): void => {

        setShowProofMap((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));

    };


    // ==========================================
    // 6. FILTER LOGIC
    // ==========================================

    const filteredArtworks: Artwork[] = DUMMY_ARTWORKS.filter((art) => {

        const matchCategory: boolean =
            selectedCategory === "All" ||
            art.category === selectedCategory;

        const matchPrice: boolean =
            art.price <= maxPrice;

        return matchCategory && matchPrice;

    });


    // ==========================================
    // 7. JSX
    // ==========================================

    return (

        <div className="min-h-screen bg-stone-50 text-stone-900">

            {/* Top Navbar */}

            <nav className="bg-white border-b border-stone-200 px-6 py-4 sticky top-0 z-50">

                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-amber-700">
                            ApnaArt
                        </span>

                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">
                            100% Human Art
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-4 items-center">

                        <button onClick={() => navigate("/signup")}
                            className="text-sm font-medium text-stone-600 hover:text-stone-900">
                            Join as Artist
                        </button>

                        <button onClick={() => navigate("/signin")}
                            className="bg-stone-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-stone-800">
                            Login
                        </button>

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

                    </div>
                )}

            </nav>


            {/* Hero Section */}

            <header className="max-w-6xl mx-auto px-6 pt-10 pb-6">

                <h1 className="text-3xl md:text-4xl font-bold text-stone-900">
                    Asli Hunar, Bina Follower Bias Ke.
                </h1>

                <p className="text-stone-600 mt-2 max-w-2xl">
                    Independent sketch artists aur painters se seedha custom portraits banwayein ya original handmade art kharidein.
                </p>


                {/* Filter Bar */}

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-stone-200 shadow-sm">

                    {/* Category Pills */}

                    <div className="flex flex-wrap gap-2">

                        {CATEGORIES.map((cat) => (

                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${selectedCategory === cat
                                    ? "bg-amber-700 text-white"
                                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                                    }`}
                            >
                                {cat}
                            </button>

                        ))}

                    </div>


                    {/* Budget Slider */}

                    <div className="flex items-center gap-3">

                        <label className="text-sm font-medium text-stone-700">

                            Max Budget:

                            <span className="text-amber-700 font-bold">
                                ₹{maxPrice}
                            </span>

                        </label>

                        <input
                            type="range"
                            min="500"
                            max="5000"
                            step="100"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            className="accent-amber-700 cursor-pointer"
                        />

                    </div>

                </div>

            </header>


            {/* Artworks Grid */}

            <main className="max-w-6xl mx-auto px-6 pb-16">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {filteredArtworks.map((art) => {

                        const isShowingProof: boolean =
                            showProofMap[art.id] ?? false;

                        return (

                            <div
                                key={art.id}
                                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
                            >

                                {/* Image Container */}

                                <div className="relative h-72 bg-stone-200">

                                    <img
                                        src={
                                            isShowingProof
                                                ? art.proofUrl
                                                : art.imageUrl
                                        }
                                        alt={art.title}
                                        className="w-full h-full object-cover"
                                    />


                                    {/* Top Badges */}

                                    <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2.5 py-1 rounded-md backdrop-blur-sm">

                                        {art.category} • {art.size}

                                    </span>


                                    {/* Human-Made Proof Toggle */}

                                    <button
                                        onClick={() => toggleProof(art.id)}
                                        className="absolute bottom-3 right-3 bg-white/95 text-stone-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow hover:bg-amber-50 border border-stone-300"
                                    >

                                        {isShowingProof
                                            ? "🎨 Show Final Art"
                                            : "✏️ See Real Proof"}

                                    </button>

                                </div>


                                {/* Card Details */}

                                <div className="p-4 flex-1 flex flex-col justify-between">

                                    <div>

                                        <div className="flex justify-between items-start gap-2">

                                            <h2 className="font-bold text-lg text-stone-900 leading-snug">
                                                {art.title}
                                            </h2>

                                            <span className="font-bold text-amber-700 text-lg whitespace-nowrap">
                                                ₹{art.price}
                                            </span>

                                        </div>


                                        {/* Artist Info */}

                                        <div className="mt-2 flex items-center justify-between text-xs text-stone-500">

                                            <span>

                                                By{" "}

                                                <strong className="text-stone-700">
                                                    {art.artist.name}
                                                </strong>

                                                {" "}({art.artist.city})

                                            </span>


                                            <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded font-medium">

                                                {art.artist.completedOrders === 0
                                                    ? "New Talent"
                                                    : `${art.artist.completedOrders} Orders Done`}

                                            </span>

                                        </div>

                                    </div>


                                    {/* Bottom CTA */}

                                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">

                                        <span className="text-xs text-stone-500">
                                            ⏱️ Ready in {art.deliveryDays} days
                                        </span>


                                        <button
                                            className={`text-sm font-semibold px-4 py-2 rounded-lg transition ${art.listingType === "ready_to_ship"
                                                ? "bg-amber-700 text-white hover:bg-amber-800"
                                                : "bg-stone-900 text-white hover:bg-stone-800"
                                                }`}
                                        >

                                            {art.listingType === "ready_to_ship"
                                                ? "Buy Original"
                                                : "Order Similar"}

                                        </button>

                                    </div>

                                </div>

                            </div>

                        );

                    })}

                </div>

            </main>

        </div>

    );

}