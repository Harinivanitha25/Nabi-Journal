import { useState } from "react";
import { X } from "lucide-react";

interface Props{
 close:()=>void;
 create:(
 title:string,
 subtitle:string,
 )=>void;
showMessage: (msg: string) => void;
}
export default function NewJournalModal(
{ close, create , showMessage}:Props ){

const [title,setTitle]=useState("");
const [subtitle,setSubtitle]=useState("");

function submit(){
    if(!title.trim() || !subtitle.trim())
    {
        showMessage("Enter journal name and subtitle");
        setTitle("");
    setSubtitle("");
        return;
    }    
    create(title, subtitle);

    close();
}

return (
    <div className="modal-bg">
        <div className="modal">
            <button className="close" onClick={close}>
            <X/>
            </button>
            <h2> Create Journal </h2>
            <input placeholder="Journal name" value={title} onChange={ e=>setTitle(e.target.value) } />
            <input placeholder="Subtitle" value={subtitle} onChange={ e=>setSubtitle(e.target.value) } />
            <button className="create" onClick={submit}> Create </button>
        </div>
    </div>
)
}