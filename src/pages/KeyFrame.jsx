import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Button, Modal } from 'flowbite-react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

const KeyFrame = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // State to track the current step

  const openModal = () => {
    setIsOpen(true);
    setStep(1); // Reset to the first step when opening the modal
  };
  const closeModal = () => setIsOpen(false);

  const nextStep = () => setStep((prevStep) => Math.min(prevStep + 1, 4));
  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

  return (
    <section
      className={`self-stretch overflow-x-hidden items-start justify-start max-w-full text-left text-lg text-gray-200 font-montserrat bg-[#081720] h-[100vh] ${className}`}
    >
      <div className=' w-full z-20 self-stretch bg-[#0B2837] flex flex-row items-start justify-start pt-[9px] xs:px-4 md:px-8 lg:px-8 pb-2 box-border xs:gap-[15px] lg:gap-[73px] md:gap-[73px] max-w-full mq750:gap-9 mq450:flex-wrap'>
        <div className='menu-item'>
          <Dropdown label='File' inline={true} arrowIcon={false}>
            <Dropdown.Item onClick={openModal}>New Key Pair</Dropdown.Item>
            <Dropdown.Item>Import</Dropdown.Item>
            <Dropdown.Item>Decrypt</Dropdown.Item>
            <Dropdown.Item>Encrypt</Dropdown.Item>
            <Dropdown.Item>Close</Dropdown.Item>
            <Dropdown.Item>Quit</Dropdown.Item>
          </Dropdown>
        </div>

        <div className='flex flex-col items-start justify-start pt-px px-0 pb-0'>
          <div className='relative inline-block min-w-[109px] z-[1]'>My KeyPairs</div>
        </div>
        <div className='flex flex-col items-start justify-start pt-px px-0 pb-0'>
          <a className='[text-decoration:none] relative text-[inherit] inline-block min-w-[121px] z-[1]'>
            My recipients
          </a>
        </div>
      </div>

      <div className='max-w-[1448px] mx-auto relative overflow-x-auto pt-[50px]'>
        <table className='w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-[22px] font-semibold leading-[27px] text-[#808080] uppercase bg-[#0B2837] '>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Notepad
              </th>
              <th scope='col' className='px-6 py-3'>
                Recipients
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
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
                      <Field type='text' id='name' name='name' className='!bg-[#0E2E3F] !rounded-[5px] border-[#0E2E3F]' />
                      <ErrorMessage name='name' component='div' />
                    </div>
                    <div className='flex flex-col mt-[24px]'>
                      <div className='flex justify-between'>
                        <label htmlFor='email' className='text-white mb-[6px]'>
                          Email:
                        </label>
                        <span className='text-white'>(optional)</span>
                      </div>
                      <Field type='email' id='email' name='email' className='!bg-[#0E2E3F] !rounded-[5px] border-[#0E2E3F]' />
                      <ErrorMessage name='email' component='div' />
                    </div>
              
              </div>
              <div className='block w-[98%] mx-auto h-[2px] bg-[#0E2E3F] mt-[20px]'></div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className='text-white text-[24px] font-normal leading-[33px]'>Creating Key Pair...</h3>
              <p className='text-[#CCCCCC] text-[16px] font-normal leading-[19px] mt-2'>The process of creating a key requires large amounts of random numbers. This may require several minutes...</p>
            </div>
          )}

          {step === 3 && (
            <div>
               <div className='flex gap-[18px]'>
                <img src="./Group-1261153253.svg" className='w-[35px] h-[24px] object-contain object-top mt-[10px]' />
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
                        <label htmlFor='passphrase' className='text-white mb-[6px]'>
                          Passphrase:
                        </label>
                      </div>
                      <Field type='password' id='passphrase' name='passphrase' className='!bg-[#0E2E3F] !rounded-[5px] border-[#0E2E3F]' />
                      <ErrorMessage name='passphrase' component='div' />
                    </div>
                    <div className='flex flex-col mt-[24px]'>
                      <label htmlFor='confirmPassphrase' className='text-white mb-[6px]'>
                        Repeat:
                      </label>
                      <Field type='password' id='confirmPassphrase' name='confirmPassphrase' className='!bg-[#0E2E3F] !rounded-[5px] border-[#0E2E3F]' />
                      <ErrorMessage name='confirmPassphrase' component='div' />
                    </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
               <div className='flex gap-[18px]'>
                <img src="./Group-1261153253.svg" className='w-[35px] h-[24px] object-contain object-top mt-[10px]' />
                <div className=''>
                  <h3 className='text-white text-[24px] font-normal leading-[33px]'>Key Pair Successfully Created</h3>
                  <p className='text-[#CCCCCC] text-[16px] font-normal leading-[19px] mt-2'>
                  You new key pair was created successfully. Please find details on this result and some suggested next steps below.
                  </p>
                </div>
              </div>
              <div className='block w-90% mx-auto h-[2px] bg-[#0E2E3F] my-[32px]'></div>
              <div className='flex flex-col'>
            <label htmlFor="message" className='text-white text-[24px] font-normal leading-[33px] mb-[5px]'>Result</label>
            <Field as="textarea" name="message" className="!bg-[#0E2E3F] !rounded-[5px]  text-white" rows="6" col="40"/>
            <ErrorMessage name="message" component="div" />
            <label htmlFor="NextSteps" className='text-white text-[24px] font-normal leading-[33px] mt-[32px] mb-[5px]'>Next Steps</label>
            <Field type='password' id='passphrase' name='passphrase' className='!bg-[#0E2E3F] !rounded-[5px] border-[#0E2E3F]' placeholder=" Make a Backup Of Your Key Pair..." />
            <ErrorMessage name="message" component="div" />
          </div>
            </div>
          )}

        </Modal.Body>

        <Modal.Footer className='bg-[#1B3D4F] justify-end border-[0px] pt-0'>
          {step === 1 && (
            <>
              <Button onClick={prevStep} className='bg-[#0E2E3F] border-[#345360] hover:bg-[#345360] text-white font-bold py-2 px-4 rounded-[5px]'>
                Back
              </Button>
              <Button onClick={nextStep} className='!bg-[#57CBCC] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-[5px]'>
                Next
              </Button>
              <Button onClick={closeModal} className='bg-[#0E2E3F] border-[#345360] hover:bg-[#345360] text-white font-bold py-2 px-4 rounded-[5px]'>
                Cancel
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <Button onClick={prevStep} className='bg-[#0E2E3F] border-[#345360] hover:bg-[#345360] text-white font-bold py-2 px-4 rounded-[5px]'>
                Back
              </Button>
              <Button onClick={nextStep} className='!bg-[#57CBCC] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-[5px]'>
                Next
              </Button>
              <Button onClick={closeModal} className='bg-[#0E2E3F] border-[#345360] hover:bg-[#345360] text-white font-bold py-2 px-4 rounded-[5px]'>
                Cancel
              </Button>
            </>
          )}

          {step === 3 && (
            <>
              <Button onClick={closeModal} className='bg-[#0E2E3F] border-[#345360] hover:bg-[#345360] text-white font-bold py-2 px-4 rounded-[5px]'>
                Cancel
              </Button>
              <Button onClick={nextStep} className='bg-[#0E2E3F] border-[#345360] hover:bg-[#345360] text-white font-bold py-2 px-4 rounded-[5px]'>
                OK
              </Button>
            </>
          )}

          {step === 4 && (
            <>
              <Button onClick={prevStep} className='bg-[#0E2E3F] border-[#345360] hover:bg-[#345360] text-white font-bold py-2 px-4 rounded-[5px]'>
                Back
              </Button>
              <Button onClick={nextStep} className='!bg-[#57CBCC] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-[5px]'>
                Finish
              </Button>
              <Button onClick={closeModal} className='bg-[#0E2E3F] border-[#345360] hover:bg-[#345360] text-white font-bold py-2 px-4 rounded-[5px]'>
                Cancel
              </Button>
            </>
          )}
        </Modal.Footer>
        </Form>
                </Formik>
      </Modal>
    </section>
  );
};

KeyFrame.propTypes = {
  className: PropTypes.string,
};

export default KeyFrame;
