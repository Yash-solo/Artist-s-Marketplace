import { useState, useEffect, useMemo } from "react";
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
    const [isEdit, setEdit] = useState(false);
    const [activeTab, setActiveTab] = useState("all"); // 'all' | 'ready_to_ship' | 'reviews'
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
                setuser(data.user);
            }
        }
        getData();
    }, [])

    function debounce<Args extends unknown[], Return>(
        fn: (...args: Args) => Return,
        delay: number
    ) {
        let timer: ReturnType<typeof setTimeout>;

        return (...args: Args): void => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn(...args);
            }, delay);
        };
    }

    const updateData = async (udata: typeof user) => {
        try {
            const response = await fetch("http://localhost:3000/changeData", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(udata)
            })
            if (response) {
                return
            }
        } catch (err) {
            if (err instanceof Error) {
                console.log("Error came:- ", err.message);
            }

            console.log("error came:- ", err);
        }
    }
    // useMemo se 'debouncedUpdate' ko sirf ek baar banayein
    const newData = useMemo(() => debounce(updateData, 1000), []);

    //handle only input element and text area element and change the user first
    const handleEdit = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setuser({
            ...user,
            [e.target.name]: e.target.value
        })
        console.log("Debouncing checking right now");
        newData(user);
    }

    const editProfile = (
        <>
            <div className="w-full p-5 fixed z-1000 flex items-center justify-start flex-col gap-5 top-17 left-0 h-full bg-[rgba(255,255,255,0.3)] backdrop-blur-[5px]">
                <div className="w-full overflow-y-auto [&::-webkit-scrollbar]:hidden h-[85%] border border-[#ddd] shadow-[0px_0px_10px_#ddd] p-6 bg-white rounded-2xl">
                    <form className="grid grid-cols-1 md:grid-cols-1 gap-2">
                        <label className="w-full flex items-center justify-between">
                            <h1 className="text-lg">Edit Profile</h1>
                            <button onClick={() => {
                                setEdit(!isEdit);
                            }} type="button" className="px-3 p-1 text-[#1d1d1d] font-bold text-lg bg-[#e0e0e0]">Done</button>
                        </label>
                        <br />
                        <label className="shrink-0 flex flex-col gap-2" htmlFor="name">
                            Name
                            <input onChange={handleEdit} name={"name"} value={user.name} spellCheck={false} type="text" id="name" className="p-2 rounded-[5px] border border-[#ddd]" placeholder="Enter name" />
                        </label>
                        <label className="shrink-0 flex flex-col gap-2" htmlFor="username">
                            Username
                            <input onChange={handleEdit} name="username" value={user.username} spellCheck={false} type="text" id="username" className="p-2 rounded-[5px] border border-[#ddd]" placeholder="Change username" />
                        </label>
                        <label className="shrink-0 flex flex-col gap-2" htmlFor="cityname">
                            City/Town
                            <input onChange={handleEdit} name="city" value={user.city} spellCheck={false} type="text" id="cityname" className="p-2 rounded-[5px] border border-[#ddd]" placeholder="Enter city name" />
                        </label>
                        <label className="shrink-0 flex flex-col gap-2" htmlFor="bio">
                            Bio
                            <textarea onChange={handleEdit} name="bio" value={user.bio} placeholder="Enter your Bio here" className="border resize-none rounded-lg p-2 h-20 border-[#ddd]" name="bio" id="bio"></textarea>
                        </label>
                        <label htmlFor="shrink-0 interested  fields">
                            Select your interests
                            <select className="p-2 shrink-0 " multiple={true} name="interests" id="interests">
                                <option className="p-1" value="Sketching">Sketching</option>
                                <option className="p-1" value="Painting">Painting</option>
                                <option className="p-1" value="Oil painting">Oil Painting</option>
                                <option className="p-1" value="Charcol">Charcol</option>
                            </select>
                        </label>
                        <hr className="border-[#ddd]" />
                        <label className="shrink-0 flex w-full justify-between " htmlFor="orders">
                            <span className="text-lg">Taking Custom Orders</span>
                            <select className="p-1 focus:outline-0 shrink-0 " name="orders" id="orders">
                                <option className="p-1" value="Sketching">Yes</option>
                                <option className="p-1" value="Painting">No</option>
                            </select>
                        </label>
                        <br />
                        <label htmlFor="DelivaryDays">
                            Average Delivary Days
                        </label>
                        <input onChange={handleEdit} name="avgDeliveryDays" value={user.avgDeliveryDays} spellCheck={false} type="number" id="DelivaryDays" className="p-2 rounded-[5px] border border-[#ddd]" placeholder="Enter average delivary days" />

                    </form>
                </div>
            </div>
        </>
    )
    const sellerProf = (
        <div className="min-h-screen bg-stone-50 text-stone-900 pb-16">
            {isEdit ? editProfile : ""}
            <div className="w-full text-end lg:px-10 pt-2 px-5">
                <button onClick={() => {
                    setEdit(!isEdit);
                }} className="border-0 cursor-pointer p-2 rounded-lg bg-gray-200">edit profile</button>
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