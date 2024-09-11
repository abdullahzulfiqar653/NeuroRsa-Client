import React, { useState } from 'react';
import Header from '../components/Header';
import { Tabs, Modal } from 'flowbite-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Formik, Form, Field } from 'formik';
const SelectKeyPair = () => {
  const openModal = () => {
    setIsOpen(true);
  };
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
  };

  const clearClipboard = () => {
    setText('');
    navigator.clipboard.writeText('');
    setCopied(false);
  };
  return (
    <div>
      <div
        className={`bg-[#0f2e3f] h-[100vh] max-w-full overflow-x-hidden flex flex-col items-start justify-start pt-0 px-0 pb-[21px] box-border leading-[normal] tracking-[normal] text-left text-lg text-gray-200 `}
      >
        <div className='bg-[#0B2837] w-full items-center'>
          <Header />
        </div>
        <main className='self-stretch flex flex-row items-start justify-start py-0 xs:px-0 sm:px-0 md:px-8 lg:px-8 box-border max-w-full'>
          <section className='flex-1 flex flex-col items-center justify-center gap-[9px] max-w-full text-left text-3xl text-white font-neue-plak'>
            <div className='xs:hidden sm:hidden md:flex lg:flex self-stretch bg-[#1B3D4F] flex-row items-center justify-between pt-[14px]  pb-[10px] pl-0 pr-[9px] box-border max-w-full gap-5 mq1300:flex-wrap mq1300:pl-[9px] mq1300:pb-[9px] mq1300:box-border'>
              <div className='w-full flex flex-col items-center justify-start  px-0 pb-0 box-border max-w-full h-full'>
                <div className='flex justify-center items-center h-full w-full'>
                  <div className='w-full flex flex-row items-start justify-center py-0 px-5 box-border'>
                    <a className='[text-decoration:none] h-[31px] relative font-black text-[inherit] inline-block min-w-[89px] z-[1] mq450:text-lg'>
                      Notepad
                    </a>
                  </div>
                </div>
              </div>
              <div className='w-full flex flex-col items-center justify-center  text-gray-300'>
                <a className='[text-decoration:none] h-[31px] relative font-black text-[inherit] inline-block min-w-[108px] z-[1] mq450:text-lg'>
                  Confirmation
                </a>
              </div>
            </div>
            <div className='self-stretch  flex-row items-start justify-start relative max-w-full xs:hidden sm:hidden md:flex lg:flex'>
              <div className='flex-1 flex flex-row items-start justify-start flex-wrap content-start gap-6 w-full'>
                <div className='flex-1 flex flex-col items-start justify-start gap-[25px] min-w-[463px] w-full'>
                  <div className='overflow-y-auto  md:min-h-[400px] lg:min-h-[663px] bg-[#0f2e3f] self-stretch border-[#1B3D4F] border-[1px] border-solid box-border flex flex-col items-start justify-start pt-9 pb-[18px] pl-3 pr-[11px] gap-[17px] max-w-full mq800:pt-[23px] mq800:pb-5 mq800:box-border'>
                    <div className='w-full py-0 px-2.5 box-border'>
                      <div className='flex justify-between gap-[10px] bg-[#1B3D4F] p-[15px]'>
                        <p className='text-[18px] leading-[30px] font-normal'>----- BEGIN PGP MESSAGE -----</p>
                        <div className='flex gap-[10px] items-center'>
                          {copied && <span style={{ color: 'white', fontSize: '12px' }}>Copied!</span>}
                          <CopyToClipboard text={text} onCopy={() => setCopied(true)}>
                            <img src='/copy-icon.svg' alt='copy-icon' className='cursor-pointer' />
                          </CopyToClipboard>
                        </div>
                      </div>

                      <Formik>
                        <Form>
                          <Field
                            as='textarea'
                            id='textarea'
                            name='textarea'
                            rows='20'
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className='w-full text-[#fff] bg-[#0f2e3f] border-none focus:outline-none focus:ring-0'
                          />
                        </Form>
                      </Formik>
                    </div>
                  </div>
                  <div className='w-[304px] flex flex-row items-start justify-start gap-5'>
                    <button
                      onClick={clearClipboard}
                      className='cursor-pointer border-[#57CBCC] border-[0.7px] border-solid py-[13px] pl-8 pr-[31px] bg-transparent flex-1 rounded-[4.38px] flex flex-row items-start justify-start hover:bg-darkcyan hover:border-slategray-100 hover:border-[0.7px] hover:border-solid hover:box-border'
                    >
                      <div className='h-[47.2px] w-[142px] relative rounded-[4.38px] bg-transparent border-darkslategray-100 border-[0.7px] border-solid box-border hidden' />
                      <div className='text-[16px] font-normal leading-[19px]'>Clear</div>
                    </button>
                    <CopyToClipboard text={text} onCopy={() => setCopied(true)}>
                      <button className='text-[16px] font-normal leading-[19px] cursor-pointer border-darkslategray-100 border-[0.7px] border-solid py-[13px] pl-8 pr-[31px] bg-mediumturquoise flex-1 rounded-[4.38px] flex flex-row items-start justify-start hover:bg-darkcyan hover:border-slategray-100 hover:border-[0.7px] hover:border-solid hover:box-border'>
                        Copy
                      </button>
                    </CopyToClipboard>
                    <button className='cursor-pointer border-darkslategray-100 border-[0.7px] border-solid py-[13px] pl-8 pr-[31px] bg-mediumturquoise flex-1 rounded-[4.38px] flex flex-row items-start justify-start whitespace-nowrap hover:bg-darkcyan hover:border-slategray-100 hover:border-[0.7px] hover:border-solid hover:box-border'>
                      <div className='h-[47.2px] w-[142px] relative rounded-[4.38px] bg-mediumturquoise border-darkslategray-100 border-[0.7px] border-solid box-border hidden' />
                      <div className='text-[16px] font-normal leading-[19px]'> Share Message</div>
                    </button>
                  </div>
                </div>
                <div className='flex-1 flex flex-col items-start justify-start gap-[11px] max-w-[7123px] w-full text-center text-lgi-1 text-steelblue-300'>
                  <div className='xs:hidden sm:hidden md:flex lg:flex bg-vector-img bg-[#0f2e3f] self-stretch border-[#1B3D4F] border-[1px] border-solid box-border  flex-row items-start justify-start pt-[19px] px-[17px] gap-[19px] max-w-full mq800:flex-wrap h-[663px] overflow-auto'>
                    <div className='flex-1 flex flex-col items-start justify-end pt-0 px-0 pb-[5px] box-border max-w-full mq800:min-w-full'>
                      <div className='text-[#A8B5BC] inline-block text-[22px] mb-[12px]'>Recipients</div>
                      <div className='self-stretch flex flex-col items-start justify-start gap-4 max-w-full'>
                        <div className='self-stretch shadow-[0px_3.8px_11.44px_rgba(0,_0,_0,_0.32)] rounded-[11.44px] bg-[#113C53] flex flex-row items-center justify-between pt-[5.8px] pb-[6.7px] pl-[5px] pr-3.5 box-border max-w-full gap-5 z-[1]'>
                          <div className='w-full flex flex-row  max-w-full mq800:flex-wrap'>
                            <div className='flex gap-[23.8px] items-center w-full'>
                              <div className='w-[59.1px] h-[51px] rounded-[11.44px] bg-[#0F2E3F] flex items-center justify-center  pt-[14.3px] px-[15px] pb-[14.2px] box-border z-[1]'>
                                <div className='flex items-center justify-centerrelative z-[2] text-[#175C83]'>{`K`}</div>
                              </div>
                              <p className=' text-[19.06px] text-white font-normal leading-[23px]'>
                                tails-website@boum.org
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className='self-stretch shadow-[0px_3.8px_11.44px_rgba(0,_0,_0,_0.32)] rounded-[11.44px] bg-[#113C53] flex flex-row items-center justify-between pt-[5.8px] pb-[6.7px] pl-[5px] pr-3.5 box-border max-w-full gap-5 z-[1]'>
                          <div className='w-full flex flex-row  max-w-full mq800:flex-wrap'>
                            <div className='flex gap-[23.8px] items-center w-full'>
                              <div className='w-[59.1px] h-[51px] rounded-[11.44px] bg-[#0F2E3F] flex items-center justify-center  pt-[14.3px] px-[15px] pb-[14.2px] box-border z-[1]'>
                                <div className='flex items-center justify-center relative z-[2] text-[#175C83]'>{`A`}</div>
                              </div>
                              <p className=' text-[19.06px] text-white font-normal leading-[23px]'>
                                Tails-foundation@boum.org
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className='text-[#A8B5BC] inline-block text-[22px] mb-[12px]'>
                          Select Keypair for Encryption
                        </div>
                        <div className='flex gap-[20px] w-full flex-wrap'>
                          <div className='key-pair xs:w-[46%] sm:w-[173px] md:w-[212px] lg:w-[212px]'>
                            <label className='relative inline-flex items-center w-full'>
                              <input type='radio' className='hidden peer' name='key-pair' onClick={openModal} />
                              <span className='w-full max-w-full h-[47px] flex justify-center items-center px-2 py-2 bg-[#113C53] text-white text-[20.24px] border-[#05496D] border-[1px] border-solid rounded-md cursor-pointer peer-checked:bg-[#57CBCC] peer-checked:text-white transition-colors duration-200'>
                                Private key 1
                              </span>
                              <span className='hidden peer-checked:block absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2'>
                                <img className='h-[20.2px] w-[20.2px] z-[3]' alt='' src='/group-1261153226.svg' />
                              </span>
                            </label>
                          </div>
                          <div className='key-pair xs:w-[46%] sm:w-[173px] md:w-[212px] lg:w-[212px]'>
                            <label className='relative inline-flex items-center w-full'>
                              <input type='radio' className='hidden peer' name='key-pair' onClick={openModal} />
                              <span className='w-full max-w-full h-[47px] flex justify-center items-center px-2 py-2 bg-[#113C53] text-white text-[20.24px] border-[#05496D] border-[1px] border-solid rounded-md cursor-pointer peer-checked:bg-[#57CBCC] peer-checked:text-white transition-colors duration-200'>
                                Private key 1
                              </span>
                              <span className='hidden peer-checked:block absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2'>
                                <img className='h-[20.2px] w-[20.2px] z-[3]' alt='' src='/group-1261153226.svg' />
                              </span>
                            </label>
                          </div>
                          <div
                            className='key-pair xs:w-[46%] sm:w-[173px] md:w-[212px] lg:w-[212px]'
                            onClick={openModal}
                          >
                            <label className='relative inline-flex items-center w-full'>
                              <input type='radio' className='hidden peer' name='key-pair' />
                              <span className='w-full max-w-full h-[47px] flex justify-center items-center px-2 py-2 bg-[#113C53] text-white text-[20.24px] border-[#05496D] border-[1px] border-solid rounded-md cursor-pointer peer-checked:bg-[#57CBCC] peer-checked:text-white transition-colors duration-200'>
                                Private key 1
                              </span>
                              <span className='hidden peer-checked:block absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2'>
                                <img className='h-[20.2px] w-[20.2px] z-[3]' alt='' src='/group-1261153226.svg' />
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <main className='mobile-View w-full md:hidden lg:hidden'>
          <section className='w-full mobile-view-tab'>
            <Tabs aria-label='Default tabs' variant='default' className='justify-center bg-[#1B3D4F] border-none'>
              <Tabs.Item active title='Notepad'>
                <div className='w-full py-0 px-2.5 box-border'>
                  <div className='flex justify-between gap-[10px] bg-[#1B3D4F] p-[15px]'>
                    <p className='text-[18px] leading-[30px] font-normal'>----- BEGIN PGP MESSAGE -----</p>
                    <div className='flex gap-[10px] items-center'>
                      {copied && <span style={{ color: 'white', fontSize: '12px' }}>Copied!</span>}
                      <CopyToClipboard text={text} onCopy={() => setCopied(true)}>
                        <img src='/copy-icon.svg' alt='copy-icon' className='cursor-pointer' />
                      </CopyToClipboard>
                    </div>
                  </div>

                  <Formik>
                    <Form>
                      <Field
                        as='textarea'
                        id='textarea'
                        name='textarea'
                        rows='20'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className='w-full text-[#fff] bg-[#0f2e3f] border-none focus:outline-none focus:ring-0'
                      />
                    </Form>
                  </Formik>
                </div>
              </Tabs.Item>
              <Tabs.Item title='Confirmation'>
                <div className='self-stretch flex flex-col items-start justify-start gap-4 max-w-full px-[15px]'>
                  <div className='self-stretch shadow-[0px_3.8px_11.44px_rgba(0,_0,_0,_0.32)] rounded-[11.44px] bg-[#113C53] flex flex-row items-center justify-between pt-[5.8px] pb-[6.7px] pl-[5px] pr-3.5 box-border max-w-full gap-5 z-[1]'>
                    <div className='w-full flex flex-row  max-w-full mq800:flex-wrap'>
                      <div className='flex gap-[23.8px] items-center w-full'>
                        <div className='w-[59.1px] h-[51px] rounded-[11.44px] bg-[#0F2E3F] flex items-center justify-center  pt-[14.3px] px-[15px] pb-[14.2px] box-border z-[1]'>
                          <div className='flex items-center justify-center relative z-[2] text-[#175C83]'>{`A`}</div>
                        </div>
                        <p className=' text-[19.06px] text-white font-normal leading-[23px]'>tails-website@boum.org</p>
                      </div>
                    </div>
                  </div>
                  <div className='self-stretch shadow-[0px_3.8px_11.44px_rgba(0,_0,_0,_0.32)] rounded-[11.44px] bg-[#113C53] flex flex-row items-center justify-between pt-[5.8px] pb-[6.7px] pl-[5px] pr-3.5 box-border max-w-full gap-5 z-[1]'>
                    <div className='w-full flex flex-row  max-w-full mq800:flex-wrap'>
                      <div className='flex gap-[23.8px] items-center w-full'>
                        <div className='w-[59.1px] h-[51px] rounded-[11.44px] bg-[#0F2E3F] flex items-center justify-center  pt-[14.3px] px-[15px] pb-[14.2px] box-border z-[1]'>
                          <div className='flex items-center justify-center relative z-[2] text-[#175C83]'>{`A`}</div>
                        </div>
                        <p className=' text-[19.06px] text-white font-normal leading-[23px]'>
                          Tails-foundation@boum.org
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className=' relative font-black inline-block text-[22px]'>Select Keypair for Encryption</div>
                  <div className='flex gap-[20px] w-full flex-wrap'>
                    <div className='key-pair xs:w-[46%] sm:w-[173px] md:w-[212px] lg:w-[212px]'>
                      <label className='relative inline-flex items-center w-full'>
                        <input type='radio' className='hidden peer' name='key-pair' onClick={openModal} />
                        <span className='w-full max-w-full h-[47px] flex justify-center items-center px-2 py-2 bg-[#113C53] text-white text-[20.24px] border-[#05496D] border-[1px] border-solid rounded-md cursor-pointer peer-checked:bg-[#57CBCC] peer-checked:text-white transition-colors duration-200'>
                          Private key 1
                        </span>
                        <span className='hidden peer-checked:block absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2'>
                          <img className='h-[20.2px] w-[20.2px] z-[3]' alt='' src='/group-1261153226.svg' />
                        </span>
                      </label>
                    </div>
                    <div className='key-pair xs:w-[46%] sm:w-[173px] md:w-[212px] lg:w-[212px]'>
                      <label className='relative inline-flex items-center w-full'>
                        <input type='radio' className='hidden peer' name='key-pair' onClick={openModal} />
                        <span className='w-full max-w-full h-[47px] flex justify-center items-center px-2 py-2 bg-[#113C53] text-white text-[20.24px] border-[#05496D] border-[1px] border-solid rounded-md cursor-pointer peer-checked:bg-[#57CBCC] peer-checked:text-white transition-colors duration-200'>
                          Private key 1
                        </span>
                        <span className='hidden peer-checked:block absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2'>
                          <img className='h-[20.2px] w-[20.2px] z-[3]' alt='' src='/group-1261153226.svg' />
                        </span>
                      </label>
                    </div>
                    <div className='key-pair xs:w-[46%] sm:w-[173px] md:w-[212px] lg:w-[212px]'>
                      <label className='relative inline-flex items-center w-full'>
                        <input type='radio' className='hidden peer' name='key-pair' onClick={openModal} />
                        <span className='w-full max-w-full h-[47px] flex justify-center items-center px-2 py-2 bg-[#113C53] text-white text-[20.24px] border-[#05496D] border-[1px] border-solid rounded-md cursor-pointer peer-checked:bg-[#57CBCC] peer-checked:text-white transition-colors duration-200'>
                          Private key 1
                        </span>
                        <span className='hidden peer-checked:block absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2'>
                          <img className='h-[20.2px] w-[20.2px] z-[3]' alt='' src='/group-1261153226.svg' />
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </Tabs.Item>
            </Tabs>
            <div className='mx-auto flex-row items-start justify-start gap-2 xs:flex sm:flex md:hidden lg:hidden mt-[23px] px-[15px]'>
              <button
                onClick={clearClipboard}
                className='justify-center cursor-pointer border-[#57CBCC] border-[0.7px] border-solid py-[13px] px-[5px] bg-transparent flex-1 rounded-[4.38px] flex flex-row items-start  hover:bg-darkcyan hover:border-slategray-100 hover:border-[0.7px] hover:border-solid hover:box-border'
              >
                <div className='h-[47.2px] w-[142px] relative rounded-[4.38px] bg-transparent border-darkslategray-100 border-[0.7px] border-solid box-border hidden' />
                <div className='text-[10px] font-normal leading-[19px]'>Clear</div>
              </button>
              <CopyToClipboard text={text} onCopy={() => setCopied(true)}>
                <button className='text-[10px] font-normal leading-[19px] cursor-pointer border-darkslategray-100 border-[0.7px] border-solid py-[13px] px-[5px] bg-mediumturquoise flex-1 rounded-[4.38px] flex flex-row items-start justify-center hover:bg-darkcyan hover:border-slategray-100 hover:border-[0.7px] hover:border-solid hover:box-border'>
                  {' '}
                  Copy{' '}
                </button>
              </CopyToClipboard>
              <button className='cursor-pointer border-darkslategray-100 border-[0.7px] border-solid py-[13px] px-[5px] bg-mediumturquoise flex-1 rounded-[4.38px] flex flex-row items-start justify-center whitespace-nowrap hover:bg-darkcyan hover:border-slategray-100 hover:border-[0.7px] hover:border-solid hover:box-border'>
                <div className='h-[47.2px] w-[142px] relative rounded-[4.38px] bg-mediumturquoise border-darkslategray-100 border-[0.7px] border-solid box-border hidden' />
                <div className='text-[10px] font-normal leading-[19px]'> Share Message</div>
              </button>
            </div>
          </section>
        </main>
      </div>
      <Modal show={isOpen} onClose={closeModal} className='bg-black'>
        <Modal.Header className='pt-[10px] !pl-[0px] !pb-[2px] bg-[#1B3D4F] border-none'></Modal.Header>

        <Modal.Body className='bg-[#1B3D4F] !pt-[0px] !pb-[50px]'>
          <img src='/alert-icon.svg' alt='alert-icon' className='mx-auto mb-[30px]' />
          <p className='text-white text-center text-[22px] leading-[30px]'>
            Please make sure no body around you, keep your private key save and confidential.
          </p>
          <button className='bg-[#57CBCC] rounded-[4px] text-[16px] font-normal leading-[19.5px] w-full max-w-[250px] h-[47px] flex justify-center items-center text-white mt-[37px] mx-auto'>
            Show me Private Key
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SelectKeyPair;
