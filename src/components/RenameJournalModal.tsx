import { useState } from "react";
import { X } from "lucide-react";

interface Props {
    close: () => void;
    save: (
        title: string,
        subtitle: string
    ) => void;
    title: string;
    subtitle: string;
}


export default function RenameJournalModal({
    close,
    save,
    title,
    subtitle
}: Props) {

    const [newTitle, setNewTitle] = useState(title);
    const [newSubtitle, setNewSubtitle] = useState(subtitle);

    function submit() {
        if (!newTitle.trim())
            return;
        save(newTitle, newSubtitle);
        close();
    }

    return (
        <div className="modal-bg">
            <div className="modal">
                <button className="close" onClick={close} > <X /> </button>
                <h2> Rename Journal </h2>
                <input value={newTitle} placeholder="Journal name" onChange={e => setNewTitle(e.target.value)} />
                <input value={newSubtitle} placeholder="Subtitle" onChange={e => setNewSubtitle(e.target.value)} />
                <button className="create" onClick={submit}> Save </button>
            </div>
        </div>
    )
}