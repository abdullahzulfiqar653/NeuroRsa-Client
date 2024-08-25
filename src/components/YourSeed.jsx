import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TagsInput } from 'react-tag-input-component';
import { Link } from 'react-router-dom';
const GroupComponent = ({ className = '' }) => {
  const [selected, setSelected] = useState([]);
  return (
    <>
      <h2 className='text-white text-[22px] leading-[64px] font-normal text-center w-full mb-[5px] mt-[0px]'>
        Your Seed
      </h2>
      <div className='self-stretch flex flex-col items-start justify-start gap-[5px] text-mini-1 font-montserrat'>
        <div className='flex flex-row items-start justify-start py-0 px-px'>
          <div className='text-[12px] relative leading-[22px] font-medium inline-block min-w-[66px] z-[1]'>Key Seed</div>
        </div>
        <div className='bg-darkslategray-200 h-[153px] w-full rounded-borderradius-large box-border overflow-y-auto overflow-x-hidden custom-tab-box'>
          <TagsInput value={selected} name='tags' placeHolder='Enter your Key Seed...' />
        </div>
        <p className='text-[8px] font-normal leading-[27px] my-[0px]'>Please write these down incase you lose your seed</p>
      </div>
      <div className='w-full max-w-[223px] mx-auto  mt-[68px] flex flex-col items-center justify-center pt-0 px-0 text-center text-base font-montserrat'>
        <div className='w-full flex flex-col items-start justify-start gap-[10.8px] mb-[10px]'>
          <div className='self-stretch rounded-[4.38px] bg-mediumturquoise flex flex-row items-start justify-start pt-3.5 pb-[13.9px] pl-[50px] pr-[49px] shrink-0 z-[1]'>
            <div className='h-[47.2px] w-full relative rounded-[4.38px] bg-mediumturquoise hidden' />
            <div className='flex-1 relative z-[1]'>Next</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default GroupComponent;
GroupComponent.propTypes = {
  className: PropTypes.string,
};
