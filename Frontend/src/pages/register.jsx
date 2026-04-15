import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../redux/authslice'
import { Link, useNavigate } from 'react-router'

export default function Register() {
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Email, setEmail] = useState("");
    const [password, setpassword] = useState("");

    const { successMessage, error, loading, isauthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isauthenticated) {
            navigate("/");
        }
    }, [isauthenticated, navigate]);

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(registerUser({ FirstName, LastName, Email, password }))
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-lg">
                <div className="text-center mb-10 flex flex-col items-center">
                    <div className="w-12 h-12 mb-4 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-2xl shadow-[0_4px_12px_rgba(79,70,229,0.3)] flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Join HardLink
                    </h1>
                    <p className="mt-2 text-gray-500 font-medium text-sm">Start shrinking your links securely.</p>
                </div>

                <div className="bg-white py-10 px-8 shadow-sm ring-1 ring-gray-900/5 sm:rounded-2xl">
                    {successMessage && (
                        <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-700 text-sm font-medium ring-1 ring-green-600/20 text-center">
                            {successMessage}
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-700 text-sm font-medium ring-1 ring-red-600/20">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-6">
                        <div className="flex flex-col sm:flex-row gap-5">
                            <div className="w-full sm:w-1/2">
                                <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">First name</label>
                                <input type="text" required className="block w-full rounded-md border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={FirstName} onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div className="w-full sm:w-1/2">
                                <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">Last name</label>
                                <input type="text" required className="block w-full rounded-md border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={LastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">Email address</label>
                            <input type="email" required className="block w-full rounded-md border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={Email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">Password</label>
                            <input type="password" required className="block w-full rounded-md border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={password} onChange={(e) => setpassword(e.target.value)} />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-2 rounded-md bg-indigo-600 px-3.5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {loading ? 'Creating Account...' : 'Register'}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-500">
                        Already have an account? <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Log in instead</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
