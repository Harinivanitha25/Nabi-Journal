import { Heart, Trash, Pencil, Lock, Unlock } from "lucide-react";
import {type Journal} from "../types/Journal";
import {useState} from "react";
interface Props{  
    journal:Journal; 
    deleteJournal:(id:string)=>void;
    favoriteJournal:(id:string)=>void;
    renameJournal:(
                    id:string,
                    title:string,
                    subtitle:string
                    )=>void;
    lockJournal:(
                    id:string,
                    password:string
                    )=>void;
    unlockJournal:(id:string)=>void;
}

export default function JournalCard(
{
journal,
deleteJournal,
favoriteJournal,
renameJournal,
lockJournal,
unlockJournal
}:Props ){

const [edit,setEdit]=useState(false);
const [title,setTitle]=useState(journal.title);
const [subtitle,setSubtitle]=useState(journal.subtitle);

function rename(){
    renameJournal( journal.id, title, subtitle );
    setEdit(false);
}

function lock(){
    const password = prompt( "Create 4 digit password");
    if(password && password.length===4){
    const confirmPass = prompt("Confirm password");
        if(password===confirmPass){
        lockJournal( journal.id, password );
        }
        else{
        alert("Password not matching");
        }
    }
    else{
    alert(
    "Password must be 4 digits"
    );}
}

function unlock(){
    const password = prompt( "Enter password" );
    if(password===journal.password){
    unlockJournal( journal.id );
    }
    else{ alert( "Wrong password" );
    }
}

return (
<div className="card">
     {
        journal.locked?
        <Lock size={20} />
        :
        <Unlock size={20}  />
    }

    <div className="middle">
      { edit ? <> <input value={title} onChange={ e=>setTitle(e.target.value) }/>
      <input value={subtitle} onChange={ e=>setSubtitle(e.target.value) } />
      <button onClick={rename}> Save </button>
      </> : <>
        <h2> {journal.title} </h2>
        <p> {journal.subtitle} </p>
      </>}
    </div>

    <div className="bottom">
        
        <Heart onClick={()=> favoriteJournal(journal.id)} size={21} fill={ journal.favorite? "white": "none" }/>
        <Pencil size={20} onClick={()=> setEdit(true) } style={{cursor:"pointer"}}/>
        <Trash size={20} onClick={()=>deleteJournal(journal.id)} style={{cursor:"pointer"}}/>
        {journal.locked? <Lock size={20} onClick={unlock} style={{cursor:"pointer"}}/> :<Unlock size={20}  onClick={lock} style={{cursor:"pointer"}}/>}
        <span> {journal.created} </span>

    </div>
</div>


)

}