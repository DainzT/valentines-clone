import React from "react";
import { motion } from "framer-motion";
import MilkyNMocha from "../assets/milk-and-mocha4.gif";

interface ValentinesDayProps {
    onClose: () => void;
}

const ValentinesDay: React.FC<ValentinesDayProps> = ({ onClose }) => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg"
            >
                <img 
                    src={MilkyNMocha} 
                    alt="GIF animation" 
                    className="w-[200px] h-[200px] mb-4"
                />
                <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    onClick={onClose}
                >
                    Close
                </motion.button>
            </motion.div>
        </motion.div>
    );
}

export default ValentinesDay;
