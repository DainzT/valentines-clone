import KeroppiSticker from "../assets/KeroppiSticker.png"

interface MailContentProps {
    onClose: () => void;
    onInvoiceClick: (item: string) => void; 
    invoices: string[];
  }

const MailContent: React.FC<MailContentProps> = ({onClose, onInvoiceClick, invoices}) => {
    return (
        <div className="absolute inset-0 flex items-center justify-center z-50 -translate-y-5">
            <img src={KeroppiSticker} alt="KerropiSticker"
                className="-translate-x-38 -translate-y-57 absolute w-[118px] h-[120px] z-1"
                style={{ transform: "rotate(-7.08deg)" }}
            />
            <div className="w-[367px] h-[454px] bg-[#A0C878]/50">
                <div className="translate-x-5 translate-y-5 w-[327px] h-[33px] bg-[#143D60]/30">
                    <button
                        className="inter-font font-bold text-[24px] text-[#FFFFFF] translate-x-73"
                        onClick={onClose}
                    >
                        X
                    </button>
                </div>
                <div className="translate-x-5 translate-y-12 w-[327px] h-[349px] bg-[#143D60]/30">
                        {invoices.map((invoice, index) => (
                            <button
                                key={index}
                                className="inter-font font-bold text-[#27667B] text-[20px] w-full py-3 px-4 bg-[#DDEB9D]/30 text-left border-b border-[#DDEB9D]/20"
                                onClick={() => {
                                    if (invoice === "Valentines Survey") {
                                        onInvoiceClick(invoice) 
                                        onClose()
                                    } else {
                                        console.log(invoice)}
                                }}
                            >
                                {invoice}
                            </button>
                        ))}
                </div>
                
            </div>
        </div>
    );
}

export default MailContent