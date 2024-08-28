'use client';
import React, { useState } from 'react';
import { Table, Modal } from 'flowbite-react';
import Header from '../components/Header';
import { Formik, Form, Field } from 'formik';
const MainHome = () => {
  const openModal = () => {
    setIsOpen(true);
  };
  const openModalTwo = () => {
    setIsOpenTwo(true);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTwo, setIsOpenTwo] = useState(false);
  const closeModal = () => setIsOpen(false);
  const closeModalTwo = () => setIsOpenTwo(false);
  return (
    <div>
      <div className={`bg-[#0f2e3f] h-[100vh]`}>
        <div className='bg-[#0B2837] w-full items-center'>
          <Header />
        </div>
        <div className='overflow-x-auto px-[32px] desktop-view-table xs:hidden sm:hidden md:block lg:block'>
          <div className='mb-[30px]'>
            <Formik
              initialValues={{ search: '' }}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {() => (
                <Form className='relative'>
                  <div className='flex items-center'>
                    <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                      <svg
                        className='h-5 w-5 text-white'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                        />
                      </svg>
                    </span>
                    <Field
                      name='search'
                      type='text'
                      placeholder='Search...'
                      className='w-full md:max-w-[500px] lg:max-w-[903px] h-[53px] input-field block  pl-10 pr-4 py-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-teal-500'
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <Table className='bg-[#1c3d4f] rounded-t-[12px]'>
            <Table.Head className='bg-[#0f2e3f]'>
              <Table.HeadCell className='bg-[#1c3d4f] text-white border-r-[5px] border-[#0f2e3f] rounded-t-[12px]'>
                Name
              </Table.HeadCell>
              <Table.HeadCell className='bg-[#1c3d4f] text-white'>Key Type</Table.HeadCell>
              <Table.HeadCell className='bg-[#1c3d4f]'></Table.HeadCell>
              <Table.HeadCell className='bg-[#1c3d4f] rounded-tr-[12px]'></Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              <Table.Row className='border-b-[5px] !border-t-[5px] border-[#0f2e3f] bg-[#1c3d4f]'>
                <Table.Cell className='text-white  border-r-[5px] border-[#0f2e3f]'>tails-website@boum.org</Table.Cell>
                <Table.Cell className='flex gap-[40px] justify-between text-white  border-r-[5px] border-[#0f2e3f]'>
                  Public key
                  <div className='flex gap-[10px] items-center'>
                    <img src='/eye-icon.svg' alt='copy-icon' onClick={openModal} className='cursor-pointer' />
                    <img src='/copy-icon.svg' alt='copy-icon' />
                  </div>
                </Table.Cell>
                <Table.Cell className='text-white'>
                  <div className='flex justify-between'>
                    Private key
                    <div className='flex gap-[10px] items-center'>
                      <img src='/eye-icon.svg' alt='copy-icon' className='cursor-pointer' onClick={openModal} />
                      <img src='/copy-icon.svg' alt='copy-icon' />
                    </div>
                  </div>
                </Table.Cell>

                <Table.Cell>
                  <a href='#' className='flex justify-end'>
                    <img src='/delete-icon.svg' alt='delete-icon' onClick={openModalTwo} />
                  </a>
                </Table.Cell>
              </Table.Row>
              <Table.Row className='border-b-[5px] !border-t-[5px] border-[#0f2e3f] bg-[#1c3d4f]'>
                <Table.Cell className='text-white  border-r-[5px] border-[#0f2e3f]'>tails-website@boum.org</Table.Cell>
                <Table.Cell className='flex gap-[40px] justify-between text-white  border-r-[5px] border-[#0f2e3f]'>
                  Public key
                  <div className='flex gap-[10px] items-center'>
                    <img src='/eye-icon.svg' alt='copy-icon' onClick={openModal} className='cursor-pointer' />
                    <img src='/copy-icon.svg' alt='copy-icon' />
                  </div>
                </Table.Cell>
                <Table.Cell className='text-white'>
                  <div className='flex justify-between'>
                    Private key
                    <div className='flex gap-[10px] items-center'>
                      <img src='/eye-icon.svg' alt='copy-icon' className='cursor-pointer' onClick={openModal} />
                      <img src='/copy-icon.svg' alt='copy-icon' />
                    </div>
                  </div>
                </Table.Cell>

                <Table.Cell>
                  <a href='#' className='flex justify-end'>
                    <img src='/delete-icon.svg' alt='delete-icon' onClick={openModalTwo} />
                  </a>
                </Table.Cell>
              </Table.Row>
              <Table.Row className='border-b-[5px] !border-t-[5px] border-[#0f2e3f] bg-[#1c3d4f]'>
                <Table.Cell className='text-white  border-r-[5px] border-[#0f2e3f]'>tails-website@boum.org</Table.Cell>
                <Table.Cell className='flex gap-[40px] justify-between text-white  border-r-[5px] border-[#0f2e3f]'>
                  Public key
                  <div className='flex gap-[10px] items-center'>
                    <img src='/eye-icon.svg' alt='copy-icon' onClick={openModal} className='cursor-pointer' />
                    <img src='/copy-icon.svg' alt='copy-icon' />
                  </div>
                </Table.Cell>
                <Table.Cell className='text-white'>
                  <div className='flex justify-between'>
                    Private key
                    <div className='flex gap-[10px] items-center'>
                      <img src='/eye-icon.svg' alt='copy-icon' className='cursor-pointer' onClick={openModal} />
                      <img src='/copy-icon.svg' alt='copy-icon' />
                    </div>
                  </div>
                </Table.Cell>

                <Table.Cell>
                  <a href='#' className='flex justify-end'>
                    <img src='/delete-icon.svg' alt='delete-icon' onClick={openModalTwo} />
                  </a>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <div className='flex justify-between items-center space-x-4 mt-[64px]'>
            <div className='flex items-center space-x-2'>
              <button className='px-3 py-1 bg-[#0B2837] text-white rounded-md hover:bg-[#1B3D4F]'>← Prev</button>

              <button className='px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600'>1</button>
              <button className='px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600'>2</button>
              <button className='px-3 py-1 bg-teal-500 text-white rounded-md'>3</button>
              <button className='px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600'>4</button>
              <button className='px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600'>5</button>

              <span className='text-white'>...</span>

              <button className='px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600'>20</button>

              <button className='px-3 py-1 bg-[#0B2837] text-white rounded-md hover:bg-[#1B3D4F]'>Next →</button>
            </div>

            <div className='flex items-center space-x-2 text-white'>
              <label htmlFor='per-page' className='text-sm'>
                Per page:
              </label>
              <select
                id='per-page'
                className='px-2 py-1  bg-gray-700 text-white rounded-md hover:bg-gray-600 border-none focus:ring focus:ring-teal-500 input-field'
              >
                <option>10 per page</option>
                <option>20 per page</option>
                <option>50 per page</option>
                <option>100 per page</option>
              </select>
            </div>
          </div>
        </div>
        <div className='mobile-view-table xs:block sm:block md:hidden lg:hidden px-[16px]'>
          <div className='mb-[12px]'>
            <Formik
              initialValues={{ search: '' }}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {() => (
                <Form className='relative'>
                  <div className='flex items-center'>
                    <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                      <svg
                        className='h-5 w-5 text-white'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                        />
                      </svg>
                    </span>
                    <Field
                      name='search'
                      type='text'
                      placeholder='Search...'
                      className='input-field block w-full pl-10 pr-4 py-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-teal-500'
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className='text-white bg-[#1B3D4F] rounded-t-[8px] px-[16px] py-[8px] text-[12px] font-normal leading-[16.7px] mb-[15px]'>
            Key Types
          </div>
          <div className='flex flex-col  w-full'>
            <div className='key-item bg-[#1B3D4F] px-[6px] py-[11px] w-full mb-[6px]'>
              <div className='flex justify-between border-b-[#0F2E3F] border-b-[1px] pb-[9px]'>
                <p className='text-white text-[14px] font-normal leading-[17px]'>tails-website@boum.org</p>
                <img
                  src='/delete-icon.svg'
                  alt='delete-icon'
                  className='key-icons cursor-pointer'
                  onClick={openModalTwo}
                />
              </div>
              <div className='flex pt-[14px] justify-between'>
                <div className='flex justify-between gap-[20px] items-center'>
                  <span className='text-white text-[12px]'>Public key</span>
                  <div className='flex gap-[10px] items-center'>
                    <img src='/eye-icon.svg' alt='copy-icon' className='key-icons cursor-pointer' onClick={openModal} />
                    <img src='/copy-icon.svg' alt='copy-icon' className='key-icons' />
                  </div>
                </div>
                <div className='flex justify-between gap-[20px] items-center'>
                  <span className='text-white text-[12px]'>Public key</span>
                  <div className='flex gap-[10px] items-center'>
                    <img src='/eye-icon.svg' alt='copy-icon' className='key-icons cursor-pointer' onClick={openModal} />
                    <img src='/copy-icon.svg' alt='copy-icon' className='key-icons' />
                  </div>
                </div>
              </div>
            </div>
            <div className='key-item bg-[#1B3D4F] px-[6px] py-[11px] w-full mb-[6px]'>
              <div className='flex justify-between border-b-[#0F2E3F] border-b-[1px] pb-[9px]'>
                <p className='text-white text-[14px] font-normal leading-[17px]'>tails-website@boum.org</p>
                <img
                  src='/delete-icon.svg'
                  alt='delete-icon'
                  className='key-icons cursor-pointer'
                  onClick={openModalTwo}
                />
              </div>
              <div className='flex pt-[14px] justify-between'>
                <div className='flex justify-between gap-[20px] items-center'>
                  <span className='text-white text-[12px]'>Public key</span>
                  <div className='flex gap-[10px] items-center'>
                    <img src='/eye-icon.svg' alt='copy-icon' className='key-icons cursor-pointer' onClick={openModal} />
                    <img src='/copy-icon.svg' alt='copy-icon' className='key-icons' />
                  </div>
                </div>
                <div className='flex justify-between gap-[20px] items-center'>
                  <span className='text-white text-[12px]'>Public key</span>
                  <div className='flex gap-[10px] items-center'>
                    <img src='/eye-icon.svg' alt='copy-icon' className='key-icons cursor-pointer' onClick={openModal} />
                    <img src='/copy-icon.svg' alt='copy-icon' className='key-icons' />
                  </div>
                </div>
              </div>
            </div>
            <div className='key-item bg-[#1B3D4F] px-[6px] py-[11px] w-full mb-[6px]'>
              <div className='flex justify-between border-b-[#0F2E3F] border-b-[1px] pb-[9px]'>
                <p className='text-white text-[14px] font-normal leading-[17px]'>tails-website@boum.org</p>
                <img
                  src='/delete-icon.svg'
                  alt='delete-icon'
                  className='key-icons cursor-pointer'
                  onClick={openModalTwo}
                />
              </div>
              <div className='flex pt-[14px] justify-between'>
                <div className='flex justify-between gap-[20px] items-center'>
                  <span className='text-white text-[12px]'>Public key</span>
                  <div className='flex gap-[10px] items-center'>
                    <img src='/eye-icon.svg' alt='copy-icon' className='key-icons cursor-pointer' onClick={openModal} />
                    <img src='/copy-icon.svg' alt='copy-icon' className='key-icons' />
                  </div>
                </div>
                <div className='flex justify-between gap-[20px] items-center'>
                  <span className='text-white text-[12px]'>Public key</span>
                  <div className='flex gap-[10px] items-center'>
                    <img src='/eye-icon.svg' alt='copy-icon' className='key-icons cursor-pointer' onClick={openModal} />
                    <img src='/copy-icon.svg' alt='copy-icon' className='key-icons' />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-between items-center space-x-4 mt-[64px]'>
            <div className='flex items-center space-x-1'>
              <button className='text-[7.6px] px-1 py-1 bg-[#0B2837] text-white rounded-md hover:bg-[#1B3D4F]'>
                ← Prev
              </button>

              <button className='text-[7.6px] px-2 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600'>1</button>
              <button className='text-[7.6px] px-2 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600'>2</button>
              <button className='text-[7.6px] px-2 py-1 bg-teal-500 text-white rounded-md'>3</button>

              <span className='text-white'>...</span>

              <button className='text-[7.6px] px-2 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600'>20</button>

              <button className='text-[7.6px] px-1 py-1 bg-[#0B2837] text-white rounded-md hover:bg-[#1B3D4F]'>
                Next →
              </button>
            </div>

            <div className='flex items-center space-x-2 text-white'>
              <select
                id='per-page'
                className='!px-2 py-1 text-[7.6px] bg-gray-700 text-white rounded-md hover:bg-gray-600 border-none focus:ring focus:ring-teal-500 input-field'
              >
                <option>10 per page</option>
                <option>20 per page</option>
                <option>50 per page</option>
                <option>100 per page</option>
              </select>
            </div>
          </div>
        </div>
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

      <Modal show={isOpenTwo} onClose={closeModalTwo} className='bg-black'>
        <Modal.Header className='pt-[10px] !pl-[0px] !pb-[2px] bg-[#1B3D4F] border-none'></Modal.Header>

        <Modal.Body className='bg-[#1B3D4F] !pt-[0px] !pb-[50px]'>
          <img src='/alert-icon.svg' alt='alert-icon' className='mx-auto mb-[30px]' />
          <p className='text-white text-center text-[22px] leading-[30px] w-full max-w-[499px] mx-auto'>
            Are you sure you want to delete this key passcode?
          </p>
          <div className='flex gap-[15px] mt-[37px] justify-center max-w-[328px] w-full mx-auto'>
            <button
              className='bg-transparent rounded-[4px] text-[16px] font-normal leading-[19.5px] w-full max-w-[250px] h-[47px] flex justify-center items-center text-[#57CBCC] border-[1px] border-[#57CBCC]'
              onClick={() => closeModalTwo(false)}
            >
              Cancel
            </button>
            <button className='bg-[#57CBCC] rounded-[4px] text-[16px] font-normal leading-[19.5px] w-full max-w-[250px] h-[47px] flex justify-center items-center text-white'>
              Delete
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MainHome;
