import { useState, type FormEvent } from "react";

interface LoginCredentials {
    email: string;
    password: string;
}

interface SignInProps {
    onLogin?: (credentials: LoginCredentials) => Promise<void>;
}

export default function SignIn({ onLogin }: SignInProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            setLoading(true);

            if (onLogin) {
                await onLogin({ email, password });
            }
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8f7f4] flex items-center justify-center p-4">

            <div className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-xl grid md:grid-cols-2">

                {/* LEFT SIDE - BRANDING */}

                <div className="hidden md:flex flex-col justify-between bg-[#202020] text-white p-12">

                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Art<span className="text-orange-400">Space.</span>
                        </h1>

                        <p className="text-gray-400 mt-2 text-sm">
                            A marketplace for creative minds.
                        </p>
                    </div>

                    <div>
                        <div className="text-6xl mb-8">🎨</div>

                        <h2 className="text-4xl font-semibold leading-tight">
                            Your creativity deserves an audience.
                        </h2>

                        <p className="text-gray-400 mt-5 leading-relaxed">
                            Discover talented artists, explore beautiful artworks,
                            and turn your creative ideas into reality.
                        </p>
                    </div>

                    <p className="text-gray-500 text-sm">
                        © 2026 ArtSpace. All rights reserved.
                    </p>

                </div>


                {/* RIGHT SIDE - LOGIN FORM */}

                <div className="p-7 sm:p-12 flex flex-col justify-center">

                    <div className="mb-8">

                        <p className="text-orange-500 font-semibold text-sm mb-3">
                            WELCOME BACK
                        </p>

                        <h2 className="text-3xl font-bold text-gray-900">
                            Sign in to your account
                        </h2>

                        <p className="text-gray-500 mt-3 text-sm">
                            Welcome back! Please enter your details.
                        </p>

                    </div>


                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* EMAIL */}

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Email Address
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                            />
                        </div>


                        {/* PASSWORD */}

                        <div>

                            <div className="flex justify-between mb-2">

                                <label
                                    htmlFor="password"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>

                                <button
                                    type="button"
                                    className="text-sm text-orange-500 hover:text-orange-600 font-medium"
                                >
                                    Forgot password?
                                </button>

                            </div>

                            <div className="relative">

                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                    className="w-full px-4 py-3.5 pr-20 rounded-xl border border-gray-200 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-900"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>

                            </div>

                        </div>


                        {/* ERROR */}

                        {error && (
                            <p className="text-sm text-red-500">{error}</p>
                        )}


                        {/* REMEMBER ME */}

                        <div className="flex items-center gap-2">

                            <input
                                id="remember"
                                type="checkbox"
                                className="accent-orange-500 w-4 h-4"
                            />

                            <label
                                htmlFor="remember"
                                className="text-sm text-gray-600"
                            >
                                Remember me
                            </label>

                        </div>


                        {/* SUBMIT BUTTON */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#202020] hover:bg-orange-500 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all duration-300"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>

                    </form>


                    {/* SIGN UP */}

                    <div className="mt-8 text-center">

                        <p className="text-sm text-gray-500">
                            Don't have an account?

                            <a
                                href="/signup"
                                className="text-orange-500 font-semibold ml-1 hover:underline"
                            >
                                Create account
                            </a>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}