
export interface HeaderProps {
    title: string;
}


const Header = () => {
    return (
        <>
            <header className="bg-white border border-x-white">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-96">
                        {/* <FiSearch className="text-gray-500 mr-2" /> */}
                        <input
                            type="text"
                            placeholder="Pesquisar equipamentos, clientes..."
                            className="bg-transparent border-none focus:outline-none w-full"
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 rounded-full hover:bg-gray-100 relative">
                            {/* <FiBell className="text-gray-600" /> */}
                            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                        </button>
                        <div className="flex items-center">
                            <img
                                src="https://via.placeholder.com/40"
                                alt="User"
                                className="w-8 h-8 rounded-full"
                            />
                            <span className="ml-2 text-sm font-medium">Admin</span>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;