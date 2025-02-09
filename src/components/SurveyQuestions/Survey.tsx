import { useState } from "react";
import location from "../../assets/location_on.png"

interface QuestionsProps {
    options:string[][];
    type: "cuisine" | "none";
    onFormSubmit: (formData: string[]) => void;
}

const Survey: React.FC<QuestionsProps> = ({options, type, onFormSubmit}) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [formData, setFormData] = useState<string[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [otherOptions, setOtherOptions] = useState<string>("")

    const handleCuisineChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const index = cuisineOptions.indexOf(selectedValue); 
        setSelectedIndex(index); 
    };

    const cuisineOptions = [
        "Japanese",
        "Korean",
        "Mediterranean",
        "Mexican",
        "Italian",
    ];

    const handleCheckboxChange = (option: string, isChecked: boolean) => {
        const updatedFormData = isChecked
        ? [...formData, option] 
        : formData.filter((item) => item !== option);

        setSelectedOptions(updatedFormData); 
        setFormData(updatedFormData); 

        console.log("Form data updated:", updatedFormData);
        onFormSubmit(updatedFormData);  
    };

    const handleOtherOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedOtherOption = event.target.value;
    
        setOtherOptions(updatedOtherOption);

        const updatedFormData = updatedOtherOption
            ? formData.filter((item) => item !== otherOptions).concat(updatedOtherOption)
            : formData.filter((item) => item !== otherOptions); 
            
        setFormData(updatedFormData); 
        console.log("Form data updated:", updatedFormData);
        onFormSubmit(updatedFormData); 
    };


    const renderCheckbox = () => {
        if (options[0].length === 2 && type === "none") {
            return (
                <div className="flex flex-col gap-10 -translate-y-7 translate-x-4">
                    <img src={location} alt="location" className="absolute w-[112px] h-[114px] -translate-x-22"/>
                    {options[0].map((option, index) => (
                        <label key={index} className="flex items-center gap-2 cursor-pointer">
                            <span
                                className={`font-[Loker] text-[32px]
                                    ${index == 1 ? "-rotate-[5.37deg]" : ""}
                                `}
                            >
                                {option}
                            </span>
                            <input 
                                type="checkbox" 
                                className={`w-[50px] h-[50px] translate-x-5 select-checkbox-one
                                    ${index == 0 ? "translate-x-14": ""}
                                `}
                                checked={selectedOptions.includes(option)} 
                                onChange={(e) =>
                                handleCheckboxChange(option, e.target.checked)
                                }
                            />
                        </label>
                    ))}
                </div>
            );
        } else if (type === "cuisine"){
            return (
                <div>
                    <div className="relative -translate-x-10 -translate-y-42">
                        <select
                            value={selectedIndex !== null ? cuisineOptions[selectedIndex] : ""}
                            onChange={handleCuisineChange}
                            className="w-[118px] h-[35px] outline-1 rounded-[10px] pl-3 cursor-pointer inter-font text-[16px] font-bold "
                        >
                            {cuisineOptions.map((cuisine, index) => (
                                <option key={index} value={cuisine}
                                >
                                    {cuisine}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="translate-x-5 -translate-y-23 w-[260px] h-[200px] overflow-x-hidden flex flex-col gap-5">
                        {options[selectedIndex].map((option, index) => (
                            <label key={index} className="flex items-center gap-0 cursor-pointer">
                                <span
                                    className={`font-[Loker] text-[24px]
                                    `}
                                >
                                    {option}
                                </span>
                                <input 
                                    type="checkbox" 
                                    className={`w-[45px] h-[45px] translate-x-10 select-checkbox leading-[25px] 
                                    `}
                                    checked={selectedOptions.includes(option)} 
                                    onChange={(e) =>
                                        handleCheckboxChange(option, e.target.checked)
                                    }
                                />
                            </label>
                        ))}
                    </div>
                    <div className="-translate-x-10 -translate-y-15">
                        <span className="font-[Loker] text-[24px] ">
                            Others:
                        </span>
                        <input 
                            type="text" 
                            className="text-[24px] font-[Loker] outline-none translate-x-7 border-b-1 w-[198px]" 
                            onChange={handleOtherOptionChange}  
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div>
                        <div className="-translate-x-1 -translate-y-18 w-[260px] h-[200px] overflow-x-scroll flex flex-col gap-5">
                        {options[0].map((option, index) => (
                            <label 
                                key={index} 
                                className="flex items-center gap-0 cursor-pointer"
                            >
                            <span
                                className="
                                    font-[Loker] text-[24px]
                                "
                            >
                                {option}
                            </span>
                            <input 
                                type="checkbox" 
                                className="
                                    w-[45px] h-[45px] translate-x-10 select-checkbox leading-[25px] 
                                "
                                checked={selectedOptions.includes(option)} 
                                onChange={(e) =>
                                handleCheckboxChange(option, e.target.checked)
                                }
                            />
                        </label>
                        ))}
                        </div>
                        <div className="-translate-x-10 -translate-y-6">
                            <span className="font-[Loker] text-[24px] ">
                                Others:
                            </span>
                            <input 
                                type="text" 
                                className="
                                    text-[24px] font-[Loker] outline-none translate-x-7 border-b-1 w-[198px]
                                " 
                                onChange={handleOtherOptionChange}  
                            />
                        </div>
                    </div>
                </div>
            );
        }
    };

    return (
        <div>
            {renderCheckbox()}
        </div>
    );
};

export default Survey