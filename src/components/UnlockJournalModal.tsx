import { useState } from "react";
import {
    X,
    Eye,
    EyeOff
} from "lucide-react";

interface Props {
    close: () => void;
    unlock: () => void;
    password: string;
    showMessage: (msg: string) => void;
}

export default function UnlockJournalModal({
    close,
    unlock,
    password,
    showMessage
}: Props) {

    const [entered, setEntered] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function submit() {
        if (!entered) {
            showMessage("Enter password");
            return;
        }

        if (entered === password) {
            unlock();
            close();
        }
        else {
            showMessage("Wrong password");
            setEntered("");
        }
    }


    return (
        <div className="modal-bg">
            <div className="modal">
                <button className="close" onClick={close} > <X /> </button>
                <h2> Unlock Journal </h2>
                <div className="password-right">
                    <input type={showPassword ? "text" : "password"}
                        maxLength={4}
                        value={entered}
                        placeholder="Enter password"
                        onChange={e => setEntered(e.target.value)}
                    />
                    {
                        showPassword ?
                            <EyeOff size={25} onClick={() => setShowPassword(false)} className="eye" />
                            :
                            <Eye size={25} onClick={() => setShowPassword(true)} className="eye" />
                    }
                </div>
                <button className="create" onClick={submit} >Unlock</button>
            </div>
        </div>
    )
}