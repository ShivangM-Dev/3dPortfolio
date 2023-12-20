import React, { useRef, useState,  } from 'react';
import emailjs from '@emailjs/browser';

import Alert from '../components/Alert';
import useAlert from '../hooks/useAlert';

const Contact = () => {

  const formRef =useRef(null);
  const [form,setForm] = useState({
    name:'',
    email:'',
    message:''
  })

const {alert, showAlert, hideAlert} = useAlert();
const [isLoading,setIsLoading] = useState(false);

  const handleChange = (e) =>{

      setForm({...form,[e.target.name]:e.target.value})
  };

  const handleFocus = () =>{};

  const handleBlur = () =>{}; 

  const handleSubmit = (e) =>{
    e.preventDefault();
    setIsLoading(true); 

    emailjs.send(

      
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      
      {
        from_name: form.name,
        to_name: "Shivang Mandal",
        from_email: form.email,
        to_email: "shivangmdev@gmail.com",
        message: form.message,

      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ) .then(
      () => {
        setIsLoading(false);
        showAlert({
          show: true,
          text: "Thank you for your message 😃",
          type: "success",
        });

        setTimeout(() => {
          hideAlert(false);
          setForm({
            name: "",
            email: "",
            message: "",
          });
        }, [3000]);
      }).catch((error) => {
        setIsLoading(false);
        console.error(error);
         showAlert({
          show: true,
          text: "I didn't receive your message 😢",
          type: "danger",
        });
      })
    
};


  return (
    
      <section className='relative flex lg:flex-row  flex-col max-container' >
          {alert.show && <Alert {...alert} /> }
          <Alert {...alert} />          

        <div className='flex-1 min-w-[50%] felx flex-col'>
          <h1 className="head-text">Let's get in touch!</h1>

          <form className="w-full flex flex-col gap-7 mt-14"
          onSubmit={handleSubmit}>
            <label className="text-black-500 font-semibold">
              Name
              <input
                type="text"
                name="name"
                className='input'
                placeholder='Sam Smith'
                required
                value={form.name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            
            <label className="text-black-500 font-semibold">
              Email
              <input
                type="email"
                name="email"
                className='input'
                placeholder='samsmith@gmail.com'
                required
                value={form.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>

            <label className="text-black-500 font-semibold">
              Your Message
              <textarea
                name="message"
                rows={4}
                className='textarea'
                placeholder='Let me know how can I help you!'
                required
                value={form.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>

            <button 
            className="btn"
            type='submit'
            disabled={isLoading}
            onFocus={handleFocus}
            onBlur={handleBlur}            
            
            >{isLoading ? 'Sending...': 'Send Message'}</button>


          </form>
        </div>

      </section>
    
  )
};

export default Contact;

