import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const KeyFrame = () => {
  return (
    <section
      className={`self-stretch overflow-x-hidden items-start justify-start max-w-full text-left text-lg text-gray-200 font-montserrat bg-[#081720] h-[100vh]`}
    >
      <div className='bg-[#0B2837]'>
        <Header />
      </div>

      <div className='max-w-[1448px] mx-auto relative overflow-x-auto pt-[50px]'>
        <div class='xs:hidden sm:hidden md:flex lg:flex self-stretch bg-[#1B3D4F] flex-row items-center justify-between pt-[14px]  pb-[10px] pl-0 pr-[9px] box-border max-w-full gap-5 mq1300:flex-wrap mq1300:pl-[9px] mq1300:pb-[9px] mq1300:box-border'>
          <div class='w-full flex flex-col items-center justify-start  px-0 pb-0 box-border max-w-full h-full'>
            <div class='flex justify-center items-center h-full w-full'>
              <div class='w-full flex flex-row items-start justify-center py-0 px-5 box-border'>
                <a class='[text-decoration:none] h-[31px] relative font-black text-[inherit] inline-block min-w-[89px] z-[1] mq450:text-lg'>
                  Notepad
                </a>
              </div>
            </div>
          </div>
          <div class='w-full max-w-[712px] flex flex-col items-center justify-center  text-gray-300'>
            <a class='[text-decoration:none] h-[31px] relative font-black text-[inherit] inline-block min-w-[108px] z-[1] mq450:text-lg'>
              Recipients
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

KeyFrame.propTypes = {
  className: PropTypes.string,
};

export default KeyFrame;
