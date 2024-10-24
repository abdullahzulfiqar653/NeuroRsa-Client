import React, { useEffect, useState } from "react";
import { Modal } from "flowbite-react";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import { Button } from "flowbite-react";
import EmojiPicker from "emoji-picker-react";
import useCreateRecipient from "../hooks/useCreateRecipient";
import { useAuth } from "../AuthContext";
import useUpdateRecipients from "../hooks/useUpdateRecipients";

const CreateRecipientModal = () => {
  const { isOpen, handleModal, recipientData } = useAuth();
  const [error, setErrors] = useState(false);
  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const { mutate: createRecipients } = useCreateRecipient();
  const { mutate: updateRecipients } = useUpdateRecipients();
  const [formValues, setFormValues] = useState({
    emoji: "",
    name: "",
    public_key: "",
  });
  useEffect(() => {
    if (recipientData) {
      setFormValues({
        emoji: recipientData.emoji || "",
        name: recipientData.name || "",
        public_key: recipientData.public_key || "",
      });
    }
  }, [recipientData]);

  const onEmojiClick = (emojiObject) => {
    setInputStr((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
    const emojiCodePoint = emojiObject.emoji.codePointAt(0).toString(16);
    setFormValues((prevFormData) => ({
      ...prevFormData,
      emoji: emojiCodePoint,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? "" : "Required Field",
    }));
  };

  const isUpdating = Boolean(recipientData && recipientData.id);

  const handleSubmit = () => {
    const mutationFn = isUpdating ? updateRecipients : createRecipients;
    const dataToSubmit = isUpdating
      ? { ...formValues, id: recipientData.id }
      : formValues;

    mutationFn(dataToSubmit, {
      onSuccess: () => {
        toast.success(
          `Recipient ${isUpdating ? "Updated" : "Created"} successfully.`
        );
        handleModal();
        setFormValues({ emoji: "", name: "", public_key: "" });
        setInputStr("");
      },
      onError: (error) => {
        setErrors(error.response?.data || {});
        for (const [attribute, errorMsg] of Object.entries(
          error.response?.data || {}
        )) {
          toast.error(errorMsg[0]);
        }
      },
    });
  };

  return (
    <Modal
      show={isOpen}
      onClose={() => {
        handleModal();
        setFormValues({ emoji: "", name: "", public_key: "" });
        setInputStr("");
      }}
      className="bg-black"
    >
      <Modal.Header className="justify-center items-center flex bg-[#0E2E3F] border-none modal-h3">
        <div className="text-white">Create New Recipients</div>
      </Modal.Header>

      <Formik
        initialValues={{ emoji: "", name: "", public_key: "" }}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body className="bg-[#1B3D4F]">
              {/* Emoji Input */}
              <div className="flex flex-col relative">
                <div className="flex">
                  <label htmlFor="name" className="text-white mb-[6px]">
                    Select Icon for Recipient
                  </label>
                </div>
                <div
                  className="relative flex-1 cursor-pointer"
                  onClick={() => setShowPicker((val) => !val)}
                >
                  <input
                    name="emoji"
                    type="text"
                    value={
                      inputStr || formValues?.emoji
                        ? String.fromCodePoint(parseInt(formValues?.emoji, 16))
                        : ""
                    }
                    className="!bg-[#0E2E3F] w-full !rounded-[5px] border-[#0E2E3F] text-white focus:ring-[#57CACC] input-field"
                  />
                  {/* Icon */}
                  <svg
                    width="18"
                    height="10"
                    viewBox="0 0 18 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-[40%] md:top-[50%] w-[12px] md:w-[18px] translate-y-[-50%] right-[20px]"
                  >
                    <path
                      d="M18 0.623409C18 0.465262 17.9396 0.30342 17.8223 0.182052C17.5877 -0.0606842 17.2039 -0.0606842 16.9693 0.182052L8.94047 8.49025L1.02893 0.30342C0.794353 0.0606833 0.410505 0.0606833 0.175932 0.30342C-0.0586414 0.546156 -0.0586414 0.943361 0.175932 1.1861L8.51397 9.81795C8.74854 10.0607 9.13239 10.0607 9.36697 9.81795L17.8223 1.06841C17.9431 0.943362 18 0.785233 18 0.623409Z"
                      fill="white"
                    />
                  </svg>
                </div>
                {showPicker && <EmojiPicker onEmojiClick={onEmojiClick} />}
              </div>

              {/* Name Input */}
              <div className="flex flex-col mt-[20px]">
                <label htmlFor="name" className="text-white mb-[6px]">
                  Enter Nickname
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  className="!bg-[#0E2E3F] !rounded-[5px] border-[#0E2E3F] text-white focus:ring-[#57CACC] input-field"
                />
                {error.name && <div className="text-red-500">{error.name}</div>}
              </div>

              {/* Public Key Input */}
              <div className="flex flex-col mt-[20px]">
                <label htmlFor="public_key" className="text-white mb-[6px]">
                  Enter Public Key
                </label>
                <Field
                  as="textarea"
                  id="public_key"
                  name="public_key"
                  rows="4"
                  cols="50"
                  value={formValues.public_key}
                  onChange={handleChange}
                  className="!bg-[#0E2E3F] !rounded-[5px] border-[#0E2E3F] text-white focus:ring-[#57CACC] input-field"
                />
                {error.public_key && (
                  <div className="text-red-500">{error.public_key}</div>
                )}
              </div>

              {/* Save Button */}
              <div className="flex justify-center mt-4">
                <Button
                  type="submit"
                  className="!bg-[#57CBCC] w-[142px] font-sans hover:bg-red-700 text-white font-bold py-2 px-4 rounded-[5px] save-btn"
                >
                  Save
                </Button>
              </div>
            </Modal.Body>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateRecipientModal;
