import React from 'react';

const ContactUs = () => {
  const email = 'ameydhimte03@gmail.com';

  return (
    <div className='contact'>
      <h2>Contact Us</h2>
      <p>
        Hope you are enjoying using the website. For any queries or feedback,
        please feel free to contact us:
      </p>
      <ul>
        <li>
          <strong>Developer:</strong> Amey Dhimte
        </li>
        <li>
          <strong>Email:</strong>{' '}
          <a href={`mailto:${email}`}>{email}</a>
        </li>
      </ul>
    </div>
  );
};

export default ContactUs;
