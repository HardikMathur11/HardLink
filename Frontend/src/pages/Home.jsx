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
    const avgClicks = totalLinks > 0 ? (totalClicks / totalLinks).toFixed(1) : 0;

    return (
        <div className="min-h-screen bg-[#0A0A0F] text-white font-sans selection:bg-indigo-500/30 flex flex-col">

            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-[100px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-950/30 rounded-full blur-[120px]"></div>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar onSync={fetchdata} />

                <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

                    <div className="text-center mb-14">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold tracking-wider uppercase mb-6">
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></span>
                            Link Simplified
                        </div>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-5">
                            Shorten. Share.{' '}
                            <span className="relative">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Track.</span>
                            </span>
                        </h1>
                        <p className="text-slate-500 text-lg max-w-lg mx-auto leading-relaxed">
                            Your personal link management workspace. Create short URLs, set custom aliases, and monitor clicks in real‑time.
                        </p>
                    </div>

                    <div className="relative mb-8">
                        <div className="absolute -inset-px bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-pink-500/50 rounded-[1.5rem] blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                        <form
                            onSubmit={handleshort}
                            className="group relative flex flex-col sm:flex-row items-stretch gap-2 bg-[#111118] border border-white/10 rounded-[1.4rem] p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] hover:border-white/15 transition-colors"
                        >
                            <div className="flex-1 flex items-center gap-3 px-4 rounded-[1.1rem] bg-white/[0.03] border border-white/5">
                                <svg className="w-5 h-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                <input
                                    type="url"
                                    required
                                    placeholder="https://your-very-long-url.com/goes-here"
                                    className="flex-1 h-12 bg-transparent border-0 text-white placeholder:text-slate-600 focus:ring-0 text-sm md:text-base font-medium"
                                    value={Longurl}
                                    onChange={(e) => setLongurl(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center gap-2 px-4 rounded-[1.1rem] bg-white/[0.03] border border-white/5 sm:w-52">
                                <span className="text-slate-700 font-mono text-base font-bold">/</span>
                                <input
                                    type="text"
                                    placeholder="alias (optional)"
                                    className="flex-1 h-12 bg-transparent border-0 text-white placeholder:text-slate-600 focus:ring-0 text-sm font-medium"
                                    value={customAlias}
                                    onChange={(e) => setCustomAlias(e.target.value)}
                                    pattern="[a-zA-Z0-9-]+"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="h-12 sm:h-auto px-7 rounded-[1.1rem] bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all active:scale-[0.97] disabled:opacity-50 whitespace-nowrap shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                    </svg>
                                ) : (
                                    <>
                                        Shorten
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7"/></svg>
                                    </>
                                )}
                            </button>
                        </form>

                        {(errorMsg || error) && (
                            <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-2.5 rounded-xl">
                                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z"/></svg>
                                {errorMsg || error}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-12">
                        {[
                            { label: 'Total Links', value: totalLinks, color: 'text-white' },
                            { label: 'Total Clicks', value: totalClicks, color: 'text-indigo-400' },
                            { label: 'Avg. Clicks', value: avgClicks, color: 'text-emerald-400' },
                        ].map((stat) => (
                            <div key={stat.label} className="bg-[#111118] border border-white/8 rounded-2xl px-5 py-4 flex flex-col gap-1">
                                <span className="text-xs text-slate-600 font-semibold uppercase tracking-wider">{stat.label}</span>
                                <span className={`text-2xl font-black ${stat.color}`}>{stat.value}</span>
                            </div>
                        ))}
                    </div>

                    {history.length > 0 && (
                        <div className="mb-6 flex items-center gap-3">
                            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Active Links</h2>
                            <div className="flex-1 h-px bg-white/5"></div>
                            <span className="text-xs text-slate-700 font-semibold">{totalLinks} total</span>
                        </div>
                    )}

                    {history.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-white/10 rounded-[1.5rem]">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 text-slate-700">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                            </div>
                            <h3 className="text-lg font-bold text-slate-400 mb-1">No links yet</h3>
                            <p className="text-slate-700 text-sm">Paste a URL above to create your first short link.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-16">
                            {history.map((item) => {
                                const fullUrl = `${import.meta.env.VITE_API_URL}/${item.Shorturl}`;
                                const isCopied = copiedId === item._id;

                                return (
                                    <div
                                        key={item._id}
                                        className="group bg-[#111118] border border-white/8 rounded-[1.4rem] p-5 hover:border-indigo-500/30 hover:bg-[#13131f] transition-all duration-200 flex flex-col"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-black text-white">{item.clicks || 0}</div>
                                                <div className="flex items-center justify-end gap-1 mt-0.5">
                                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                                    <span className="text-[10px] text-slate-600 font-semibold uppercase tracking-wider">clicks</span>
                                                </div>
                                            </div>
                                        </div>

                                        <a
                                            href={fullUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-sm font-bold text-indigo-400 hover:text-indigo-300 truncate block transition-colors mb-1"
                                        >
                                            {fullUrl}
                                        </a>
                                        <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed mb-5 flex-1 break-all">
                                            {item.Longurl}
                                        </p>

                                        <button
                                            onClick={() => copyToClipboard(fullUrl, item._id)}
                                            className={`w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all duration-200 ${
                                                isCopied
                                                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                                                    : 'bg-white/[0.04] text-slate-500 border border-white/8 hover:bg-indigo-600 hover:text-white hover:border-indigo-600'
                                            }`}
                                        >
                                            {isCopied ? (
                                                <>
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                                    Copied to clipboard
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