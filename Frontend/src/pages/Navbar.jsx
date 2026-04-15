import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/authslice';

export default function Navbar({ onSync }) {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">

                <div className="flex items-center gap-2.5 group cursor-pointer">
                    <div className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-indigo-600 transition-colors">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                    </div>
                    <span className="text-sm font-black tracking-tight text-gray-900">Hard<span className="text-indigo-600">Link</span></span>
                </div>

                <div className="flex items-center gap-2">
                    {onSync && (
                        <button
                            onClick={onSync}
                            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-600 hover:text-gray-900 text-xs font-semibold transition-all"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                            Sync
                        </button>
                    )}

                    <div className="w-px h-4 bg-gray-200 mx-1 hidden sm:block"></div>

                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xs font-black text-white">
                            {user?.FirstName?.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-gray-600 hidden md:block">{user?.FirstName}</span>
                    </div>

                    <button
                        onClick={() => dispatch(logoutUser())}
                        className="ml-1 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 border border-red-100 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 text-xs font-bold transition-all"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}
