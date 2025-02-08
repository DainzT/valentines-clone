import { useState } from "react";
import OpenMeMail from "../components/OpenMeMail"
import MailContent from "../components/MailContent";


const Homepage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenMail = () => {
        setIsOpen(true);
    };

    return (
        <>
            <div className="">
                <OpenMeMail title="Open Me" recipient="Mika" onClick={handleOpenMail}/>
                {isOpen && <MailContent/>}
            </div>
        </>
    );
}

export default Homepage