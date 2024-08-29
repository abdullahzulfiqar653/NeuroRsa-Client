import PropTypes from 'prop-types';

const GroupComponent = ({ className = '' }) => {
  return (
    <div
      className={`w-[458px] sm:w-[458px] md:w-[458px] lg:w-[458px] rounded-[32px] [background:linear-gradient(180deg,_#1f729d,_#0b2837)] border-darkslategray-100 border-[1px] border-solid box-border flex flex-col items-end justify-start pt-[67px] pb-3.5 pl-[18px] pr-[19px] gap-[71px] max-w-full z-[2] text-left text-9xl text-white font-neue-plak mq450:gap-[34px] mq725:pt-11 mq725:pb-5 mq725:box-border ${className}`}
    >
      <div className='w-[458px]  h-[732px] relative rounded-13xl [background:linear-gradient(180deg,_#1f729d,_#0b2837)] border-darkslategray-100 border-[1px] border-solid box-border hidden max-w-full' />
      <div className='self-stretch flex flex-row items-start justify-end pt-0 pb-2 pl-10 pr-[38px] box-border max-w-full'>
        <div className='flex-1 flex flex-col items-start justify-start gap-[16px] max-w-full'>
          <div className='self-stretch flex flex-row  py-0 items-center justify-center mq450:pl-5 mq450:pr-5 mq450:box-border'>
            <div className='flex flex-row items-center justify-center gap-3 mq450:flex-wrap'>
              <img className='h-[31.6px] w-[31px] relative z-[1]' loading='lazy' alt='' src='/union.svg' />
              <h1 className='m-0 relative text-[30px] text-white font-normal inline-block z-[1] mq450:text-3xl'>
                neuro.RSA
              </h1>
            </div>
          </div>
          <h3 className='m-0 self-stretch relative text-lg leading-[22px] font-normal font-[inherit] text-center z-[1]'>
            Please enter 6-digit code that appears in your authentication app for Two-factor authentication
          </h3>
        </div>
      </div>
      <div className='self-stretch flex flex-col items-start justify-start gap-[5px] text-mini-1 font-montserrat'>
        <div className='flex flex-row items-start justify-start py-0 px-px'>
          <div className='text-[14px]  relative leading-[22px] font-medium inline-block min-w-[66px] z-[1]'>
            Enter Code
          </div>
        </div>
        <div className='verify-field w-full'>
          <input
            type='number'
            min={0}
            className='!bg-[#0E3244] w-full border-steelblue border-[0.4px] border-solid  [outline:none] self-stretch !rounded-[10px] box-border flex flex-row items-center justify-start p-3.5 font-montserrat text-base-5 text-white z-[1] input-field'
            placeholder='Verification Code'
          />
        </div>
      </div>
      <div className='self-stretch flex flex-row items-start justify-center pt-0 px-0 pb-[59px] text-center text-base font-montserrat'>
        <div className='w-[223px] flex flex-col items-start justify-start gap-[10.8px]'>
          <div className='self-stretch rounded-[4.38px] bg-mediumturquoise flex flex-row items-start justify-start pt-3.5 pb-[13.9px] pl-[50px] pr-[49px] shrink-0 z-[1]'>
            <div className='h-[47.2px] w-[223px] relative rounded-[4.38px] bg-mediumturquoise hidden' />
            <div className='flex-1 relative z-[1]'>Verify Code</div>
          </div>
        </div>
      </div>
      <div className='self-stretch flex flex-row items-start justify-center py-0 pl-px pr-0 text-center text-sm text-gray-200'>
        <div className='w-full relative leading-[22px] inline-block z-[3]'>Produced by: Neuronus Computing</div>
      </div>
    </div>
  );
};

GroupComponent.propTypes = {
  className: PropTypes.string,
};

export default GroupComponent;
