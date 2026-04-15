import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import api from '../axios'
import Navbar from './Navbar'

export default function Home() {
    const { user,error } = useSelector((state) => state.auth)
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

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-10 relative flex flex-col items-center justify-center font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
            
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/50 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-200/50 rounded-full blur-[120px]"></div>
                <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-sky-200/40 rounded-full blur-[100px]"></div>
            </div>

            <div className="w-full max-w-[85rem] bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] border border-white overflow-hidden flex flex-col relative z-10 min-h-[85vh]">
                
                <Navbar onSync={fetchdata} />

                <div className="flex flex-col flex-1">
                    <div className="px-6 py-12 md:py-20 flex flex-col items-center justify-center text-center">
                        <span className="px-5 py-1.5 rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                            Workspace Secure
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight mb-10 leading-tight">
                            What will you <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">link</span> today?
                        </h1>

                        <div className="w-full max-w-4xl relative group flex justify-center">
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2.5rem] blur-lg opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 pointer-events-none"></div>
                            
                            <div className="relative w-full bg-white shadow-2xl ring-1 ring-gray-900/5 rounded-[2.25rem] p-2.5 flex flex-col sm:flex-row gap-2 transition-all">
                                
                                <form onSubmit={handleshort} className="flex flex-col sm:flex-row gap-2 w-full">
                                    <div className="flex-1 relative flex items-center">
                                        <div className="absolute left-6 text-gray-400">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                        </div>
                                        <input
                                            type="url"
                                            required
                                            placeholder="Paste your long URL here..."
                                            className="block w-full h-[4.5rem] rounded-[1.75rem] border-0 py-2 pl-16 pr-4 text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600/20 md:text-lg font-medium transition-all"
                                            value={Longurl}
                                            onChange={(e) => setLongurl(e.target.value)}
                                        />
                                    </div>

                                    <div className="hidden sm:flex items-center">
                                        <div className="w-px h-10 bg-gray-200"></div>
                                    </div>

                                    <div className="sm:w-72 relative flex items-center">
                                        <div className="absolute left-5 text-gray-300 font-light text-2xl">/</div>
                                        <input
                                            type="text"
                                            placeholder="custom-alias"
                                            className="block w-full h-[4.5rem] rounded-[1.75rem] border-0 py-2 pl-12 pr-4 text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600/20 md:text-lg font-medium transition-all"
                                            value={customAlias}
                                            onChange={(e) => setCustomAlias(e.target.value)}
                                            pattern="[a-zA-Z0-9-]+"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="h-[4.5rem] mt-2 sm:mt-0 flex items-center justify-center rounded-[1.75rem] bg-gray-900 px-10 text-base font-black text-white shadow-md hover:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 active:scale-[0.98] transition-all whitespace-nowrap"
                                    >
                                        {loading ? 'Creating...' : 'Shorten'}
                                    </button>
                                </form>
                            </div>
                        </div>
                        {errorMsg && (
                            <div className="mt-6 text-sm font-bold text-red-600 bg-red-50/80 backdrop-blur-sm border border-red-100 px-6 py-3 rounded-2xl">
                                {errorMsg}
                             </div>
                        )}
                        {error && (
                            <div className="mt-6 text-sm font-bold text-red-600 bg-red-50/80 backdrop-blur-sm border border-red-100 px-6 py-3 rounded-2xl">
                                {error}
                             </div>
                        )}
                    </div>

                    <div className="flex-1 bg-gray-50/50 border-t border-gray-900/5 px-6 py-12 md:px-12">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
                                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Active Links</h2>
                                <div className="flex items-center gap-6 bg-white shadow-sm ring-1 ring-gray-900/5 px-6 py-3 rounded-2xl">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Total</span>
                                        <span className="text-xl font-black text-gray-900 leading-none">{totalLinks}</span>
                                    </div>
                                    <div className="w-px h-8 bg-gray-200"></div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest leading-none mb-1">Visits</span>
                                        <span className="text-xl font-black text-indigo-600 leading-none">{totalClicks}</span>
                                    </div>
                                </div>
                            </div>

                            {history.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-24 text-center">
                                    <div className="w-24 h-24 bg-white shadow-sm ring-1 ring-gray-900/5 rounded-[2rem] flex items-center justify-center mb-6 text-gray-300">
                                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 mb-2">No links generated</h3>
                                    <p className="text-lg text-gray-500 font-medium">Create your first short link using the input above.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {history.map((item) => {
                                        const fullUrl = `http://localhost:4000/${item.Shorturl}`;
                                        const isCopied = copiedId === item._id;

                                        return (
                                            <div key={item._id} className="bg-white rounded-[2rem] p-7 shadow-sm ring-1 ring-gray-900/5 hover:shadow-xl hover:shadow-indigo-500/10 hover:ring-indigo-100 transition-all duration-300 flex flex-col group relative overflow-hidden">
                                                
                                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                
                                                <div className="flex justify-between items-start mb-6">
                                                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                                    </div>
                                                    <div className="flex flex-col items-end text-right">
                                                        <span className="text-4xl font-black text-gray-900 leading-none tracking-tight">{item.clicks || 0}</span>
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                                            Visits
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="mb-8 flex-1">
                                                    <a href={fullUrl} target="_blank" rel="noreferrer" className="text-xl font-bold text-gray-900 hover:text-indigo-600 truncate block transition-colors mb-2 tracking-tight">
                                                        /{item.Shorturl}
                                                    </a>
                                                    <p className="text-sm font-medium text-gray-500 line-clamp-2 leading-relaxed">
                                                        {item.Longurl}
                                                    </p>
                                                </div>

                                                <button
                                                    onClick={() => copyToClipboard(fullUrl, item._id)}
                                                    className={`w-full py-4 rounded-[1.25rem] flex items-center justify-center gap-2.5 text-sm font-black transition-all duration-300 ${isCopied ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' : 'bg-gray-50 text-gray-600 hover:bg-gray-900 hover:text-white hover:shadow-lg hover:shadow-gray-900/20'}`}
                                                >
                                                    {isCopied ? (
                                                        <>
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                                            Copied!
                                                        </>
                                                    ) : (
                                                        <>
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                                                            Copy URL
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}