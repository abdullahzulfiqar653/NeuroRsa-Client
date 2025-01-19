import React from "react";
import { Modal } from "flowbite-react";
import { ThreeDots } from "react-loader-spinner";

const DeleteKeyModal = ({ isOpen, closeModalTwo, handleDelete, loading }) => {
  return (
    <Modal show={isOpen} onClose={closeModalTwo} className="bg-black">
      <Modal.Header className="pt-[10px] !pl-[0px] !pb-[2px] bg-[#1B3D4F] border-none"></Modal.Header>

      <Modal.Body className="bg-[#1B3D4F] !pt-[0px] !pb-[50px]">
        <img
          src="/alert-icon.svg"
          alt="alert-icon"
          className="mx-auto mb-[30px]"
        />
        <p className="text-white text-center text-[16px] md:text-[22px] leading-[30px] w-full max-w-[499px] mx-auto">
          Are you sure you want to delete this key passcode?
        </p>
        <div className="flex gap-[15px] mt-[37px] justify-center max-w-[328px] w-full mx-auto">
          <button
            className="bg-transparent rounded-[4px] text-[16px] font-normal leading-[19.5px] w-full max-w-[250px] h-[47px] flex justify-center items-center text-[#57CBCC] border-[1px] border-[#57CBCC]"
            onClick={() => closeModalTwo(false)}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            style={{
              background: loading ? "#0f2e3f" : "#57CBCC",
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading}
            className="bg-[#57CBCC] rounded-[4px] text-[16px] font-normal leading-[19.5px] w-full max-w-[250px] h-[47px] flex justify-center items-center text-white"
          >
            Delete
            {loading && (
              <ThreeDots
                color="white"
                height={10}
                width={35}
                ariaLabel="loading"
                wrapperStyle={{ marginLeft: "5%" }}
              />
            )}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteKeyModal;
