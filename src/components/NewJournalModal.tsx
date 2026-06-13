import {
useState
} from "react";

import {
X,
Lock
} from "lucide-react";


interface Props{

close:()=>void;

create:(

title:string,
subtitle:string,
locked:boolean,
password:string

)=>void;


}



export default function NewJournalModal(
{
close,
create
}:Props
){


const [title,setTitle]=useState("");

const [subtitle,setSubtitle]=useState("");

const [locked,setLocked]=useState(false);

const [password,setPassword]=useState("");




function submit(){


if(!title)
return;



if(locked && password.length!==4)
{

alert(
"Password must be 4 digits"
)

return;

}



create(
title,
subtitle,
locked,
password
);


close();


}



return (

<div className="modal-bg">



<div className="modal">



<button
className="close"
onClick={close}
>

<X/>

</button>



<h2>
Create Journal
</h2>




<input

placeholder="Journal name"

onChange={
e=>setTitle(e.target.value)
}

/>



<input

placeholder="Subtitle"

onChange={
e=>setSubtitle(e.target.value)
}

/>



<div className="lock-option">


<label>

<input

type="checkbox"

onChange={
e=>setLocked(
e.target.checked
)
}

/>


Lock Journal


</label>


{
locked &&

<div className="password">


<Lock size={20}/>


<input

maxLength={4}

placeholder="4 digit password"

type="password"


onChange={
e=>setPassword(e.target.value)
}


/>


</div>

}



</div>



<button

className="create"

onClick={submit}

>

Create


</button>



</div>



</div>


)


}