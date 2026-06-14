import { Heart, Trash, Pencil, Lock, Unlock } from "lucide-react";
import { type Journal } from "../types/Journal";

interface Props {
    journal: Journal;
    deleteJournal: (id: string) => void;
    favoriteJournal: (id: string) => void;
    lockJournal: (id: string, password: string) => void;
    unlockJournal: (id: string) => void;
    openLock: (journal: Journal) => void;
    openUnlock: (journal: Journal) => void;
    openRename: (journal: Journal) => void;
}

export default function JournalCard(
    {
        journal,
        deleteJournal,
        favoriteJournal,
        openRename,
        openLock,
        openUnlock
    }: Props) {

    return (
        <div className="card">
            {
                journal.locked ?
                    <Lock size={20} />
                    :
                    <Unlock size={20} />
            }
            <div className="middle">
                <>
                    <h2> {journal.title} </h2>
                    <p> {journal.subtitle} </p>
                </>
            </div>
            <div className="bottom">
                <Heart onClick={() => favoriteJournal(journal.id)} size={21} fill={journal.favorite ? "white" : "none"} />
                <Pencil size={20} onClick={() => openRename(journal)} style={{ cursor: "pointer" }} />
                <Trash size={20} onClick={() => deleteJournal(journal.id)} style={{ cursor: "pointer" }} />
                {
                    journal.locked ?
                        <Lock
                            size={20}
                            onClick={() =>
                                openUnlock(journal)
                            }
                            style={{ cursor: "pointer" }}
                        />
                        :
                        <Unlock
                            size={20}
                            onClick={() =>
                                openLock(journal)
                            }
                            style={{ cursor: "pointer" }}
                        />
                }
                <span> {journal.created} </span>
            </div>
        </div>
    )
}