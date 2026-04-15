import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/authslice'
import { useNavigate, Link } from 'react-router'

export default function Login() {
    const [Email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const { isauthenticated, error, loading } = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isauthenticated) {
            navigate("/");
        }
    }, [isauthenticated, navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login({ Email, password }))
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                <div className="text-center mb-10 flex flex-col items-center">
                    <div className="w-12 h-12 mb-4 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-2xl shadow-[0_4px_12px_rgba(79,70,229,0.3)] flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Sign in to HardLink
                    </h1>
                    <p className="mt-2 text-gray-500 font-medium text-sm">Welcome back to your workspace.</p>
                </div>

                <div className="bg-white py-10 px-8 shadow-sm ring-1 ring-gray-900/5 sm:rounded-2xl">
                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-700 text-sm font-medium ring-1 ring-red-600/20">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">Email address</label>
                            <input
                                type="email"
                                required
                                placeholder="you@work.com"
                                className="block w-full rounded-md border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            </div>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                className="block w-full rounded-md border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-md bg-indigo-600 px-3.5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {loading ? 'Authenticating...' : 'Sign in'}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-500">
                        Not a member? <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Create a free account</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}