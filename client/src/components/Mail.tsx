import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface MailProps {
    data: string; 
    from_name:string;
    onSubmit: () => void;
  }
  

export const Mail: React.FC<MailProps> = ({data, from_name, onSubmit}) => {
  const form = useRef<HTMLFormElement | null>(null);
  const publicKey = import.meta.env.VITE_PUBLIC_KEY;
  const templateId = import.meta.env.VITE_TEMPLATE_ID;
  const serviceId = import.meta.env.VITE_SERVICE_ID;

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) {
      console.error("Form reference is null.");
      return;
    }

    emailjs
      .sendForm(serviceId, templateId, form.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
            toast.success("Survey submitted succesfully", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
                style: {width: "300px", marginTop: "20px" }
            });
            setTimeout(() => {
              onSubmit(); // Close Mail component after successful submission
            }, 2000);
            console.log('SUCCESS!');
        },
        (error) => {
            console.log('FAILED...', error.text);
        }
      );
  };

  return (
    <div>
        <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
        />

        <form ref={form} onSubmit={sendEmail}>
            <input type="text" name="from_name" value={from_name} readOnly required className='opacity-0' />
            <textarea name="message" value={data} readOnly required className='opacity-0'/>
            <button
                type="submit"
                className="translate-x-66 translate-y-53 inter-font font-bold text-[16px] text-[#FFFFFF] w-[103px] h-[32px] bg-[#61BD3C] rounded-[20px] pl-1"
            >
                {`Close x`}
            </button>
        </form>
    </div>
  );
};

export default Mail;
