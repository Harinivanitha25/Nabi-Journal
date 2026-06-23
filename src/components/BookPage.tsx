import { ArrowLeft,ArrowRight } from "lucide-react";
import { type Journal } from "../types/Journal";

interface Props {
    journal: Journal;
    back: () => void;
}

export default function BookPage({journal, back}:Props){
    return(
        <div className="book-page">
            <button className="library-btn" onClick={back}>
                <ArrowLeft size={25} style={{marginBottom:"5px"}}/>
                library
            </button>
            <div className="cover">
                <h1>
                    {journal.title}
                </h1>
                <h3>
                    {journal.subtitle}
                </h3>
                <span>
                    {journal.created}
                </span>
            </div>

            <div className="page-nav">
                <button>
                    <ArrowLeft  size={30} style={{marginTop:"5px"}}/>
                </button>
                <p>
                    0/5
                </p>
                <button>
                 <ArrowRight size={30} style={{marginTop:"5px"}}/>
                </button>
            </div>
        </div>
    )
}