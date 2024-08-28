import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
const Home = ({ className = '' }) => {
  return (
    <section
      className={`self-stretch overflow-x-hidden flex flex-row items-start justify-start max-w-full text-left text-lg text-gray-200 font-montserrat bg-image h-[100vh] ${className}`}
    >
      <div className='absolute z-40 w-full'>
        <Header />
      </div>
      <div className='flex-1 flex flex-col  max-w-full lg:gap-[63px] mq750:gap-8 mq450:gap-4'>
        <div className='h-[100vh] xs:max-w-[100%] md:max-w-[883px] lg:max-w-[883px] flex flex-row items-center justify-start py-0 px-8 box-border max-w-full text-xl text-gainsboro font-neue-plak z-10'>
          <div className='flex-1 flex flex-col items-start justify-start gap-[69px] max-w-full mq450:gap-[17px] mq1050:gap-[34px]'>
            <div className='self-stretch flex flex-col items-start justify-start gap-[25px] max-w-full'>
              <div className='xs:max-w-[100%] md:max-w-[724px] lg:max-w-[724px] flex flex-col items-start justify-start gap-[17px] max-w-full text-24xl text-white'>
                <h1 className='mt-0 mb-[17px] xs:max-w-[100%] md:max-w-[518px] lg:max-w-[518px] relative text-[43px] font-normal font-[inherit] inline-block max-w-full z-[1] mq450:text-7xl mq1050:text-15xl'>
                  Welcome to neuro.RSA
                </h1>
                <div className='self-stretch relative text-[20px] leading-[23px] text-gainsboro inline-block    z-[1] max-w-[724px]'>
                  Neuro.RSA is a front-end for the crypto software. For most actions you need either a public key
                  (certificate) or your own private key.
                </div>
              </div>
              <div className='self-stretch flex flex-row items-start justify-start py-0 pl-[19px] pr-0 box-border max-w-full'>
                <div className='flex-1 flex flex-col items-start justify-start gap-[19px] max-w-full'>
                  <div className='w-[745px] flex flex-row  items-start justify-start gap-[9px] max-w-full'>
                    <div className='flex flex-col items-start justify-start pt-1.5 px-0 pb-0'>
                      <input className='cursor-pointer m-0 w-3 h-3 relative z-[1]' type='radio' name='radioGroup-1' />
                    </div>
                    <div className='flex-1 relative inline-block max-w-full z-[1] mq750:min-w-full text-white'>
                      The private key is needed to decrypt or sign.
                    </div>
                  </div>
                  <div className='self-stretch flex flex-row flex-wrap items-start justify-start gap-[9px] max-w-full'>
                    <div className='flex flex-col items-start justify-start pt-1.5 px-0 pb-0'>
                      <input className='cursor-pointer m-0 w-3 h-3 relative z-[1]' type='radio' name='radioGroup-1' />
                    </div>
                    <div className='flex-1 relative inline-block  max-w-full z-[1] mq750:min-w-full text-white'>
                      The public key can be used by others to verify your identity or encrypt to you.
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-[724px] h-7 relative inline-block max-w-full z-[1] text-white'>
                You can learn more about Neuro.RSA
              </div>
            </div>
            <div className='w-[438px] flex flex-row flex-wrap items-start justify-start gap-[22px] max-w-full text-white font-montserrat'>
              <button className='cursor-pointer border-darkslategray-100 border-[1px] border-solid py-[22px] pl-[27px] pr-6 bg-darkslategray-300 flex-1 box-border flex flex-row items-start justify-start gap-[15px] min-w-[135px] z-[1]'>
                <div className='h-[82px] w-52 relative bg-darkslategray-300 border-darkslategray-100 border-[1px] border-solid box-border hidden' />
                <div className='h-[34px] w-[37px] relative'>
                  <img
                    className='absolute top-[0px] left-[0px] w-[34px] h-[34px] overflow-hidden z-[1]'
                    alt=''
                    src='/gis_map-lock.svg'
                  />
                </div>
                <div className='flex-1 flex flex-col items-start justify-start pt-1 px-0 pb-0'>
                  <div className='self-stretch relative text-xl font-neue-plak text-white text-left z-[1] mq450:text-base'>
                    <Link to='/login' className='text-white no-underline'>
                      Login
                    </Link>
                  </div>
                </div>
              </button>
              <button className='cursor-pointer border-darkslategray-100 border-[1px] border-solid py-[22px] pl-[27px] pr-6 bg-darkslategray-300 flex-1 box-border flex flex-row items-start justify-start gap-[15px] min-w-[135px] z-[1]'>
                <div className='h-[82px] w-52 relative bg-darkslategray-300 border-darkslategray-100 border-[1px] border-solid box-border hidden' />
                <div className='h-[34px] w-[37px] relative'>
                  <img
                    className='absolute top-[0px] left-[0px] w-[34px] h-[34px] overflow-hidden z-[1]'
                    alt=''
                    src='/gis_map-lock.svg'
                  />
                </div>
                <div className='flex-1 flex flex-col items-start justify-start pt-1 px-0 pb-0'>
                  <div className='self-stretch relative text-xl font-neue-plak text-white text-left z-[1] mq450:text-base'>
                    <Link to='/register-seed' className='text-white no-underline'>
                      Register
                    </Link>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='xs:w-[100%] md:w-[971px] lg:w-[971px] flex flex-col items-start justify-start pt-[41px] px-0 pb-0 box-border max-w-full xs:ml-[-100%] md:ml-[-618px] lg:ml-[-618px]'>
        <div className='self-stretch h-[766.4px] relative'>
          <div className='absolute xs:bottom-[0px] md:top-[0px] lg:top-[0px]  xs:right-[15px] md:left-[267px] lg:left-[267px]  rounded-[50%] bg-darkslategray-300 w-full sm:max-w-[267px] md:max-w-[704px] lg:max-w-[704px] sm:h-[336px] md:h-[704px] lg:h-[704px] z-[1]' />
          <img
            className='absolute xs:right-[0] md:left-[auto] lg:left-[auto] md:right-20 lg:right-20 xs:bottom-[0px] md:top-[20px] lg:top-[20px] w-full xs:max-w-[267px] md:max-w-[549.8px] lg:max-w-[549.8px] xs:h-[336px] md:h-[714.4px] lg:h-[714.4px] z-[2]'
            loading='lazy'
            alt=''
            src='/group.svg'
          />
          <img
            className='absolute xs:bottom-[0px] md:top-[20px] lg:top-[20px] xs:right-[0px] md:left-[auto] lg:left-[auto] md:right-20 lg:right-20  w-full xs:max-w-[267px] md:max-w-[586px] lg:max-w-[586px]  xs:h-[336px] md:h-[665.8px] lg:h-[665.8px] z-[3]'
            alt=''
            src='/layer-2.svg'
          />
        </div>
      </div>
    </section>
  );
};

Home.propTypes = {
  className: PropTypes.string,
};

export default Home;
