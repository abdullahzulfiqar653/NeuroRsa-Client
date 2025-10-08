import React from "react";
import { Modal } from "flowbite-react";

const PrivateKeyModal = ({ isOpen, closeModal, handleShowPrivateKey }) => {
  return (
    <Modal show={isOpen} onClose={closeModal} className="bg-black">
      <Modal.Header className="pt-[10px] !pl-[0px] !pb-[2px] bg-[#1B3D4F] border-none"></Modal.Header>

      <Modal.Body className="bg-[#1B3D4F] !pt-[0px] !pb-[50px]">
        <img
          src="/alert-icon.svg"
          alt="alert-icon"
          className="mx-auto mb-[30px]"
        />
        <p className="text-white text-center text-[16px] md:text-[22px] leading-[30px]">
          Please make sure no body around you, keep your private key save and
          confidential.
        </p>
        <button
          onClick={handleShowPrivateKey}
          className="bg-[#57CBCC] rounded-[4px] text-[12px] md:text-[16px] font-normal leading-[19.5px] w-full max-w-[250px] h-[47px] flex justify-center items-center text-white mt-[37px] mx-auto"
        >
          Show me Private Key
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default PrivateKeyModal;
