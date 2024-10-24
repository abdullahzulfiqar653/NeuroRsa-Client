import React from "react";
import Header from "../components/Header";

function InfoAboutWebsite() {
  return (
    <div>
      {" "}
      <div className={`bg-[#0f2e3f] lg:h-[100vh]`}>
        <div className="bg-[#0B2837] w-full items-center">
          <Header />
          <div className="flex flex-col relative justify-center items-center text-center  bg-[#1c3d4f] w-full h-full">
          <div className="text-[#E5E5E5B8] relative z-10 flex flex-col justify-start text-start items-start px-[16px] py-5 sm:px-24 sm:py-16">
              <h1 className="text-[#f7f7f7] text-[22px] leading-[30.73px]">
                What is neuro.RSA
              </h1>
              <p className="leading-[19.08px] text-[13px] sm:text-[14px] text-[#E5E5E5B8]">
                neuro.RSA is a simple tool that helps you keep your messages
                private by using encryption. Encryption turns your regular
                message into a secret code that only the person who is supposed
                to read it can understand. Let’s walk you through how neuro.RSA
                works, step by step!
              </p>
              <div className="w-full h-full flex flex-col text-[13px] sm:text-[16px] text-start items-start bg-[#0B2837] px-6 py-4 mt-9">
                <p className="text-white">Step 1:</p>
                <p>Generate Your Keys (Key Pairs)</p>
                <p>
                  To get started with neuro.RSA, you need two special keys:{" "}
                </p>
                <p>
                  <span className="text-white">Private Key</span> (like a secret
                  password, only you should know it).
                </p>
                <p>
                  <span className="text-white">Public Key</span> (like an
                  address that others can use to send you secure messages).
                </p>
                Think of it like a mailbox. Your private key is the only way to
                open the mailbox, while your public key is what others use to
                drop messages into it.
              </div>
              <div className="w-full h-full flex flex-col text-[13px] sm:text-[16px] text-start items-start bg-[#0B2837] px-6 py-4 mt-5">
                <ul>
                  <li>
                    <span className="text-white">How to Generate Keys:</span>
                  </li>
                  <li>
                    In neuro.RSA, you can generate these keys with just one
                    click.
                  </li>
                  <li>
                    You’ll get two keys: a "Private Key" and a "Public Key."
                  </li>
                  <li>
                    Keep your Private Key safe and secret, and share your Public
                    Key with anyone who needs to send you an encrypted message.
                  </li>
                  <li>Step 2: Write Your Secret Messages in the Notepad</li>
                  <li>
                    neuro.RSA has a special place called Notepad, where you can
                    write your private messages.
                  </li>
                </ul>
              </div>
              <div className="w-full h-full flex flex-col text-[13px] sm:text-[16px] text-start items-start bg-[#0B2837] px-6 py-4 mt-5">
                <ul>
                  <li>
                    <span className="text-white">How to Generate Keys:</span>
                  </li>
                  <li>
                    In neuro.RSA, you can generate these keys with just one
                    click.
                  </li>
                  <li>
                    You’ll get two keys: a "Private Key" and a "Public Key."
                  </li>
                  <li>
                    Keep your Private Key safe and secret, and share your Public
                    Key with anyone who needs to send you an encrypted message.
                  </li>
                  <li>Step 2: Write Your Secret Messages in the Notepad</li>
                  <li>
                    neuro.RSA has a special place called Notepad, where you can
                    write your private messages.
                  </li>
                </ul>
              </div>
              <div className="w-full h-full flex flex-col text-[13px] sm:text-[16px] text-start items-start bg-[#0B2837] px-6 py-4 mt-5">
                <ul>
                  <li>
                    <span className="text-white">How to Add Recipients:</span>
                  </li>
                  <li>
                    You will need the Public Key of the person you want to send
                    the message to (this is like knowing their address).
                  </li>
                  <li>
                    In neuro.RSA, create a recipient record by entering their
                    Public Key.
                  </li>
                  <li>
                    Once the recipient is added, you can select them when you
                    send your message.
                  </li>
                  <li>
                    <strong>Note:</strong> You can choose multiple recipients
                    for one message. However, the message will only be encrypted
                    with your Private Key, so make sure you keep it safe!
                  </li>
                </ul>
              </div>
              <div className="w-full h-full flex flex-col text-[13px] sm:text-[16px] text-start items-start bg-[#0B2837] px-6 py-4 mt-5">
                <ul>
                  <li>
                    <span className="text-white">Step 4:</span>
                  </li>
                  <li>Encrypt and Send the Message</li>
                  <li>
                    Once you’ve written your message and chosen your recipients,
                    you can encrypt the message using neuro.RSA.
                  </li>
                </ul>
              </div>
              <div className="w-full h-full flex flex-col text-[13px] sm:text-[16px] text-start items-start bg-[#0B2837] px-6 py-4 mt-5">
                <ul>
                  <li>
                    <span className="text-white">How Encryption Works:</span>
                  </li>
                  <li>
                    The message is encrypted using your Private Key, so only
                    those with your recipients' Public Keys can unlock and read
                    it.
                  </li>
                  <li>
                    <strong>Step 5:</strong> Copy and Paste the Encrypted
                    Message Anywhere
                  </li>
                  <li>
                    After your message is encrypted, you can copy the encrypted
                    message from neuro.RSA and paste it into any messenger app
                    or email—like WhatsApp, Telegram, Messenger, or even regular
                    email.
                  </li>
                </ul>
              </div>
              <div className="w-full h-full flex flex-col text-[13px] sm:text-[16px] text-start items-start bg-[#0B2837] px-6 py-4 mt-5">
                <ul>
                  <li>
                    <span className="text-white">How Encryption Works:</span>
                  </li>
                  <li>
                    The message is encrypted using your Private Key, so only
                    those with your recipients' Public Keys can unlock and read
                    it.
                  </li>
                  <li>Step 5: Copy and Paste the Encrypted Message Anywhere</li>
                  <li>
                    After your message is encrypted, you can copy the encrypted
                    message from neuro.RSA and paste it into any messenger app
                    or email—like WhatsApp, Telegram, Messenger, or even regular
                    email.
                  </li>
                  <li className="mt-2">
                    Even if someone else, like a third party or law enforcement,
                    intercepts the message, they won’t be able to decrypt it
                    without your recipients' Public Keys. This means your
                    message stays safe and private, no matter where you send it!
                  </li>
                  <li>Step 6:Decrypting a Message</li>
                  <li>
                    When someone sends you an encrypted message using your
                    Public Key, you’ll need your Private Key to decrypt (unlock)
                    and read it.
                  </li>
                </ul>
              </div>
              <div className="w-full h-full flex flex-col text-[13px] sm:text-[16px] text-start items-start bg-[#0B2837] px-6 py-4 mt-5">
                <ul>
                  <li>
                    <span className="text-white">
                      Quick Summary:Generate your keys:
                    </span>
                  </li>
                  <li>
                    Generate your keys: You get a Private Key (keep it secret)
                    and a Public Key (share it with others).
                  </li>
                  <li>
                    Use the Notepad: Write your secret messages here and choose
                    recipients.
                  </li>
                  <li>
                    Encrypt the message: After choosing your recipients, the
                    message will be encrypted using your Private Key.
                  </li>
                  <li>
                    Copy and paste: You can copy the encrypted message and paste
                    it into any messenger or email app. Even if someone
                    intercepts it, they won’t be able to decrypt it without your
                    recipient's Public Key.
                  </li>
                </ul>
              </div>
              <div className="w-full h-full flex flex-col text-[13px] sm:text-[16px] text-start items-start bg-[#0B2837] px-6 py-4 mt-5">
                <ul>
                  <li className="text-white">Decrypt a Message:</li>
                  <li>
                    When you receive a message, use your Private Key to read it.
                  </li>
                  <li>
                    With neuro.RSA, your private messages are secure, and only
                    the right people can read them, no matter which platform you
                    use to send them!
                  </li>
                </ul>
              </div>
            </div>
            <img src="/InfoBg.svg" className="absolute hidden sm:block bottom-[10px] z-0"/>
            <img src="/InfoBgMobile.svg" className="absolute sm:hidden  bottom-[10px] right-4 z-0"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoAboutWebsite;
