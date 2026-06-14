interface Props {
    message: string;
    show: boolean;
}

export default function Toast({
    message,
    show
}: Props) {
    if (!show)
        return null;
    return (
        <div className="toast">
            {message}
        </div>
    )
}