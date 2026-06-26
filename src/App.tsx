import { useState } from "react";
import { v4 as uuid } from "uuid";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import NewJournalModal from "./components/NewJournalModal";
import JournalCard from "./components/JournalCard";
import RenameJournalModal from "./components/RenameJournalModal";
import LockJournalModal from "./components/LockJournalModal";
import UnlockJournalModal from "./components/UnlockJournalModal";
import Toast from "./components/Toast";
import OpenBookModal from "./components/OpenBookModal";
import OpenBookPage from "./components/OpenBookPage";
import {
    getJournals,
    saveJournals
} from "./data/journalStorage";

import { type Journal } from "./types/Journal";
import "./style.css";

function App() {

    const [message, setMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [journals, setJournals] = useState<Journal[]>(getJournals());
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [renameBook, setRenameBook] = useState<Journal | null>(null);
    const [lockBook, setLockBook] = useState<Journal | null>(null);
    const [unlockBook, setUnlockBook] = useState<Journal | null>(null);
    const [openedJournal, setOpenedJournal] = useState<Journal | null>(null);
    const [openBook, setOpenBook] = useState<Journal | null>(null);
    const [openBookPage, setOpenBookPage] = useState(false);
    function createJournal(
        title: string,
        subtitle: string
    ) {
        const newJournal: Journal = {
            id: uuid(),
            title: title,
            subtitle: subtitle,
            created:
                new Date()
                    .toLocaleDateString(),
            favorite: false,
            locked: false,
            password: undefined
        };

        const updated = [newJournal, ...journals];
        setJournals(updated);
        saveJournals(updated);
    }

    function openJournal(journal: Journal) {
        if (journal.locked) {
            setOpenBook(journal);
        }
        else {
            setOpenedJournal(journal);
        }
    }

    function confirmOpenBook() {
        if (!openBook) return;
        setOpenedJournal(openBook);
        setOpenBook(null);
    }

    function showMessage(text: string) {
        setMessage(text);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 2500);
    }


    function applyLock(password: string) {
        if (!lockBook) return;
        lockJournal(lockBook.id, password);
    }

    function applyUnlock() {
        if (!unlockBook) return;
        unlockJournal(unlockBook.id);
        setUnlockBook(null);
    }

    function deleteJournal(id: string) {
        const updated = journals.filter((j) => j.id !== id);
        setJournals(updated);
        saveJournals(updated);
    }

    function favoriteJournal(id: string) {
        let updated = journals.map((j) => {
            if (j.id === id) {
                return {
                    ...j,
                    favorite: !j.favorite
                }
            }
            return j;
        });
        updated.sort(
            (a, b) =>
                Number(b.favorite) - Number(a.favorite)
        );
        setJournals(updated);
        saveJournals(updated);
    }

    function updateRename(
        title: string,
        subtitle: string
    ) {
        if (!renameBook)
            return;
        const updated = journals.map(j => j.id === renameBook.id ? { ...j, title, subtitle } : j);
        setJournals(updated);
        saveJournals(updated);
    }

    function lockJournal(
        id: string,
        password: string
    ) {
        const updated = journals.map(j => j.id === id ? { ...j, locked: true, password } : j);
        setJournals(updated);
        saveJournals(updated);
    }

    function unlockJournal(id: string) {
        const updated = journals.map(j => j.id === id ? { ...j, locked: false, password: undefined } : j);
        setJournals(updated);
        saveJournals(updated);
    }

    const filteredJournals = journals.filter((j) => j.title.toLowerCase().includes(search.toLowerCase()) || j.subtitle.toLowerCase().includes(search.toLowerCase()));
    if (openedJournal && openBookPage) {
        return (
            <OpenBookPage
                journal={openedJournal}
                back={() => {
                    setOpenBookPage(false);
                    setOpenedJournal(null);
                }}
            />)
    }

    if (openedJournal) {
        return (
            <OpenBookPage
                journal={openedJournal}
                back={() => setOpenedJournal(null)}
            />

        )

    }
    return (

        <div className="app">
            <Header />
            <SearchBar
                search={search}
                setSearch={setSearch}
                openModal={() => setShowModal(true)}
            />
            <div className="books">
                {
                    filteredJournals.length === 0 ?
                        <div className="empty">
                            No journals found
                        </div>
                        :
                        filteredJournals.map(
                            (journal) => (
                                <JournalCard
                                    journal={journal}
                                    openJournal={openJournal}
                                    key={journal.id}
                                    deleteJournal={deleteJournal}
                                    favoriteJournal={favoriteJournal}
                                    openRename={setRenameBook}
                                    openLock={setLockBook}
                                    openUnlock={setUnlockBook}
                                    lockJournal={lockJournal}
                                    unlockJournal={unlockJournal} />
                            ))
                }
            </div>
            {
                showModal &&
                <NewJournalModal close={() => setShowModal(false)} create={createJournal} showMessage={showMessage} />
            }
            {
                renameBook &&
                <RenameJournalModal
                    title={renameBook.title}
                    subtitle={renameBook.subtitle}
                    close={() => setRenameBook(null)} save={updateRename} />
            }
            {
                lockBook &&
                <LockJournalModal close={() => setLockBook(null)} save={applyLock} showMessage={showMessage} />
            }
            {
                unlockBook &&
                <UnlockJournalModal password={unlockBook.password!}
                    close={() => setUnlockBook(null)} unlock={applyUnlock} showMessage={showMessage} />
            }
            {openBook && <OpenBookModal password={openBook.password!} close={() => setOpenBook(null)} open={confirmOpenBook} showMessage={showMessage} />
            }
            <Toast message={message} show={showToast} />
        </div>
    );
}

export default App;