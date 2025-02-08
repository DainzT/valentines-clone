import { useState } from "react";
import location from "../../assets/location_on.png"

interface QuestionsProps {
    options:string[][];
    type: "cuisine" | "none";
}

const Survey: React.FC<QuestionsProps> = ({options, type}) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [formData, setFormData] = useState<string[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

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
        setSelectedOptions((prevData) =>
            isChecked ? [...prevData, option] : prevData.filter((item) => item !== option)
          );
        setFormData((prevData) =>
          isChecked ? [...prevData, option] : prevData.filter((item) => item !== option)
        );
      };

      const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Form data submitted:", formData);
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
                                className={`w-[50px] h-[50px] translate-x-5 select-checkbox
                                    ${index == 0 ? "translate-x-14": ""}
                                `}
                                checked={selectedOptions.includes(option)} // Ensure the checkbox is checked based on the state
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
                    <div className="translate-x-5 -translate-y-23 w-[260px] h-[200px] overflow-x-scroll flex flex-col gap-5">
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
                        <input type="text" className="text-[24px] font-[Loker] outline-none translate-x-7 border-b-1 w-[198px]" />
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div>
                        <div className="-translate-x-1 -translate-y-18 w-[260px] h-[200px] overflow-x-scroll flex flex-col gap-5">
                        {options[0].map((option, index) => (
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
                        <div className="-translate-x-10 -translate-y-6">
                            <span className="font-[Loker] text-[24px] ">
                                Others:
                            </span>
                            <input type="text" className="text-[24px] font-[Loker] outline-none translate-x-7 border-b-1 w-[198px]" />
                        </div>
                    </div>
                </div>
            );
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {renderCheckbox()}
            <button
            type="submit"
            className="mt-5 p-2 bg-blue-500 text-white rounded-md"
            >
            Submit
            </button>
        </form>
    );
};

export default Survey