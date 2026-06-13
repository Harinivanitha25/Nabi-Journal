import { Search, Plus } from "lucide-react";

interface Props {
    search: string;
    setSearch: (value:string)=>void;
    openModal: ()=>void;
}

export default function SearchBar({
    search,
    setSearch,
    openModal
}: Props) 
{

return (
<div className="search-section">
    <div className="search-box">
        <Search size={25} />
        <input
            type="text"
            value={search}
            onChange={(e)=>
                setSearch(e.target.value)
            }
            placeholder="Search  Journal" style={{marginTop: '12px' }}
        />
    </div>
    <button
        className="new-button"
        onClick={openModal}>
        <Plus size={22}/>
        <span className="button-text">New Journal</span>
    </button>


</div>

)

}