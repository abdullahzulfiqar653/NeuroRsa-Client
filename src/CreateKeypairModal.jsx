import React from "react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import useCreateKeypair from "./hooks/useCreateKeypair";
import { useAuth } from "./AuthContext";
import { ThreeDots } from "react-loader-spinner";

function CreateKeypairModal() {
  const {
    step,
    setStep,
    closeModal,
    nextStep,
    isOpenKeyPair,
    errors,
    setErrors,
    formValues,
    setFormValues,
  } = useAuth();
  const { mutate } = useCreateKeypair();
  const [keypair, setKeypair] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoading(false);
    setFormValues((prevValues) => {
      let updatedValues = { ...prevValues, [name]: value };
      if (value === "") {
        delete updatedValues[name];
      }
      if (name === "confirmPassphrase" || name === "passphrase") {
        const { passphrase, confirmPassphrase } = updatedValues;
        if (!passphrase || !confirmPassphrase) {
          setErrors({ passphrase: "" });
        } else if (passphrase !== confirmPassphrase) {
          setErrors({ passphrase: "Passphrases do not match" });
        } else {
          setErrors({ passphrase: "" });
        }
      }
      return updatedValues;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValues?.passphrase && !formValues?.confirmPassphrase) {
      toast.error("Please confirm your passphrase.");
      return;
    }

    setLoading(true);
    if (!errors.passphrase) {
      mutate(formValues, {
        onSuccess: (response) => {
          setKeypair(response);
          setStep(4);
          setLoading(false);
          toast.success(`Keypair Created successfully.`);
        },
        onError: (error) => {
          setErrors(error.response.data);
          setLoading(false);
          for (const [attribute, errors] of Object.entries(
            error.response.data
          )) {
            toast.error(errors[0]);
          }
        },
      });
      setFormValues({});
    } else {
      toast.error("Passphrases do not match! Please correct it.");
    }
  };

  const handleBackupOfKeypair = () => {
    const element = document.createElement("a");
    const file = new Blob(
      [`${keypair.public_key}\n\n\n\n${keypair.private_key}`],
      { type: "text/plain" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "keypair_backup.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <Modal show={isOpenKeyPair} onClose={closeModal} className="bg-black">
      <Modal.Header className="justify-center items-center flex bg-[#0E2E3F] border-none modal-h3">
        <div className="text-white text-[16px] md:text-[24px]">
          {" "}
          Key Pair Creation Wizard - neuro.RSA{" "}
        </div>
      </Modal.Header>
      <Formik>
        <Form>
          <Modal.Body className="bg-[#1B3D4F]">
            {step === 1 && (
              <div>
                <h3 className="text-white text-[16px] md:text-[24px] font-normal leading-[33px]">
                  Enter Details
                </h3>
                <p className="text-[#CCCCCC] text-[12px] md:text-[16px] font-normal leading-[19px] mt-2">
                  Please enter your personal details below. If you want more
                  control over the parameters, click on the advanced Settings
                  button.
                </p>
                <div className="block w-90% mx-auto h-[2px] bg-[#0E2E3F] mt-[32px]"></div>
                <div className="mt-[32px]">
                  <div className="flex flex-col">
                    <div className="flex justify-between">
                      <label htmlFor="name" className="text-white mb-[6px]">
                        Name:
                      </label>
                      <span className="text-white">(optional)</span>
                    </div>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className="!bg-[#0E2E3F] !rounded-[5px] border-[#0E2E3F] input-field text-white"
                      value={formValues.name}
                      onChange={handleChange}
                    />
                    <ErrorMessage name="name" component="div" />
                  </div>
                  <div className="flex flex-col mt-[24px]">
                    <div className="flex justify-between">
                      <label htmlFor="email" className="text-white mb-[6px]">
                        Email:
                      </label>
                      <span className="text-white">(optional)</span>
                    </div>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="!bg-[#0E2E3F] !rounded-[5px] border-[#0E2E3F] input-field text-white"
                      value={formValues.email}
                      onChange={handleChange}
                    />
                    <ErrorMessage name="email" component="div" />
                  </div>
                </div>
                <div className="block w-[98%] mx-auto h-[2px] bg-[#0E2E3F] mt-[20px]"></div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-white text-[16px] md:text-[24px] font-normal leading-[33px]">
                  Creating Key Pair...
                </h3>
                <p className="text-[#CCCCCC]  text-[12px] md:text-[16px] font-normal leading-[19px] mt-2">
                  The process of creating a key requires large amounts of random
                  numbers. This may require several minutes...
                </p>
                <div className="mt-4 flex justify-center h-[250px]">
                  <img
                    src="/loader.svg" // Update path as necessary
                    alt="Loading..."
                    width={50} // Adjust size as needed
                    height={50}
                    className="animate-spin"
                    style={{ animationDuration: "2s" }} // Set spin duration to 2 seconds
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="flex gap-[18px]">
                  <img
                    src="./Group-1261153253.svg"
                    className="w-[35px] h-[24px] object-contain object-top mt-[10px]"
                  />
                  <div className="">
                    <h3 className="text-white text-[16px] md:text-[24px] font-normal leading-[33px]">
                      Creating Key Pair...
                    </h3>
                    <p className="text-[#CCCCCC] text-[13px] md:text-[16px] font-normal leading-[19px] mt-2">
                      Please enter the passphrase to protect your new key.
                    </p>
                  </div>
                </div>
                <div className="block w-90% mx-auto h-[2px] bg-[#0E2E3F] mt-[32px]"></div>
                <div className="mt-[46px]">
                  <div className="flex flex-col">
                    <div className="">
                      <label
                        htmlFor="passphrase"
                        className="text-white mb-[6px] flex w-full"
                      >
                        Passphrase (Optional):
                      </label>
                    </div>
                    <Field
                      type="password"
                      id="passphrase"
                      name="passphrase"
                      className="!bg-[#0E2E3F] !rounded-[5px] border-[#0E2E3F] input-field text-white"
                      value={formValues.passphrase}
                      onChange={handleChange}
                    />
                    {errors.passphrase && (
                      <div className="text-red-500">{errors.passphrase}</div>
                    )}
                  </div>
                  <div className="flex flex-col mt-[24px]">
                    <label
                      htmlFor="confirmPassphrase"
                      className="text-white mb-[6px] flex w-full"
                    >
                      Repeat Passphrase:
                    </label>
                    <Field
                      type="password"
                      id="confirmPassphrase"
                      name="confirmPassphrase"
                      className="!bg-[#0E2E3F] !rounded-[5px] border-[#0E2E3F] input-field text-white"
                      value={formValues.confirmPassphrase}
                      onChange={handleChange}
                    />
                    {errors.passphrase && (
                      <div className="text-red-500">{errors.passphrase}</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <div className="flex gap-[18px]">
                  <img
                    src="./Group-1261153253.svg"
                    className="w-[35px] h-[24px] object-contain object-top mt-[10px]"
                  />
                  <div className="">
                    <h3 className="text-white text-[16px] md:text-[24px] font-normal leading-[33px]">
                      Key Pair Successfully Created
                    </h3>
                    <p className="text-[#CCCCCC] text-[12px] md:text-[16px] font-normal leading-[19px] mt-2">
                      You new key pair was created successfully. Please find
                      details on this result and some suggested next steps
                      below.
                    </p>
                  </div>
                </div>
                <div className="block w-90% mx-auto h-[2px] bg-[#0E2E3F] my-[32px]"></div>
                <div className="flex flex-col">
                  <label
                    htmlFor="message"
                    className="text-white text-[16px] md:text-[24px] font-normal leading-[33px] mb-[6px] flex w-full"
                  >
                    Result
                  </label>
                  <Field
                    as="textarea"
                    name="message"
                    className="!bg-[#0E2E3F] !rounded-[5px] text-[12px] md:text-[16px] text-white input-field"
                    rows="6"
                    col="40"
                    disabled
                    value={`Key Pair created successfully. Fingerprint: ${Array(
                      5
                    )
                      .fill()
                      .map(() => Math.random().toString(36).substring(2, 15))
                      .join("")
                      .toUpperCase()}`}
                  />
                  <label
                    htmlFor="NextSteps"
                    className="text-white text-[16px] md:text-[24px] font-normal leading-[20px] md:leading-[33px] mt-[5px] md:mt-[32px] mb-[6px] flex w-full"
                  >
                    Next Steps
                  </label>
                  <Button
                    type="button"
                    id="passphrase"
                    name="passphrase"
                    className="!bg-[#0E2E3F] !rounded-[5px] text-[12px] md:text-[16px] border-[#0E2E3F] text-white input-field input-field"
                    onClick={handleBackupOfKeypair}
                  >
                    Make a Backup Of Your Key Pair...
                  </Button>
                </div>
              </div>
            )}
          </Modal.Body>

          <Modal.Footer className="bg-[#1B3D4F] justify-end border-[0px] pt-0 footer-btn">
            {step === 1 && (
              <>
                <Button
                  onClick={nextStep}
                  className="!bg-[#57CBCC] hover:bg-red-700 text-white font-sans font-bold py-2 px-4 rounded-[5px] modal-btn"
                >
                  Next
                </Button>
                <Button
                  onClick={closeModal}
                  className="bg-[#0E2E3F] border-[#345360] hover:bg-[#345360] font-sans text-white font-bold py-2 px-4 rounded-[5px] modal-btn"
                >
                  Cancel
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <Button
                  onClick={closeModal}
                  className="bg-[#0E2E3F] border-[#345360] hover:bg-[#345360] text-white font-bold py-2 px-4 rounded-[5px] modal-btn"
                >
                  Cancel
                </Button>
              </>
            )}

            {step === 3 && (
              <>
                <Button
                  onClick={() => {
                    closeModal();
                    setLoading(false);
                  }}
                  className="bg-[#0E2E3F] border-[#345360] hover:bg-[#345360] font-sans text-white font-bold py-2 px-4 rounded-[5px] modal-btn"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-[#13425c] border-[#345360] hover:bg-[#345360] font-sans text-white font-bold py-2 px-4 rounded-[5px] modal-btn"
                >
                  OK
                  {loading && (
                    <ThreeDots
                      color="white"
                      height={10}
                      width={30}
                      ariaLabel="loading"
                      wrapperStyle={{ marginLeft: "5%" }}
                    />
                  )}
                </Button>
              </>
            )}

            {step === 4 && (
              <>
                <Button
                  onClick={() => {
                    closeModal();
                  }}
                  className="!bg-[#57CBCC] hover:bg-red-700 text-white font-sans font-bold py-2 px-4 rounded-[5px]"
                >
                  Finish
                </Button>
                <Button
                  onClick={closeModal}
                  className="bg-[#0E2E3F] border-[#345360] hover:bg-[#345360] font-sans text-white font-bold py-2 px-4 rounded-[5px]"
                >
                  Cancel
                </Button>
              </>
            )}
          </Modal.Footer>
        </Form>
      </Formik>
    </Modal>
  );
}

export default CreateKeypairModal;
