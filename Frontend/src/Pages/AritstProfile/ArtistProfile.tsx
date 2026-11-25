import { useState, useEffect } from "react";
import { ARTIST_DATA } from "./dummydata";
import BuyerProfile from "./BuyerProfile";

interface UserData {
    avatar: string,
    avgDeliveryDays: number,
    bio: string,
    city: string,
    completedOrdersCount?: number,
    createdAt?: string,
    email: string,
    isAvailableForCustom?: boolean,
    name: string,
    role: string,
    updatedAt?: string,
    username: string,
    __v?: number,
    _id?: string,
}

export default function ArtistProfile() {
    const [activeTab, setActiveTab] = useState("all"); // 'all' | 'ready_to_ship' | 'reviews'
    const [copied, setCopied] = useState(false);
    const [showProofMap, setShowProofMap] = useState({});

    const [user, setuser] = useState<UserData>({
        avatar: "",
        avgDeliveryDays: 0,
        bio: "",
        city: "",
        email: "",
        name: "",
        role: "",
        username: ""
    });

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleProof = (id) => {
        setShowProofMap((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const displayedArtworks = ARTIST_DATA.artworks.filter((art) => {
        if (activeTab === "ready_to_ship") return art.listingType === "ready_to_ship";
        return true;
    });


    useEffect(() => {
        const getData = async () => {
            const response = await fetch("http://localhost:3000/Profile", {
                method: "GET",
                credentials: "include",
            })
            if (response) {
                const data = await response.json();
                console.log("Data is here:- ", data.user);
                setuser(data.user);
            }
        }
        getData();
    }, [])


    const sellerProf = (
        <div className="min-h-screen bg-stone-50 text-stone-900 pb-16">
            {/* Top Bar */}
            <div className="bg-white border-b border-stone-200 px-6 py-3 flex justify-between items-center">
                <a href="/" className="text-xl font-bold text-amber-700">← KalaSetu</a>
                <button
                    onClick={handleCopyLink}
                    className="text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 px-3 py-1.5 rounded-full border border-stone-300"
                >
                    {copied ? "✅ Link Copied!" : "🔗 Share Portfolio"}
                </button>
            </div>

            <div className="max-w-5xl mx-auto px-6 pt-8">
                {/* 1. Artist Profile Header */}
                <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                    <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-20 h-20 rounded-full object-cover border-2 border-amber-600"
                        />
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <h1 className="text-2xl font-bold text-stone-900">{user.name}</h1>
                                <span className="text-xs bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full font-semibold">
                                    ✓ {user.completedOrders} Orders Completed
                                </span>
                            </div>
                            <p className="text-sm text-stone-500 mt-0.5">
                                @{user.username} • 📍 {user.city}
                            </p>
                            <p className="text-sm text-stone-700 mt-3 max-w-xl leading-relaxed">
                                {user.bio}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {ARTIST_DATA.artStyles.map((style) => (
                                    <span
                                        key={style}
                                        className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-md"
                                    >
                                        {style}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Primary CTA Box */}
                    <div className="w-full md:w-auto bg-stone-50 p-4 rounded-xl border border-stone-200 text-center">
                        <span className="inline-block text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mb-2">
                            {user.isAvailableForCustom ? "🟢 Taking Custom Orders" : "🔴 Slots Full"}
                        </span>
                        <button className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition shadow-sm">
                            Order Custom Sketch
                        </button>
                        <p className="text-[11px] text-stone-500 mt-2">
                            100% Safe Payment • Rough Outline Preview
                        </p>
                    </div>
                </div>

                {/* 2. Custom Sketch Rate Card (Transparent Pricing) */}
                <section className="mt-8">
                    <h2 className="text-lg font-bold text-stone-900 mb-3">
                        📋 Custom Sketch Rate Card
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {ARTIST_DATA.rateCard.map((tier, index) => (
                            <div
                                key={index}
                                className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col justify-between hover:border-amber-500 transition"
                            >
                                <div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-stone-900">{tier.size}</span>
                                        <span className="font-bold text-amber-700 text-lg">₹{tier.price}</span>
                                    </div>
                                    <p className="text-xs text-stone-600 mt-1">{tier.faces}</p>
                                </div>
                                <div className="mt-4 pt-2 border-t border-stone-100 flex justify-between items-center">
                                    <span className="text-xs text-stone-500">⏱️ {tier.days} Days</span>
                                    <button className="text-xs font-semibold text-amber-700 hover:underline">
                                        Select & Book →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. Tabs: Portfolio & Reviews */}
                <section className="mt-10">
                    <div className="flex gap-6 border-b border-stone-200 mb-6">
                        <button
                            onClick={() => setActiveTab("all")}
                            className={`pb-3 text-sm font-semibold border-b-2 transition ${activeTab === "all"
                                ? "border-amber-700 text-amber-700"
                                : "border-transparent text-stone-500 hover:text-stone-800"
                                }`}
                        >
                            All Artworks ({ARTIST_DATA.artworks.length})
                        </button>
                        <button
                            onClick={() => setActiveTab("ready_to_ship")}
                            className={`pb-3 text-sm font-semibold border-b-2 transition ${activeTab === "ready_to_ship"
                                ? "border-amber-700 text-amber-700"
                                : "border-transparent text-stone-500 hover:text-stone-800"
                                }`}
                        >
                            Ready to Buy ({ARTIST_DATA.artworks.filter(a => a.listingType === 'ready_to_ship').length})
                        </button>
                        <button
                            onClick={() => setActiveTab("reviews")}
                            className={`pb-3 text-sm font-semibold border-b-2 transition ${activeTab === "reviews"
                                ? "border-amber-700 text-amber-700"
                                : "border-transparent text-stone-500 hover:text-stone-800"
                                }`}
                        >
                            Buyer Reviews ({ARTIST_DATA.reviews.length})
                        </button>
                    </div>

                    {/* Tab Content */}
                    {activeTab !== "reviews" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayedArtworks.map((art) => {
                                const isShowingProof = showProofMap[art.id];
                                return (
                                    <div
                                        key={art.id}
                                        className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm"
                                    >
                                        <div className="relative h-64 bg-stone-200">
                                            <img
                                                src={isShowingProof ? art.proofUrl : art.imageUrl}
                                                alt={art.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <span className="absolute top-2.5 left-2.5 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                                                {art.size} • {art.category}
                                            </span>
                                            <button
                                                onClick={() => toggleProof(art.id)}
                                                className="absolute bottom-2.5 right-2.5 bg-white/95 text-stone-900 text-xs font-semibold px-2.5 py-1 rounded-full shadow"
                                            >
                                                {isShowingProof ? "🎨 Final Art" : "✏️ Real Proof"}
                                            </button>
                                        </div>
                                        <div className="p-4 flex justify-between items-center">
                                            <div>
                                                <h3 className="font-semibold text-sm text-stone-900">{art.title}</h3>
                                                <span className="text-xs text-stone-500">
                                                    {art.listingType === "ready_to_ship" ? "Original Available" : "Portfolio Sample"}
                                                </span>
                                            </div>
                                            <span className="font-bold text-amber-700">₹{art.price}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {ARTIST_DATA.reviews.map((rev) => (
                                <div key={rev.id} className="bg-white p-5 rounded-xl border border-stone-200">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-sm">{rev.buyerName}</span>
                                        <span className="text-xs text-stone-400">{rev.date}</span>
                                    </div>
                                    <div className="text-amber-500 text-sm my-1">{"★".repeat(rev.rating)}</div>
                                    <p className="text-sm text-stone-700">{rev.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
    return (
        <>
            {user.role !== "artist" ? <BuyerProfile /> : sellerProf}
        </>
    );
}