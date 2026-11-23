
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

type UserRole = "buyer" | "artist";

interface SignupData {
    name: string;
    username: string;
    email: string;
    password: string;
    role: UserRole;
    city?: string;
    bio?: string;
    artStyles?: string[];
}

interface SignupProps {
    onSignup?: (data: SignupData) => Promise<void>;
}

const availableStyles = [
    "Pencil Sketch",
    "Charcoal",
    "Watercolor",
    "Digital Art",
    "Oil Painting",
    "Portrait",
    "Anime",
    "Abstract",
];

export default function Signup({ onSignup }: SignupProps) {
    const navigate = useNavigate();
    const [role, setRole] = useState<UserRole>("buyer");

    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        city: "",
        bio: "",
    });

    const [artStyles, setArtStyles] = useState<string[]>([]);

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const toggleStyle = (style: string) => {
        setArtStyles((prev) =>
            prev.includes(style)
                ? prev.filter((item) => item !== style)
                : [...prev, style]
        );
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (form.password.length < 8) {
            setError("Password must contain at least 8 characters.");
            return;
        }

        if (role === "artist" && artStyles.length === 0) {
            setError("Please select at least one art style.");
            return;
        }

        if (!onSignup) {
            setError("Signup service is not configured.");
            return;
        }

        const signupData: SignupData = {
            name: form.name.trim(),
            username: form.username.trim().toLowerCase(),
            email: form.email.trim().toLowerCase(),
            password: form.password,
            role,
            ...(role === "artist" && {
                city: form.city.trim(),
                bio: form.bio.trim(),
                artStyles,
            }),
        };

        try {
            setLoading(true);
            await onSignup(signupData);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    //send data to server 
    async function sendDataToServer() {
        try {
            const response = await fetch("http://localhost:3000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    information: form,
                    Role: role,
                })
            })
            if (response) {
                const data = await response.json()
                console.log("Here is the data:- ", data);
                navigate("/");
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Error while sending response:- ", error.message);
            } else {
                console.log("See what's the Error :- ", error);
            }

        }
    }
    return (

        <div className="min-h-screen bg-[#f8f7f4] flex items-center justify-center p-4">

            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">

                {/* LEFT SIDE */}

                <div className="hidden md:flex flex-col justify-between bg-[#202020] text-white p-12">

                    <div>
                        <h1 className="text-3xl font-bold">
                            Art<span className="text-orange-400">Space.</span>
                        </h1>

                        <p className="text-gray-400 text-sm mt-2">
                            A marketplace for creative minds.
                        </p>
                    </div>

                    <div>

                        <div className="text-6xl mb-8">🖌️</div>

                        <h2 className="text-4xl font-semibold leading-tight">
                            Every artist deserves a place to shine.
                        </h2>

                        <p className="text-gray-400 mt-5 leading-relaxed">
                            Join a creative community where artists showcase their
                            imagination and people discover unique artworks.
                        </p>

                    </div>

                    <p className="text-gray-500 text-sm">
                        © 2026 ArtSpace. All rights reserved.
                    </p>

                </div>


                {/* RIGHT SIDE */}

                <div className="p-7 sm:p-10 lg:p-12">

                    <div className="mb-7">

                        <p className="text-orange-500 text-sm font-semibold mb-3">
                            JOIN OUR COMMUNITY
                        </p>

                        <h2 className="text-3xl font-bold text-gray-900">
                            Create your account
                        </h2>

                        <p className="text-gray-500 text-sm mt-2">
                            Start your creative journey with us.
                        </p>

                    </div>


                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* ROLE SELECTION */}

                        <div>

                            <label className="text-sm font-medium text-gray-700">
                                I want to join as
                            </label>

                            <div className="grid grid-cols-2 gap-3 mt-2">

                                <button
                                    type="button"
                                    onClick={() => {
                                        setRole("buyer")
                                    }}
                                    className={`p-4 rounded-xl border text-left transition ${role === "buyer"
                                        ? "border-orange-500 bg-orange-50"
                                        : "border-gray-200 hover:border-gray-400"
                                        }`}
                                >
                                    <span className="text-2xl">🛍️</span>

                                    <p className="font-semibold mt-2 text-gray-900">
                                        Buyer
                                    </p>

                                    <p className="text-xs text-gray-500 mt-1">
                                        Discover artworks
                                    </p>

                                </button>


                                <button
                                    type="button"
                                    onClick={() => setRole("artist")}
                                    className={`p-4 rounded-xl border text-left transition ${role === "artist"
                                        ? "border-orange-500 bg-orange-50"
                                        : "border-gray-200 hover:border-gray-400"
                                        }`}
                                >
                                    <span className="text-2xl">🎨</span>

                                    <p className="font-semibold mt-2 text-gray-900">
                                        Artist
                                    </p>

                                    <p className="text-xs text-gray-500 mt-1">
                                        Sell your artwork
                                    </p>

                                </button>

                            </div>

                        </div>


                        {/* NAME */}

                        <div>

                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                Full Name
                            </label>

                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                                autoComplete="name"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                            />

                        </div>


                        {/* USERNAME */}

                        <div>

                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                Username
                            </label>

                            <input
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                placeholder="e.g. rahul_art"
                                required
                                minLength={3}
                                autoComplete="username"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                            />

                            <p className="text-xs text-gray-400 mt-1">
                                Your profile URL will use this username.
                            </p>

                        </div>


                        {/* EMAIL */}

                        <div>

                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                required
                                autoComplete="email"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                            />

                        </div>


                        {/* PASSWORD */}

                        <div>

                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                Password
                            </label>

                            <div className="relative">

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Minimum 8 characters"
                                    required
                                    minLength={8}
                                    autoComplete="new-password"
                                    className="w-full px-4 py-3 pr-20 rounded-xl border border-gray-200 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>

                            </div>

                        </div>


                        {/* CONFIRM PASSWORD */}

                        <div>

                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                Confirm Password
                            </label>

                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder="Re-enter your password"
                                required
                                autoComplete="new-password"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                            />

                        </div>


                        {/* ARTIST ONLY FIELDS */}

                        {role === "artist" && (

                            <div className="space-y-4 border-t border-gray-100 pt-5">

                                <h3 className="font-semibold text-gray-900">
                                    Artist Information
                                </h3>

                                {/* CITY */}

                                <div>

                                    <label className="block text-sm font-medium mb-2 text-gray-700">
                                        Your City
                                    </label>

                                    <input
                                        name="city"
                                        value={form.city}
                                        onChange={handleChange}
                                        placeholder="e.g. Jaipur, Rajasthan"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-400"
                                    />

                                </div>


                                {/* BIO */}

                                <div>

                                    <label className="block text-sm font-medium mb-2 text-gray-700">
                                        Short Bio
                                    </label>

                                    <textarea
                                        name="bio"
                                        value={form.bio}
                                        onChange={handleChange}
                                        placeholder="Tell people about your creativity..."
                                        maxLength={250}
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-400 resize-none"
                                    />

                                    <p className="text-xs text-gray-400 text-right">
                                        {form.bio.length}/250
                                    </p>

                                </div>


                                {/* ART STYLES */}

                                <div>

                                    <label className="block text-sm font-medium mb-3 text-gray-700">
                                        Your Art Styles
                                    </label>

                                    <div className="flex flex-wrap gap-2">

                                        {availableStyles.map((style) => (

                                            <button
                                                key={style}
                                                type="button"
                                                onClick={() => toggleStyle(style)}
                                                className={`px-3 py-2 rounded-full text-xs font-medium border transition ${artStyles.includes(style)
                                                    ? "bg-orange-500 text-white border-orange-500"
                                                    : "bg-white text-gray-600 border-gray-200 hover:border-orange-400"
                                                    }`}
                                            >
                                                {style}
                                            </button>

                                        ))}

                                    </div>

                                </div>

                            </div>

                        )}


                        {/* ERROR MESSAGE */}

                        {error && (

                            <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">
                                {error}
                            </p>

                        )}


                        {/* SUBMIT */}

                        <button
                            type="submit"
                            disabled={loading}
                            onClick={() => {
                                sendDataToServer();
                            }}
                            className="w-full bg-[#202020] hover:bg-orange-500 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all duration-300"
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>


                    </form>


                    {/* LOGIN LINK */}

                    <p className="text-center text-sm text-gray-500 mt-7">

                        Already have an account?

                        <a
                            href="/signin"
                            className="text-orange-500 font-semibold ml-1 hover:underline"
                        >
                            Sign In
                        </a>

                    </p>

                </div>

            </div>

        </div>

    );
}