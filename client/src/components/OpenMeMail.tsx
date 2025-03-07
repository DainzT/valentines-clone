import greenMail from "../assets/GreenMail.png"
import MilkynMocha from "../assets/milk-and-mocha5.gif"

interface OpenMeMailProps {
    title: string;
    recipient: string;
    onClick: () => void;
}


const OpenMeMail: React.FC<OpenMeMailProps> = ({title, recipient, onClick}) => {
    return (
        <div className="flex justify-center items-center h-screen">
             <img 
                src={MilkynMocha} 
                alt="GIF animation" 
                className="absolute w-[170px] h-[170px] translate-x-10 -translate-y-53 scale-x-[-1]"
            />
            <button 
                className="w-[264px] h-[195px] mb-[5rem] rounded-3xl"
                onClick={onClick}
            >
                <img 
                    src={greenMail} 
                    alt="greenMail" 
                    className="w-full h-full opacity-[100%]"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white gap-[5rem] mb-[5rem]">
                    <h1 
                        className="font-[Loker] text-[32px] "
                        style={{ transform: "rotate(1.09deg)" }}
                    >
                        {title}
                    </h1>
                    <h1 
                        className="font-[Loker] text-[24px] text-[#FFBCBD]"
                        style={{ transform: "rotate(0.4deg)" }}
                    >
                        TO: {recipient}
                    </h1>
                </div>
            </button>
        </div>
    );
}

export default OpenMeMail