import { useState } from "react";
import { X , Eye,
    EyeOff} from "lucide-react";


interface Props {
    close: () => void;
    password: string;
    open: () => void;
    showMessage: (msg: string) => void;
}

export default function OpenBookModal({
    close,
    password,
    open,
    showMessage
}: Props) {

    const [input, setInput] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function submit() {
        if (input === password) {
            open();
        }
        else {
            showMessage("Wrong password");
            setInput("");
        }
    }

    return (
        <div className="modal-bg">
            <div className="modal" style={{ width:"570px" , height:"410px"}}>
                <button className="close" onClick={close}>
                    <X />
                </button>
                <h2 style={{fontSize:"41px"}}>
                    Enter password
                </h2>
                <div className="password-right" style={{ marginBottom:"6px"}}>
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                {
                    showPassword ?
                        <EyeOff size={25} onClick={() => setShowPassword(false)} className="eye" />
                        :
                        <Eye size={25} onClick={() => setShowPassword(true)} className="eye" />
                }
                </div>
                <button className="create" onClick={submit}> Open </button>
            </div>
        </div>
    )
}