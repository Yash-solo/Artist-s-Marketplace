import { useState } from 'react';

const AVAILABLE_STYLES = [
    'Pencil Sketch',
    'Charcoal',
    'Watercolor',
    'Oil Painting',
    'Digital Art',
    'Mandala',
];

export default function ArtistDashboard() {
    const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'upload_art'

    // 1. State matching exact 'User' Schema fields
    const [profileData, setProfileData] = useState({
        name: 'Aarav Sharma',
        username: 'aarav_sketches',
        bio: '',
        city: 'Jaipur',
        artStyles: ['Pencil Sketch'],
        isAvailableForCustom: true,
        startingPrice: 599,
        avgDeliveryDays: 4,
        upiId: '',
    });

    // 2. State matching exact 'Artwork' Schema fields
    const [artworkData, setArtworkData] = useState({
        title: '',
        description: '',
        category: 'Pencil Sketch',
        size: 'A4',
        listingType: 'portfolio_sample',
        price: 799,
        deliveryDays: 4,
        imageUrl: '',
        proofUrl: '',
    });

    // Toggle multiple artStyles array (User Schema: artStyles: [String])
    const handleStyleToggle = (style) => {
        setProfileData((prev) => {
            const exists = prev.artStyles.includes(style);
            if (exists) {
                return { ...prev, artStyles: prev.artStyles.filter((s) => s !== style) };
            } else {
                return { ...prev, artStyles: [...prev.artStyles, style] };
            }
        });
    };

    const handleProfileSave = (e) => {
        e.preventDefault();
        if (profileData.artStyles.length === 0) {
            alert('Kam se kam ek art style select karein!');
            return;
        }
        // Payload ready for PUT /api/users/profile
        console.log('User Model Payload:', profileData);
        alert('Profile & Payout details saved! (Console mein exact User schema payload dekhein)');
    };

    const handleArtworkSubmit = (e) => {
        e.preventDefault();
        if (!artworkData.title || !artworkData.imageUrl || !artworkData.proofUrl) {
            alert('Title, Main Artwork Image, aur Human-Made Proof teeno zaroori hain!');
            return;
        }
        // Payload ready for POST /api/artworks
        console.log('Artwork Model Payload:', artworkData);
        alert('Artwork published to your portfolio!');
    };

    return (
        <div className="min-h-screen bg-stone-50 text-stone-900 pb-16">
            {/* Top Navbar */}
            <nav className="bg-white border-b border-stone-200 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <a href="/" className="text-xl font-bold text-amber-700">KalaSetu</a>
                    <span className="text-xs bg-stone-100 text-stone-700 px-2.5 py-1 rounded-md font-medium">
                        Artist Studio
                    </span>
                </div>
                <a
                    href={`/artist/${profileData.username}`}
                    className="text-xs font-semibold text-amber-700 hover:underline"
                >
                    View Public Portfolio →
                </a>
            </nav>

            <div className="max-w-4xl mx-auto px-6 pt-8">
                <h1 className="text-2xl font-bold text-stone-900">Artist Dashboard</h1>
                <p className="text-sm text-stone-500 mt-1">
                    Apni profile details aur artworks manage karein.
                </p>

                {/* Dashboard Tabs */}
                <div className="flex gap-4 border-b border-stone-200 mt-6 mb-6">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`pb-3 text-sm font-semibold border-b-2 transition ${activeTab === 'profile'
                            ? 'border-amber-700 text-amber-700'
                            : 'border-transparent text-stone-500 hover:text-stone-800'
                            }`}
                    >
                        👤 Profile & Payout Setup
                    </button>
                    <button
                        onClick={() => setActiveTab('upload_art')}
                        className={`pb-3 text-sm font-semibold border-b-2 transition ${activeTab === 'upload_art'
                            ? 'border-amber-700 text-amber-700'
                            : 'border-transparent text-stone-500 hover:text-stone-800'
                            }`}
                    >
                        🎨 Upload New Artwork
                    </button>
                </div>

                {/* TAB 1: USER MODEL PROFILE SETUP */}
                {activeTab === 'profile' && (
                    <form
                        onSubmit={handleProfileSave}
                        className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6"
                    >
                        {/* Availability Toggle (isAvailableForCustom) */}
                        <div className="flex items-center justify-between p-4 bg-amber-50/60 rounded-xl border border-amber-200">
                            <div>
                                <h3 className="font-bold text-sm text-stone-900">
                                    Custom Commission Orders Status
                                </h3>
                                <p className="text-xs text-stone-600">
                                    Agar aap abhi naye sketches banane ke liye free hain toh ise ON rakhein.
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                checked={profileData.isAvailableForCustom}
                                onChange={(e) =>
                                    setProfileData({ ...profileData, isAvailableForCustom: e.target.checked })
                                }
                                className="w-5 h-5 accent-amber-700 cursor-pointer"
                            />
                        </div>

                        {/* Bio (maxLength: 250) */}
                        <div>
                            <div className="flex justify-between">
                                <label className="block text-sm font-medium text-stone-700">Artist Bio</label>
                                <span className="text-xs text-stone-400">{profileData.bio.length}/250</span>
                            </div>
                            <textarea
                                rows="3"
                                maxLength={250}
                                value={profileData.bio}
                                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                placeholder="Apne art experience aur specialty ke baare mein likhein..."
                                className="mt-1 w-full px-3.5 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                            />
                        </div>

                        {/* Art Styles Multi-Select (artStyles: [String]) */}
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-2">
                                Aap Kin Styles Mein Kaam Karte Hain? (Select Multiple)
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {AVAILABLE_STYLES.map((style) => {
                                    const selected = profileData.artStyles.includes(style);
                                    return (
                                        <button
                                            type="button"
                                            key={style}
                                            onClick={() => handleStyleToggle(style)}
                                            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition ${selected
                                                ? 'bg-amber-700 text-white border-amber-700'
                                                : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
                                                }`}
                                        >
                                            {selected ? `✓ ${style}` : `+ ${style}`}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* City, Starting Price, Avg Delivery Days */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-stone-700">City</label>
                                <input
                                    type="text"
                                    value={profileData.city}
                                    onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                                    className="mt-1 w-full px-3.5 py-2 border border-stone-300 rounded-lg text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700">
                                    Starting Price (₹)
                                </label>
                                <input
                                    type="number"
                                    min="199"
                                    value={profileData.startingPrice}
                                    onChange={(e) =>
                                        setProfileData({ ...profileData, startingPrice: Number(e.target.value) })
                                    }
                                    className="mt-1 w-full px-3.5 py-2 border border-stone-300 rounded-lg text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700">
                                    Avg. Delivery (Days)
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="30"
                                    value={profileData.avgDeliveryDays}
                                    onChange={(e) =>
                                        setProfileData({ ...profileData, avgDeliveryDays: Number(e.target.value) })
                                    }
                                    className="mt-1 w-full px-3.5 py-2 border border-stone-300 rounded-lg text-sm"
                                />
                            </div>
                        </div>

                        {/* UPI ID for Payouts (upiId) */}
                        <div className="pt-4 border-t border-stone-100">
                            <label className="block text-sm font-medium text-stone-700">
                                UPI ID (Order Complete Hone Par Payout Ke Liye)
                            </label>
                            <input
                                type="text"
                                value={profileData.upiId}
                                onChange={(e) => setProfileData({ ...profileData, upiId: e.target.value })}
                                placeholder="jaise: aarav@okicici"
                                className="mt-1 w-full sm:w-1/2 px-3.5 py-2 border border-stone-300 rounded-lg text-sm"
                            />
                            <p className="text-[11px] text-stone-500 mt-1">
                                🔒 Yeh sirf admin ko dikhega, public profile par hide rahega.
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="bg-stone-900 hover:bg-stone-800 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition"
                        >
                            Save Profile Settings
                        </button>
                    </form>
                )}

                {/* TAB 2: UPLOAD ARTWORK (ARTWORK MODEL) */}
                {activeTab === 'upload_art' && (
                    <form
                        onSubmit={handleArtworkSubmit}
                        className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-5"
                    >
                        <div>
                            <label className="block text-sm font-medium text-stone-700">Artwork Title</label>
                            <input
                                type="text"
                                value={artworkData.title}
                                onChange={(e) => setArtworkData({ ...artworkData, title: e.target.value })}
                                placeholder="Jaise: A4 Realistic Couple Pencil Sketch"
                                className="mt-1 w-full px-3.5 py-2 border border-stone-300 rounded-lg text-sm"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-stone-700">Category</label>
                                <select
                                    value={artworkData.category}
                                    onChange={(e) => setArtworkData({ ...artworkData, category: e.target.value })}
                                    className="mt-1 w-full px-3.5 py-2 border border-stone-300 rounded-lg text-sm bg-white"
                                >
                                    {AVAILABLE_STYLES.map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700">Size</label>
                                <input
                                    type="text"
                                    value={artworkData.size}
                                    onChange={(e) => setArtworkData({ ...artworkData, size: e.target.value })}
                                    placeholder="A4 / A3 / 12x16 in"
                                    className="mt-1 w-full px-3.5 py-2 border border-stone-300 rounded-lg text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700">Price (₹)</label>
                                <input
                                    type="number"
                                    value={artworkData.price}
                                    onChange={(e) => setArtworkData({ ...artworkData, price: Number(e.target.value) })}
                                    className="mt-1 w-full px-3.5 py-2 border border-stone-300 rounded-lg text-sm"
                                />
                            </div>
                        </div>

                        {/* Listing Type */}
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-2">Listing Type</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setArtworkData({ ...artworkData, listingType: 'portfolio_sample' })}
                                    className={`p-3 rounded-xl border text-left text-xs ${artworkData.listingType === 'portfolio_sample'
                                        ? 'border-amber-700 bg-amber-50 font-semibold'
                                        : 'border-stone-200'
                                        }`}
                                >
                                    🖼️ Portfolio Sample (Iske jaise custom orders lenge)
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setArtworkData({ ...artworkData, listingType: 'ready_to_ship' })}
                                    className={`p-3 rounded-xl border text-left text-xs ${artworkData.listingType === 'ready_to_ship'
                                        ? 'border-amber-700 bg-amber-50 font-semibold'
                                        : 'border-stone-200'
                                        }`}
                                >
                                    📦 Ready to Ship (Original painting bikne ke liye taiyar hai)
                                </button>
                            </div>
                        </div>

                        {/* Image URLs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-stone-700">
                                    Finished Artwork Image URL
                                </label>
                                <input
                                    type="url"
                                    value={artworkData.imageUrl}
                                    onChange={(e) => setArtworkData({ ...artworkData, imageUrl: e.target.value })}
                                    placeholder="https://..."
                                    className="mt-1 w-full px-3.5 py-2 border border-stone-300 rounded-lg text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700">
                                    ✏️ Human-Made Proof URL (WIP Photo)
                                </label>
                                <input
                                    type="url"
                                    value={artworkData.proofUrl}
                                    onChange={(e) => setArtworkData({ ...artworkData, proofUrl: e.target.value })}
                                    placeholder="Pencil/brush ke saath photo ka URL"
                                    className="mt-1 w-full px-3.5 py-2 border border-stone-300 rounded-lg text-sm"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition"
                        >
                            Publish Artwork
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}