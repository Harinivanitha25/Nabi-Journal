import { useState } from "react";
import { v4 as uuid } from "uuid";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import NewJournalModal from "./components/NewJournalModal";
import JournalCard from "./components/JournalCard";

import {
getJournals,
saveJournals
} from "./data/journalStorage";

import { type Journal } from "./types/Journal";
import "./style.css";

function App(){

const [journals,setJournals] = useState<Journal[]>(getJournals());
const [search,setSearch] = useState("");
const [showModal,setShowModal] = useState(false);

function createJournal(
title:string,
subtitle:string,
locked:boolean,
password:string
)

{
const newJournal:Journal={
    id:uuid(),
    title:title,
    subtitle:subtitle,
    created:
    new Date()
    .toLocaleDateString(),
    favorite:false,
    locked:locked,
    password:
    locked ? password : undefined
};

const updated=[ newJournal, ...journals ];
setJournals(updated);
saveJournals(updated);
}

function deleteJournal(id:string){
      const updated = journals.filter( (j)=>j.id!==id );
      setJournals(updated);
      saveJournals(updated);
}

function favoriteJournal(id:string){

    let updated = journals.map((j)=>{

        if(j.id===id){

            return {
                ...j,
                favorite: !j.favorite
            }

        }

        return j;

    });


    updated.sort(
        (a,b)=>
        Number(b.favorite)-Number(a.favorite)
    );


    setJournals(updated);

    saveJournals(updated);
}
function renameJournal(

id:string,
title:string,
subtitle:string

){


const updated =
journals.map(j=>

j.id===id

?

{
...j,
title,
subtitle
}

:

j

);


setJournals(updated);

saveJournals(updated);

}






function lockJournal(

id:string,
password:string

){


const updated =
journals.map(j=>

j.id===id

?

{
...j,
locked:true,
password
}

:

j

);


setJournals(updated);

saveJournals(updated);


}




function unlockJournal(id:string){


const updated =
journals.map(j=>

j.id===id

?

{
...j,
locked:false
}

:

j

);


setJournals(updated);

saveJournals(updated);



updated.sort( (a,b)=> Number(b.favorite) - Number(a.favorite) );
setJournals(updated);
saveJournals(updated);
}

const filteredJournals = journals.filter((j)=> j.title.toLowerCase().includes( search.toLowerCase() ) ||j.subtitle.toLowerCase().includes(search.toLowerCase()));

return (
<div className="app">
<Header />
<SearchBar
search={search}
setSearch={setSearch}
openModal={
()=>setShowModal(true)
}
/>
<div className="books">

{ filteredJournals.length===0 ?
<div className="empty">
No journals found
</div>
:
filteredJournals.map(

(journal)=>( <JournalCard
key={journal.id}
journal={journal}

deleteJournal={deleteJournal}

favoriteJournal={favoriteJournal}

renameJournal={renameJournal}

lockJournal={lockJournal}

unlockJournal={unlockJournal}

/>
))}
</div>
{
showModal && <NewJournalModal close={ ()=>setShowModal(false) } create={ createJournal }/>
}
</div>
);
}
export default App;