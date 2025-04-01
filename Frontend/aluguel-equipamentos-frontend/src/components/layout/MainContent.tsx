const MainContent = ({ children }: any) => {

    const placeholderIcon = (
        <svg
            className="w-3.5 h-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
            />
        </svg>
    );

    return (
        <div className="sm:ml-64">
            <div className="flex h-screen bg-gray-50">
                <div className="flex-1 flex flex-col overflow-hidden">
                    {children}
                </div>
            </div>

        </div>
    );
};

export default MainContent;