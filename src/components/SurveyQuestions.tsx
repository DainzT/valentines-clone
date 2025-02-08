import { useState } from "react";

interface SurveyQuestionsProps {
    onClose: () => void;
}

const SurveyQuestions: React.FC<SurveyQuestionsProps> = ({ onClose }) => {
    const questions = [
        "Can I be your VALENTINE",
        "How do you usually celebrate Valentine's Day?",
        "What is your ideal Valentine's Day gift?",
        "Who is your special someone this Valentine's Day? 💖",
    ];
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            console.log("Survey Submitted!");
            onClose(); // Close after the last question
        }
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center z-50">
            <div className="w-[367px] h-[454px] shadow-lg p-6 rounded-lg">
                <h1>{questions[currentQuestionIndex]}</h1>
            </div>
            <button
                 onClick={handleNext}
            >
                 {currentQuestionIndex === questions.length - 1 ? "Done" : "Next"}
            </button>
        </div>
    );
};

export default SurveyQuestions;
