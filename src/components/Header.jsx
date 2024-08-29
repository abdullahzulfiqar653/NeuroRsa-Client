import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Dropdown, Button, Modal } from 'flowbite-react';
import { FaAngleLeft } from 'react-icons/fa';
const Header = () => {
  const openModal = () => {
    setIsOpen(true);
    setStep(1);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  const closeModal = () => setIsOpen(false);

  const nextStep = () => setStep((prevStep) => Math.min(prevStep + 1, 4));
  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isDropdownOpenFile, setIsDropdownOpenFile] = useState(false);

  const handleMouseEnterDropdown = () => {
    setIsDropdownOpen(true);
  };
  const handleMouseLeaveDropdown = () => {
    setIsDropdownOpen(false);
  };
  const handleMouseEnterDropdownFile = () => {
    setIsDropdownOpenFile(true);
  };
  const handleMouseLeaveDropdownFile = () => {
    setIsDropdownOpenFile(false);
  };

  return (
    <div className='w-full'>
      <div className=' w-full z-20 self-stretch flex flex-row xs:justify-between sm:justify-start items-center   xs:px-4 md:px-8 lg:px-8  box-border xs:gap-[15px] sm:gap-[73px] md:gap-[73px] lg:gap-[73px]  max-w-full mq750:gap-9 mq450:flex-wrap'>
        <div
          className='relative inline-block text-left'
          onMouseEnter={handleMouseEnterDropdownFile}
          onMouseLeave={handleMouseLeaveDropdownFile}
        >
          <Link
            to='/my-recipients'
            className='py-[10px] cursor-pointer [text-decoration:none] relative text-[inherit] inline-block max-w-[121px] z-[1] xs:text-[10px] sm:text-[10px] md:text-[16px] lg:text-[16px] text-white opacity-[72%]'
          >
            File
          </Link>

          {isDropdownOpenFile && (
            <div className='origin-top-right top-10  absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-[#1c3d4f]  ring-1 ring-[#345360] ring-opacity-5 focus:outline-none z-20'>
              <div className='py-4'>
                <div className='relative group hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]'>
                  <button className='block px-4 py-2 text-sm text-white w-full text-left hover-btn' onClick={openModal}>
                    New Key Pair
                  </button>
                </div>

                <button className='block px-4 py-2 text-sm text-white w-full text-left z-20 hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]'>
                  Import
                </button>
                <button className='block px-4 py-2 text-sm text-white w-full text-left hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]'>
                  Decrypt
                </button>
                <button className='block px-4 py-2 text-sm text-white w-full text-left hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]'>
                  Encrypt
                </button>
                <button className='block px-4 py-2 text-sm text-white w-full text-left hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]'>
                  Close
                </button>
                <Link
                  to='/login'
                  className='block px-4 py-2 text-sm text-white w-full text-left hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]'
                >
                  Quit
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className='flex flex-col items-start justify-start pt-px px-0 pb-0'>
          <Link
            to='/key-frame'
            className='relative inline-block  z-[1] xs:text-[10px] sm:text-[10px] md;text-[16px] lg:text-[16px] text-white opacity-[72%]'
          >
            My KeyPairs
          </Link>
        </div>
        <div className='flex flex-col items-start justify-start pt-px px-0 pb-0'>
          <div
            className='relative inline-block text-left'
            onMouseEnter={handleMouseEnterDropdown}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            <Link
              to='/my-recipients'
              className='py-[10px] cursor-pointer [text-decoration:none] relative text-[inherit] inline-block max-w-[121px] z-[1] xs:text-[10px] sm:text-[10px] md:text-[16px] lg:text-[16px] text-white opacity-[72%]'
            >
              My recipients
            </Link>

            {isDropdownOpen && (
              <div className='origin-top-right top-10  absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-[#1c3d4f]  ring-1 ring-[#345360] ring-opacity-5 focus:outline-none z-20'>
                <div className='py-4'>
                  <div className='relative group hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]'>
                    <button className='block px-4 py-2 text-sm text-white w-full text-left hover-btn'>
                      Recipient Name1
                      <div className='sub-menu absolute top-0 left-full mt-0 ml-1 w-48 rounded-md shadow-lg bg-[#1c3d4f] ring-1 ring-black ring-opacity-5 z-20'>
                        <button className='block px-4 py-2 text-sm text-white w-full text-left hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]'>
                          Add
                        </button>
                        <button className='block px-4 py-2 text-sm text-white w-full text-left hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]'>
                          Edit
                        </button>
                        <button className='block px-4 py-2 text-sm text-white w-full text-left hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]'>
                          Delete
                        </button>
                      </div>
                    </button>
                  </div>

                  <button className='block px-4 py-2 text-sm text-white w-full text-left z-20 hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]'>
                    Michael X
                  </button>
                  <button className='block px-4 py-2 text-sm text-white w-full text-left hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]'>
                    Kevin Kozi
                  </button>
                  <button className='block px-4 py-2 text-sm text-white w-full text-left hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]'>
                    Alexander Kooi
                  </button>
                  <button className='block px-4 py-2 text-sm text-white w-full text-left hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]'>
                    Recipient Name5
                  </button>
                  <button className='block px-4 py-2 text-sm text-white w-full text-left hover:bg-[#327C85] border-l-[2px] border-l-[#1c3d4f] hover:border-l-[#57CACC]'>
                    Recipient Name6
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal show={isOpen} onClose={closeModal} className='bg-black'>
        <Modal.Header className='justify-center items-center flex bg-[#0E2E3F] border-none modal-h3'>
          <div className='text-white'> Key Pair Creation Wizard - neuro.RSA </div>
        </Modal.Header>
        <Formik>
          <Form>
            <Modal.Body className='bg-[#1B3D4F]'>
              {step === 1 && (
                <div>
                  <h3 className='text-white text-[24px] font-normal leading-[33px]'>Enter Details</h3>
                  <p className='text-[#CCCCCC] text-[16px] font-normal leading-[19px] mt-2'>
                    Please enter your personal details below. If you want more control over the parameters, click on the
                    advanced Settings button.
                  </p>
                  <div className='block w-90% mx-auto h-[2px] bg-[#0E2E3F] mt-[32px]'></div>
                  <div className='mt-[32px]'>
                    <div className='flex flex-col'>
                      <div className='flex justify-between'>
                        <label htmlFor='name' className='text-white mb-[6px]'>
                          Name:
                        </label>
                        <span className='text-white'>(optional)</span>
                      </div>
                      <Field
                        type='text'
                        id='name'
                        name='name'
                        className='!bg-[#0E2E3F] !rounded-[5px] border-[#0E2E3F] input-field'
                      />
                      <ErrorMessage name='name' component='div' />
                    </div>
                    <div className='flex flex-col mt-[24px]'>
                      <div className='flex justify-between'>
                        <label htmlFor='email' className='text-white mb-[6px]'>
                          Email:
                        </label>
                        <span className='text-white'>(optional)</span>
                      </div>
                      <Field
                        type='email'
                        id='email'
                        name='email'
                        className='!bg-[#0E2E3F] !rounded-[5px] border-[#0E2E3F] input-field'
                      />
                      <ErrorMessage name='email' component='div' />
                    </div>
                  </div>
                  <div className='block w-[98%] mx-auto h-[2px] bg-[#0E2E3F] mt-[20px]'></div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className='text-white text-[24px] font-normal leading-[33px]'>Creating Key Pair...</h3>
                  <p className='text-[#CCCCCC] text-[16px] font-normal leading-[19px] mt-2'>
                    The process of creating a key requires large amounts of random numbers. This may require several
                    minutes...
                  </p>
                  <div className='mt-4 flex justify-center h-[250px]'>
                    <img
                      src='/loader.svg' // Update path as necessary
                      alt='Loading...'
                      width={50} // Adjust size as needed
                      height={50}
                      className='animate-spin'
                      style={{ animationDuration: '2s' }} // Set spin duration to 2 seconds
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <div className='flex gap-[18px]'>
                    <img
                      src='./Group-1261153253.svg'
                      className='w-[35px] h-[24px] object-contain object-top mt-[10px]'
                    />
                    <div className=''>
                      <h3 className='text-white text-[24px] font-normal leading-[33px]'>Creating Key Pair...</h3>
                      <p className='text-[#CCCCCC] text-[16px] font-normal leading-[19px] mt-2'>
                        Please enter the passphrase to protect your new key.
                      </p>
                    </div>
                  </div>
                  <div className='block w-90% mx-auto h-[2px] bg-[#0E2E3F] mt-[32px]'></div>
                  <div className='mt-[46px]'>
                    <div className='flex flex-col'>
                      <div className=''>
                        <label htmlFor='passphrase' className='text-white mb-[6px] flex w-full'>
                          Passphrase:
                        </label>
                      </div>
                      <Field
                        type='password'
                        id='passphrase'
                        name='passphrase'
                        className='!bg-[#0E2E3F] !rounded-[5px] border-[#0E2E3F] input-field'
                      />
                      <ErrorMessage name='passphrase' component='div' />
                    </div>
                    <div className='flex flex-col mt-[24px]'>
                      <label htmlFor='confirmPassphrase' className='text-white mb-[6px] flex w-full'>
                        Repeat:
                      </label>
                      <Field
                        type='password'
                        id='confirmPassphrase'
                        name='confirmPassphrase'
                        className='!bg-[#0E2E3F] !rounded-[5px] border-[#0E2E3F] input-field'
                      />
                      <ErrorMessage name='confirmPassphrase' component='div' />
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <div className='flex gap-[18px]'>
                    <img
                      src='./Group-1261153253.svg'
                      className='w-[35px] h-[24px] object-contain object-top mt-[10px]'
                    />
                    <div className=''>
                      <h3 className='text-white text-[24px] font-normal leading-[33px]'>
                        Key Pair Successfully Created
                      </h3>
                      <p className='text-[#CCCCCC] text-[16px] font-normal leading-[19px] mt-2'>
                        You new key pair was created successfully. Please find details on this result and some suggested
                        next steps below.
                      </p>
                    </div>
                  </div>
                  <div className='block w-90% mx-auto h-[2px] bg-[#0E2E3F] my-[32px]'></div>
                  <div className='flex flex-col'>
                    <label
                      htmlFor='message'
                      className='text-white text-[24px] font-normal leading-[33px] mb-[6px] flex w-full'
                    >
                      Result
                    </label>
                    <Field
                      as='textarea'
                      name='message'
                      className='!bg-[#0E2E3F] !rounded-[5px]  text-white input-field'
                      rows='6'
                      col='40'
                    />
                    <ErrorMessage name='message' component='div' />
                    <label
                      htmlFor='NextSteps'
                      className='text-white text-[24px] font-normal leading-[33px] mt-[32px] mb-[6px] flex w-full'
                    >
                      Next Steps
                    </label>
                    <Field
                      type='text'
                      id='passphrase'
                      name='passphrase'
                      className='!bg-[#0E2E3F] !rounded-[5px] border-[#0E2E3F] text-white input-field input-field'
                      placeholder=' Make a Backup Of Your Key Pair...'
                    />
                    <ErrorMessage name='message' component='div' />
                  </div>
                </div>
              )}
            </Modal.Body>

            <Modal.Footer className='bg-[#1B3D4F] justify-end border-[0px] pt-0 footer-btn'>
              {step === 1 && (
                <>
                  <Button
                    onClick={prevStep}
                    className='bg-[#0E2E3F] border-[#345360] hover:bg-[#345360] text-white font-bold py-2 px-4 rounded-[5px] modal-btn'
                  >
                    Back
                  </Button>
                  <Button
                    onClick={nextStep}
                    className='!bg-[#57CBCC] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-[5px] modal-btn'
                  >
                    Next
                  </Button>
                  <Button
                    onClick={closeModal}
                    className='bg-[#0E2E3F] border-[#345360] hover:bg-[#345360] text-white font-bold py-2 px-4 rounded-[5px] modal-btn'
                  >
                    Cancel
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <Button
                    onClick={prevStep}
                    className='bg-[#0E2E3F] border-[#345360] hover:bg-[#345360] text-white font-bold py-2 px-4 rounded-[5px] modal-btn'
                  >
                    <FaAngleLeft size={24} color='#fff' /> Back
                  </Button>
                  <Button
                    onClick={nextStep}
                    className='!bg-[#57CBCC] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-[5px] modal-btn'
                  >
                    Next
                  </Button>
                  <Button
                    onClick={closeModal}
                    className='bg-[#0E2E3F] border-[#345360] hover:bg-[#345360] text-white font-bold py-2 px-4 rounded-[5px] modal-btn'
                  >
                    Cancel
                  </Button>
                </>
              )}

              {step === 3 && (
                <>
                  <Button
                    onClick={closeModal}
                    className='bg-[#0E2E3F] border-[#345360] hover:bg-[#345360] text-white font-bold py-2 px-4 rounded-[5px] modal-btn'
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={nextStep}
                    className='bg-[#0E2E3F] border-[#345360] hover:bg-[#345360] text-white font-bold py-2 px-4 rounded-[5px] modal-btn'
                  >
                    OK
                  </Button>
                </>
              )}

              {step === 4 && (
                <>
                  <Button
                    onClick={prevStep}
                    className='bg-[#0E2E3F] border-[#345360] hover:bg-[#345360] text-white font-bold py-2 px-4 rounded-[5px] modal-btn'
                  >
                    <FaAngleLeft size={24} color='#fff' /> Back
                  </Button>
                  <Button
                    onClick={nextStep}
                    className='!bg-[#57CBCC] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-[5px]'
                  >
                    Finish
                  </Button>
                  <Button
                    onClick={closeModal}
                    className='bg-[#0E2E3F] border-[#345360] hover:bg-[#345360] text-white font-bold py-2 px-4 rounded-[5px]'
                  >
                    Cancel
                  </Button>
                </>
              )}
            </Modal.Footer>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default Header;
