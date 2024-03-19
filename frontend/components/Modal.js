import { AnimatePresence } from "framer-motion";
import React from "react";
import { motion } from "framer-motion";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-overlay"
          onClick={onClose}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {children}
            <button className="modal-close-btn" onClick={onClose}>
              Let's go !
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
