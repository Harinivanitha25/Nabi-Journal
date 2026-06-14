import { useState } from "react";
import {
    X,
    Eye,
    EyeOff
} from "lucide-react";

interface Props {
    close: () => void;
    save: (password: string) => void;
    showMessage: (msg: string) => void;
}

export default function LockJournalModal({
    close,
    save,
    showMessage
}: Props) {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    function submit() {
        if (password.length !== 4) {
            showMessage(
                "Password must be 4 digits"
            );
            setPassword("");
            setConfirm("");
            return;
        }
        if (password !== confirm) {
            showMessage(
                "Password does not match"
            );
            setPassword("");
            setConfirm("");
            return;
        }
        save(password);
        setPassword("");
        setConfirm("");
        close();
    }

    return (
        <div className="modal-bg">
            <div className="modal">
                <button
                    className="close"
                    onClick={close}
                >
                <X />
                </button>
                <h2>
                    Lock Journal
                </h2>
                <div className="password-input">
                    <input
                        type={
                            showPassword
                                ?
                                "text"
                                :
                                "password"
                        }
                        maxLength={4}
                        placeholder="Create password"
                        value={password}
                        onChange={
                            e => setPassword(e.target.value)
                        }
                    />
                    {
                        showPassword ?
                            <EyeOff
                                size={25}
                                onClick={() =>
                                    setShowPassword(false)
                                }
                                className="eye"
                            />
                            :
                            <Eye
                                size={25}
                                onClick={() =>
                                    setShowPassword(true)
                                }
                                className="eye"
                            />
                    }
                </div>
                <div className="password-input">
                    <input
                        maxLength={4}
                        placeholder="Confirm password"
                        value={confirm}
                        onChange={
                            e => setConfirm(e.target.value)
                        }
                        type={
                            showConfirm
                                ?
                                "text"
                                :
                                "password"
                        }
                    />
                    {
                        showConfirm ?
                            <EyeOff
                                size={25}
                                onClick={() =>
                                    setShowConfirm(false)
                                }
                                className="eye"
                            />
                            :
                            <Eye
                                size={25}
                                onClick={() =>
                                    setShowConfirm(true)
                                }
                                className="eye"
                            />
                    }
                </div>
                <button className="create" onClick={submit}>
                    Lock
                </button>
            </div>
        </div>
    )
}