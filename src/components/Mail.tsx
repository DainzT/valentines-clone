import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

interface MailProps {
    data: string; 
    from_name:string;
    
  }
  

export const Mail: React.FC<MailProps> = ({data, from_name}) => {
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
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="from_name" value={from_name} readOnly required />
        <label>Message</label>
        <textarea name="message" value={data} readOnly required />
        <button
            type="submit"
            className="translate-x-25 translate-y-60 inter-font font-bold text-[16px] text-[#FFFFFF] w-[103px] h-[32px] bg-[#61BD3C] rounded-[20px] pl-1"
        >
            {`Close x`}
        </button>
    </form>
  );
};

export default Mail;
