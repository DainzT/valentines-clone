import { useState } from "react";
import OpenMeMail from "../components/OpenMeMail"
import MailContent from "../components/MailContent";
import SurveyQuestions from "../components/SurveyQuestions";

const Homepage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showSurvey, setShowSurvey] = useState(false);

    const handleOpenMail = () => setIsOpen(true);
    const handleCloseMail = () => setIsOpen(false);
    const handleOpenSurvey = () => {
        setShowSurvey(true);
        handleCloseMail(); 
    };
    const handleCloseSurvey = () => setShowSurvey(false);

    return (
        <div>
            <div className={` ${isOpen || showSurvey ? "opacity-20 transition-opacity duration-200" : "opacity-100"}`}> 
                <OpenMeMail title="Open Me" recipient="Mika" onClick={handleOpenMail}/>
            </div> 
                {isOpen && 
                    <MailContent 
                        onClose={handleCloseMail}
                        onInvoiceClick={(item) => {
                            if (item === "Valentines Survey") {
                                handleOpenSurvey();
                            } else {
                                console.log(item);
                            }
                        }}
                        invoices={["Valentines Survey"]}
                    />
                }
                {showSurvey && 
                    <SurveyQuestions 
                        onClose={handleCloseSurvey}
                        questions={ [
                            "Can I be your VALENTINE?",
                            "Perfect!",
                            "Hungry?",
                            "Side(s)!?",
                            "Fruit(s)?",
                            "dessert(s)?",
                            "drink(s)",
                            "activity(s)¿",
                            "TIme?",
                            "GREAT! <3!"
                        ]}
                    />
                }
        </div>
    );
}

export default Homepage