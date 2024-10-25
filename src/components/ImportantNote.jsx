import PropTypes from 'prop-types';
const GroupComponent = ({ className = '', onShowSeed }) => {
  return (
    <>
      <h2 className='text-white text-[20px] md:text-[32px] leading-[30px] md:leading-[64px] font-medium text-center w-full mb-[15px] md:mb-[5px] mt-[35px] md:mt-[44px]'>
        Important Note
      </h2>
      <div className='self-stretch flex flex-col items-start justify-start gap-[5px] text-mini-1 font-montserrat'>
        <div className='flex flex-row items-start justify-start py-0 px-px'>
          <p className='font-normal text-[14px] leading-[22px] text-center mt-[0px] mb-[30px]'>
            On the next page you will see a series of 16 words. This is your unique and private seed and it is the ONLY
            way to recover your wallet in case of loss or manifestation. It is your responsibility to write it down and
            store it in a safe place outside of the password manager app
          </p>
        </div>
      </div>
      <div className='self-stretch flex flex-col items-center justify-center pt-0 px-0 text-center text-base font-montserrat'>
        <div className='w-full flex flex-col items-start justify-start gap-[10.8px] mb-[10px]'>
          <div
            onClick={onShowSeed}
            className='cursor-pointer h-[42.2px] self-stretch rounded-[4.38px] bg-mediumturquoise flex flex-row items-center justify-center text-center shrink-0 z-[1]'
          >
            <div className='flex-1 relative z-[1] text-[14px] md:text-[16px]'>I understand, show me my seed</div>
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
