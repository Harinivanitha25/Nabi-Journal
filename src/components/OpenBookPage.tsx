import HTMLFlipBook from "react-pageflip";
import { ArrowLeft } from "lucide-react";
import { useState, useRef } from "react";
import { type Journal } from "../types/Journal";


interface Props {
    journal: Journal;
    back: () => void;
}

export default function OpenBookPage({
    journal,
    back
}: Props) {

    const bookRef = useRef<any>(null);
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState<number[]>([
        1,
        2
    ]);

    const totalPages = Math.ceil(pages.length / 2);

    function nextPage() {
        const flip = bookRef.current?.pageFlip();
        if (!flip) return;
        if (page + 2 >= pages.length) {
            setPages(prev => [
                ...prev,
                prev.length + 1,
                prev.length + 2
            ]);
        }
        flip.flipNext();
    }

    function previousPage() {
        const flip = bookRef.current?.pageFlip();
        if (flip) {
            flip.flipPrev();
        }
    }

    return (
        <div className="book-page">
            <button
                className="library-btn"
                onClick={back}
            >
                <ArrowLeft size={25} />
                library
            </button>
            <h1 className="book-title" style={{ marginTop: "-70px", color: "white", fontWeight: "normal" }}>
                {journal.title}
            </h1>
            <div className="flip-container">


                <HTMLFlipBook
                    ref={bookRef}
                    width={610}
                    height={690}
                    minWidth={300}
                    maxWidth={610}
                    minHeight={400}
                    maxHeight={650}
                    size="fixed"
                    showCover={true}
                    className={`flip-book`}
                    style={{}}
                    startPage={0}
                    startZIndex={0}
                    autoSize={true}
                    maxShadowOpacity={0.5}
                    mobileScrollSupport={true}
                    drawShadow={true}
                    flippingTime={900}
                    usePortrait={false}
                    onFlip={(e: any) => {
                        setPage(e.data);
                    }}
                    showPageCorners={true}
                    disableFlipByClick={false}
                    swipeDistance={30}
                    clickEventForward={true}
                    useMouseEvents={true}
                >

                    <div className="flip-cover">
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

                    {
                        pages.map((item, index) => (

                            <div
                                className={`flip-page ${index % 2 === 0 ? "left-page" : "right-page"
                                    }`}
                                key={item}
                            ><div className="page-number">{item}</div></div>
                        ))
                    }
                </HTMLFlipBook>

            </div>
            <div className="page-nav">
                <button onClick={previousPage}>
                    <ArrowLeft size={30} style={{ marginTop: "8px" }} />
                </button>

                <p>{Math.ceil(page / 2)}/{totalPages}</p>

                <button onClick={nextPage}>
                    <ArrowLeft size={30} style={{ transform: "rotate(180deg)", marginTop: "7px" }} />
                </button>
            </div>
        </div>
    )
}