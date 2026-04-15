import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/authslice';

export default function Navbar({ onSync }) {
    const { user,error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <nav className="relative z-50 px-6 py-5 border-b border-gray-900/5">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex justify-between w-full h-12 items-center">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-10 h-10 bg-gray-900 rounded-[0.8rem] shadow-xl shadow-gray-900/20 flex items-center justify-center transform group-hover:scale-105 transition-all duration-300">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                        </div>
                        <span className="text-2xl font-black tracking-tight text-gray-900">Hard<span className="text-indigo-600">Link</span></span>
                    </div>
                    <div className="flex items-center gap-5">
                        {onSync && (
                            <button
                                onClick={onSync}
                                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5 hover:bg-gray-50 hover:shadow text-gray-700 text-sm font-bold transition-all"
                            >
                                <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                Sync
                            </button>
                        )}
                        <div className="w-px h-6 bg-gray-200 hidden sm:block"></div>
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-inner font-bold text-sm">
                                {user?.FirstName?.charAt(0)}
                            </div>
                            <span className="text-sm font-bold text-gray-800 hidden md:block">{user?.FirstName}</span>
                        </div>
                        <button
                            onClick={() => dispatch(logoutUser())}
                            className="text-sm font-bold text-gray-400 hover:text-red-500 transition-colors ml-2"
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
