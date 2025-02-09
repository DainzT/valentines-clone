import {useState } from "react";
import Survey from "./SurveyQuestions/Survey";
import TimeInputWithImage from "./TimeInput";
import Mail from "./Mail"

interface SurveyQuestionsProps {
    onClose: () => void;
    questions: string[];
    name: string;
}

const SurveyQuestions: React.FC<SurveyQuestionsProps> = ({onClose, questions, name}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);
    const [noCheckBox, setNoCheckBox] = useState(false);
    const [formData, setFormData] = useState<string[]>([]);
    const [fullData, setFullData] = useState<string[]>([]) 

    const handleYesNoClick = (answer: string) => {
        if (answer === "yes") {
            setTimeout(() => {
                handleNext()
            }, 400);
            setFullData([answer])
        } else {
            setTimeout(() => {
                setNoCheckBox(true); 
            }, 500);
            setTimeout(() => {
                handleNext()
            }, 900);
            setFullData([answer])
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setIsAnswered(true)
            setFullData((prevFullData) => {
                const updatedData = [...prevFullData, ...formData];
                console.log("Updated fullData:", updatedData); // Log updated data immediately
                return updatedData;
            });
            setFormData([])
        } else {
            onClose(); 
        }
    };

    const handleFormSubmit = (data: string[]) => {
        setFormData(data); 
        console.log("Updated FormData:", data);
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="fixed">
                {currentQuestionIndex >= 1 && (
                    <h1
                        className={`absolute font-[Loker] text-[57px] w-[358px] h-[170px] leading-[64px] tracking-[-0.25px]
                            ${currentQuestionIndex === 1 ? 'translate-x-8 -translate-y-34 -rotate-[3.75deg] text-[#CE4A4A]' : ''}
                            ${currentQuestionIndex === 2 ? 'translate-x-20 -translate-y-28 -rotate-[1.63deg] text-[#5CB338]' : ''}
                            ${currentQuestionIndex === 3 ? 'translate-x-20 -translate-y-32 -rotate-[1.63deg] text-[#5CB338]' : ''}
                            ${currentQuestionIndex === 4 ? 'translate-x-20 -translate-y-32 -rotate-[1.63deg] text-[#5CB338]' : ''}
                            ${currentQuestionIndex === 5 ? 'translate-x-20 -translate-y-32 rotate-[0.4deg] text-[#5CB338]' : ''}
                            ${currentQuestionIndex === 6 ? 'translate-x-12 -translate-y-32 rotate-[0.4deg] text-[#5CB338]' : ''}
                            ${currentQuestionIndex === 7 ? 'translate-x-20 -translate-y-32 rotate-[0.4deg] text-[#5CB338]' : ''}
                            ${currentQuestionIndex === 8 ? 'translate-x-12 -translate-y-32 rotate-[0.4deg] text-[#5CB338]' : ''}
                            ${currentQuestionIndex === 9 ? 'translate-x-15 -translate-y-32 rotate-[0.4deg] text-[#5CB338]' : ''}
                            opacity-[33%]
                        `}
                    >
                        {questions[currentQuestionIndex - 1]}
                    </h1>
                )}
                    <h1
                        className={`font-[Loker] text-[57px]  w-[358px] h-[170px] leading-[64px] tracking-[-0.25px]
                            ${currentQuestionIndex === 0 ? 'translate-x-8 -translate-y-34 -rotate-[3.75deg] text-[#CE4A4A]' : ''}
                            ${currentQuestionIndex === 1 ? 'translate-x-20 -translate-y-28 -rotate-[1.63deg] text-[#CE4A4A]' : ''}
                            ${currentQuestionIndex === 2 ? 'translate-x-20 -translate-y-32 -rotate-[1.63deg] text-[#5CB338]' : ''}
                            ${currentQuestionIndex === 3 ? 'translate-x-20 -translate-y-32 -rotate-[1.63deg] text-[#5CB338]' : ''}
                            ${currentQuestionIndex === 4 ? 'translate-x-20 -translate-y-32 rotate-[0.4deg] text-[#5CB338]' : ''}
                            ${currentQuestionIndex === 5 ? 'translate-x-12 -translate-y-32 rotate-[0.4deg] text-[#5CB338]' : ''}
                            ${currentQuestionIndex === 6 ? 'translate-x-20 -translate-y-32 rotate-[0.4deg] text-[#5CB338]' : ''}
                            ${currentQuestionIndex === 7 ? 'translate-x-12 -translate-y-32 rotate-[0.4deg] text-[#5CB338]' : ''}
                            ${currentQuestionIndex === 8 ? 'translate-x-28 -translate-y-32 rotate-[0.4deg] text-[#5CB338]' : ''}
                            ${currentQuestionIndex === 9 ? 'translate-x-15 -translate-y-32 rotate-[0.4deg] text-[#5CB338]' : ''}
                        `}  
                    >
                        {questions[currentQuestionIndex]}
                    </h1>
                
                {currentQuestionIndex === 0 && (
                        <div className="absolute flex gap-5 translate-x-15 -translate-y-36">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <span className="font-[Loker] text-[32px] -translate-x-7 -rotate-[11.81deg]">Yes</span>
                                <input 
                                    type="checkbox" 
                                    className="w-[50px] h-[50px] custom-checkbox" 
                                    onClick={() => handleYesNoClick("yes")}
                                />
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <span className="font-[Loker] text-[32px] translate-x-3 -rotate-[0.25deg]">No</span>
                                <input 
                                    type="checkbox" 
                                    className={`w-[50px] h-[50px] translate-x-6 no-checkbox ${noCheckBox ? "custom-checkbox" : "no-custom-checkbox"}`} 
                                    onClick={() => handleYesNoClick("no")}
                                />
                            </label>
                        </div>
                    )}

                {currentQuestionIndex === 1 && (
                    <div className="absolute flex gap-5 translate-x-15 -translate-y-36">
                        <Survey options={[["Home", "Outside"]]} type="none" onFormSubmit={handleFormSubmit}/>
                       
                    </div>
                )}

                {currentQuestionIndex === 2 && (
                    <div className="absolute flex gap-5 translate-x-15 -translate-y-36">
                        <Survey options={[
                            ["torikatsu", "ramen", "gyoza"], 
                            ["bibimbap", "Tteokbi", "bulgogi", "Kimchi"],
                            ["hummus", "Greek salad", "grilled kebab", "shawarma", "paella"],
                            ["tacos", "burritos", "nachos"],
                            ["risotto", "carbonara", "fetucinne", "pesto"],
                            ]} type="cuisine" 
                            onFormSubmit={handleFormSubmit}
                        />
                    </div>
                )}

                {currentQuestionIndex === 3 && (
                    <div className="absolute flex gap-5 translate-x-15 -translate-y-36">
                        <Survey options={[
                                ["mac n cheese", "mushroom soup", "brocolli", "garlic bread", 
                                "caesar salad", "french fries", "corn & carrots", "mashed potato"]
                            ]} 
                            type="none" 
                            onFormSubmit={handleFormSubmit}
                        />
                    </div>
                )}

                {currentQuestionIndex === 4 && (
                    <div className="absolute flex gap-5 translate-x-15 -translate-y-36">
                        <Survey 
                            options={[
                                ["banana", "berry", "orange", "peach", "apple", "pomegranate"]
                            ]} 
                            type="none" 
                            onFormSubmit={handleFormSubmit}
                        />
                    </div>
                )}

                {currentQuestionIndex === 5 && (
                    <div className="absolute flex gap-5 translate-x-15 -translate-y-36">
                         <Survey 
                            options={[
                                ["cookies", "ice cream", "cake"]
                            ]} 
                            type="none" 
                            onFormSubmit={handleFormSubmit}
                        />
                    </div>
                )}

                {currentQuestionIndex === 6 && (
                    <div className="absolute flex gap-5 translate-x-15 -translate-y-36">
                        <Survey 
                            options={[
                                ["coconut shake", "ice coffee", "green tea", "grape juice", "ice tea", "four seasons", "red wine", "lemonade", "mocktail", "watrmlon shake"]
                            ]} 
                            type="none" 
                            onFormSubmit={handleFormSubmit}
                        />
                    </div>
                )}

                {currentQuestionIndex === 7 && (
                    <div className="absolute flex gap-5 translate-x-15 -translate-y-36">
                        <Survey 
                            options={[
                                ["latenght walks", "sleepover", "painting", "gaming"]
                            ]} 
                            type="none" 
                            onFormSubmit={handleFormSubmit}
                        />
                    </div>
                )}

                {currentQuestionIndex === 8 && (
                    <div className="absolute flex gap-5 -translate-x-1 -translate-y-70">
                        <TimeInputWithImage onFormSubmit={handleFormSubmit}/>
                    </div>
                )}

                {currentQuestionIndex === 9 && (
                    <div className="absolute flex gap-5 -translate-x-1 -translate-y-70">
                        <h1
                            className="font-[Loker] text-[36px] text-[#DA0A0A] translate-x-8 translate-y-4"
                        >
                            Happy VALENTINES!
                        </h1>
                        <p
                            className="absolute font-[Loker] text-[32px] text-[#CE4A4A] translate-x-10 translate-y-20 leading-[64px] tracking-[-0.25px]"
                        >
                            See you on
                        </p>
                        <p
                            className="absolute font-[Loker] text-[64px] text-[#CE4A4A] translate-x-10 w-[350px] translate-y-30 leading-[64px] tracking-[-0.25px]"
                        >
                            February 14, LOVE <br/>
                            .......
                        </p>
                    </div>
                )}
            </div>

            {isAnswered && ( 
                currentQuestionIndex === questions.length - 1 ? (
                    <Mail data={fullData.toString()} 
                        from_name={name}
                        />
                  ) : (
                    <button
                      onClick={handleNext}
                      className="translate-x-25 translate-y-60 inter-font font-bold text-[16px] text-[#FFFFFF] w-[103px] h-[32px] bg-[#61BD3C] rounded-[20px] pl-1"
                    >
                      {`Next ->`}
                    </button>
                  )
                )}
        </div>
    );
};

export default SurveyQuestions;
