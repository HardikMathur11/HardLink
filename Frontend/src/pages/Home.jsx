import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import api from '../axios'
import Navbar from './Navbar'

export default function Home() {
    const { user, error } = useSelector((state) => state.auth)
    const [Longurl, setLongurl] = useState('')
    const [customAlias, setCustomAlias] = useState('')
    const [history, sethistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [copiedId, setCopiedId] = useState(null);
    const dispatch = useDispatch();

    const fetchdata = async () => {
        try {
            const response = await api.get('/fetchdata')
            sethistory(response.data.reverse())
            setErrorMsg('')
        } catch (error) {
            setErrorMsg(error.response?.data?.message || 'Network error occurred')
        }
    }

    useEffect(() => {
        if (user) fetchdata();
    }, [user])

    const handleshort = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        try {
            await api.post('/short', {
                Longurl,
                userID: user._id,
                customAlias: customAlias || undefined
            });
            setLongurl('');
            setCustomAlias('');
            fetchdata();
        } catch (error) {
            setErrorMsg(error.response?.data?.message || 'Failed to shorten URL');
        } finally {
            setLoading(false);
        }
    }

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    }

    const totalLinks = history.length;
    const totalClicks = history.reduce((sum, item) => sum + (item.clicks || 0), 0);
    const avgClicks = totalLinks > 0 ? (totalClicks / totalLinks).toFixed(1) : '—';

    return (
        <div className="min-h-screen bg-[#F7F7F8] text-gray-900 font-sans selection:bg-indigo-100 flex flex-col">

            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[120px] opacity-70"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-50 rounded-full blur-[100px] opacity-60"></div>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar onSync={fetchdata} />

                <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-600 text-[10px] font-bold tracking-[0.1em] uppercase mb-6">
                            Link Simplified
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-4 text-gray-900">
                            Shorten. Share.{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Track.</span>
                        </h1>
                        <p className="text-gray-500 text-base max-w-md mx-auto">
                            Create short URLs, set custom aliases, and monitor clicks — all in one place.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-2 mb-6">
                        <form onSubmit={handleshort} className="flex flex-col sm:flex-row gap-2">
                            <div className="flex-1 flex items-center gap-3 px-4 rounded-xl bg-gray-50 border border-gray-100">
                                <svg className="w-4 h-4 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                <input
                                    type="url"
                                    required
                                    placeholder="https://paste-your-long-url-here.com"
                                    className="flex-1 h-11 bg-transparent border-0 text-gray-800 placeholder:text-gray-400 focus:ring-0 text-sm font-medium"
                                    value={Longurl}
                                    onChange={(e) => setLongurl(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center gap-2 px-4 rounded-xl bg-gray-50 border border-gray-100 sm:w-48">
                                <span className="text-gray-300 font-mono text-lg font-light">/</span>
                                <input
                                    type="text"
                                    placeholder="custom alias"
                                    className="flex-1 h-11 bg-transparent border-0 text-gray-800 placeholder:text-gray-400 focus:ring-0 text-sm font-medium"
                                    value={customAlias}
                                    onChange={(e) => setCustomAlias(e.target.value)}
                                    pattern="[a-zA-Z0-9-]+"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="h-11 px-7 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-sm transition-all disabled:opacity-50 whitespace-nowrap shadow-sm flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                    </svg>
                                ) : 'Shorten →'}
                            </button>
                        </form>
                    </div>

                    {(errorMsg || error) && (
                        <div className="mb-6 flex items-center gap-2 text-sm font-medium text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">
                            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" /></svg>
                            {errorMsg || error}
                        </div>
                    )}

                    <div className="grid grid-cols-3 gap-3 mb-10">
                        {[
                            { label: 'Total Links', value: totalLinks, accent: 'text-gray-900' },
                            { label: 'Total Clicks', value: totalClicks, accent: 'text-indigo-600' },
                            { label: 'Avg. Clicks', value: avgClicks, accent: 'text-violet-600' },
                        ].map((stat) => (
                            <div key={stat.label} className="bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
                                <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">{stat.label}</div>
                                <div className={`text-2xl font-black ${stat.accent}`}>{stat.value}</div>
                            </div>
                        ))}
                    </div>

                    {history.length > 0 && (
                        <div className="flex items-center gap-3 mb-5">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Your Links</span>
                            <div className="flex-1 h-px bg-gray-200"></div>
                            <span className="text-xs text-gray-400">{totalLinks} total</span>
                        </div>
                    )}

                    {history.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-gray-200 rounded-2xl bg-white">
                            <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center mb-4 text-gray-300">
                                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                            </div>
                            <h3 className="text-base font-bold text-gray-700 mb-1">No links yet</h3>
                            <p className="text-sm text-gray-400">Paste a URL above to create your first short link.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-16">
                            {history.map((item) => {
                                const fullUrl = `${import.meta.env.VITE_API_URL}/${item.Shorturl}`;
                                const isCopied = copiedId === item._id;

                                return (
                                    <div key={item._id} className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-indigo-200 hover:shadow-md transition-all duration-200 flex flex-col group shadow-sm">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-500 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-black text-gray-900">{item.clicks || 0}</div>
                                                <div className="flex items-center justify-end gap-1 mt-0.5">
                                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">clicks</span>
                                                </div>
                                            </div>
                                        </div>

                                        <a
                                            href={fullUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 truncate block transition-colors mb-1"
                                        >
                                            {fullUrl}
                                        </a>
                                        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4 flex-1 break-all">
                                            {item.Longurl}
                                        </p>

                                        <button
                                            onClick={() => copyToClipboard(fullUrl, item._id)}
                                            className={`w-full py-2 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold transition-all duration-200 ${isCopied
                                                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                                                    : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900'
                                                }`}
                                        >
                                            {isCopied ? (
                                                <>
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                                    Copied!
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                                    Copy link
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}