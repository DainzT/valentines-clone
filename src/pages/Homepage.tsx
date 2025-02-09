import { useState } from "react";
import OpenMeMail from "../components/OpenMeMail"
import MailContent from "../components/MailContent";
import SurveyQuestions from "../components/SurveyQuestions";
import ValentinesDay from "../components/ValentinesDay"

const Homepage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showSurvey, setShowSurvey] = useState(false);
    const [showValentines, setShowValentines] = useState(false);

    const handleOpenMail = () => setIsOpen(true);
    const handleCloseMail = () => setIsOpen(false);

    const handleOpenSurvey = () => {
        setShowSurvey(true);
        handleCloseMail(); 
    };
    const handleCloseSurvey = () => setShowSurvey(false);

    const handleOpenValentines = () => {
        setShowValentines(true);
        handleCloseMail();
        console.log("Valentines modal should open:", showValentines);
    };
    const handleCloseValentines = () => setShowValentines(false);

    return (
        <div className="">
            <div className={` ${isOpen || showSurvey || showValentines? "opacity-20 transition-opacity duration-200" : "opacity-100"}`}> 
                <OpenMeMail title="Open Me" recipient="Mika" onClick={handleOpenMail}/>
            </div> 
            
                {isOpen && 
                    <MailContent 
                        onClose={handleCloseMail}
                        onInvoiceClick={(item) => {
                            if (item === "Valentines Survey") {
                                handleOpenSurvey();
                            } else if (item === "Feb 14") {
                                handleOpenValentines();
                            } else {
                                console.log(item);
                            }
                        }}
                        invoices={["Valentines Survey", "Feb 14"]}
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
                        name="Mika"
                    />
                }
                {showValentines && 
                    <ValentinesDay onClose={handleCloseValentines} />
                }
        </div>
    );
}

export default Homepage