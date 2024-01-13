import React from "react";
import "./style.css";

function Socalmedial() {
  // Function to generate WhatsApp links
  const getWhatsAppLinks = () => {
    const phoneNumber = "+918926152152";
    const regularWhatsAppLink = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=Zoomwheels+Team%2C+I+would+like+to+know+more&type=phone_number&app_absent=0`;
    const businessWhatsAppLink = `https://wa.me/${phoneNumber}?text=Hello%20from%20Zoomwheels&source=business`;

    return {
      regularWhatsAppLink,
      businessWhatsAppLink,
    };
  };

  const { regularWhatsAppLink, businessWhatsAppLink } = getWhatsAppLinks();

  return (
    <div>
      <div id='fixed-social'>
        <div>
          <a
            href='https://www.facebook.com/zoomwheels/'
            className='fixed-facebook'
            target='_blank'
          >
            {" "}
            <i className='fa fa-facebook'> </i>{" "}
          </a>{" "}
        </div>
        <div>
          <a
            href='https://www.instagram.com/Zoomwheels_usedcars'
            className='fixed-instagrem inst2'
            target='_blank'
          >
            {" "}
            <i className='fa fa-instagram'> </i>{" "}
          </a>{" "}
        </div>
        <div>
          <a href='tel:+91 8926152152' className='fixed-twitter'>
            {" "}
            <i className='fa fa-phone'> </i>{" "}
          </a>{" "}
        </div>
        <div>
          {/* Use regular WhatsApp link by default */}
          <a
            href={regularWhatsAppLink}
            className='fixed-twitter wtsp1'
            target='_blank'
          >
            {" "}
            <i className='fa fa-whatsapp fa-2x'> </i>{" "}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Socalmedial;
