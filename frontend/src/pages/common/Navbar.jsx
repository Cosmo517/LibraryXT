import clsx from 'clsx'
import { useLocation } from 'react-router-dom';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export const Navbar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="bg-white border-y-2 border-gray-500">
            <div className="max-w-screen-xl flex flex-wrap mx-auto p-4 justify-center">
                <ul className="font-medium text-lg flex flex-row bg-white space-x-8">
                    <li>
                        <a href="/" className={clsx("py-2", isActive('/') && "md:text-blue-700 font-semibold")}>Home</a>
                    </li>
                    <li>
                        <a href="/search" className={clsx("py-2", isActive('/search') && "md:text-blue-700 font-semibold")}>Search</a>
                    </li>
                    <li>
                        <a href="/create" className={clsx("py-2", isActive('/create') && "md:text-blue-700 font-semibold")}>Create</a>
                    </li>
                </ul>
                <button
                className='ml-10'
                    onClick={() => setIsOpen(!isOpen)}
                >{`${isOpen ? 'Close' : 'Open'} the devtools panel`}</button>
                {isOpen && <ReactQueryDevtoolsPanel onClose={() => setIsOpen(false)} />}
            </div>
        </nav>

    )
}

