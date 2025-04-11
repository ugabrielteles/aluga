import { Link } from "react-router-dom"

export interface PageHeaderProps {
    Addlink: string;
    Title: string;
    Description?: string;
    ButtonText?: string;
    ShowAddButton?: boolean;
}

const PageHeader = ({ Addlink, Title, Description, ButtonText, ShowAddButton }: PageHeaderProps) => {
    return (
        <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">{Title}</h1>
                {Description && <p className="mt-2 text-sm text-gray-700">
                    {Description}
                </p>}
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                {(ShowAddButton ?? true) && <Link 
                    to={Addlink}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                >
                    {ButtonText ?? "Adicionar"}
                </Link>}
            </div>
        </div>
    )
}

export default PageHeader;