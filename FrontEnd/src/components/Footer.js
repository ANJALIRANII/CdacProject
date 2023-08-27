import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './headfoot.css';
import Logo from '../images/peakauto.jpg';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import { MdPhone } from 'react-icons/md';
import { FaTwitter } from 'react-icons/fa';
import { FaMailBulk } from 'react-icons/fa';
import { FaCalendar } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa';
import { RiMailLine } from 'react-icons/ri';
import '../common.css';


function Footer() {
    return ( <div className="container-fluid">
        <div className="row">
        <div className="container">
            <div className="col-md-3">
                <h5>About us</h5>
                <h6>
                    <a href='/contact' className='textColour'>Contact Us</a>
                </h6>
                <h6>
                    <a href='/termsAndCondition' className='textColour'>Terms and condition</a>
                </h6>
                <h6>
                    <a href='/privacyPolicy' className='textColour'>Privacy Policy</a>
                </h6>
                <h6>
                    <a href='/workshopLocator' className='textColour'>WorkshopLocator</a>
                </h6>
                <h6>
                    <a href='/offer' className='textColour'>Offers</a>
                </h6>
                <h6>
                    <a href='/reviews' className='textColour'>Reviews</a>
                </h6>
            </div>
            <div className="col-md-3">
                <h5>Our services</h5>
                <h6>
                    <a href='/periodicService' className='textColour'>Periodic Services</a>
                </h6>
                <h6>
                    <a href='/wheelCares' className='textColour'>Wheel Cares</a>
                </h6>
                <h6>
                    <a href='/windsheild&Glasses' className='textColour'>Windsheild & Glasses</a>
                </h6>
                <h6>
                    <a href='/suspension' className='textColour'>Suspension</a>
                </h6>
                <h6>
                    <a href='/clutches' className='textColour'>Clutches</a>
                </h6>
                <h6>
                    <a href='/detailing' className='textColour'>Detailing</a>
                </h6>
                <h6>
                    <a href='/batteries' className='textColour'>Batteries</a>
                </h6>
            </div>
            <div className="col-md-3">
                <h5>Brands</h5>
                <h6>
                    <a href='/hyundai' className='textColour'>Hyundai</a>
                </h6>
                <h6>
                    <a href='/marutiSuzuki' className='textColour'>Maruti Suzuki</a>
                </h6>
                <h6>
                    <a href='/tata' className='textColour'>Tata</a>
                </h6>
                <h6>
                    <a href='/mahindra' className='textColour'>Mahindra</a>
                </h6>
                <h6>
                    <a href='/kia' className='textColour'>Kia</a>
                </h6>
                <h6>
                    <a href='/honda' className='textColour'>Honda</a>
                </h6>
            </div>
            <div className="col-md-3">
                <h5>Areas near you</h5>
                <h6>
                    <a href='/delhi' className='textColour'>Delhi</a>
                </h6>
                <h6>
                    <a href='/mumbai' className='textColour'>Mumbai</a>
                </h6>
                <h6>
                    <a href='/bangalore' className='textColour'>Bangalore</a>
                </h6>
                <h6>
                    <a href='/pune' className='textColour'>Pune</a>
                </h6>
            </div>
        </div>
        </div>
        <div className='footerGrey row'>
        <div className='leftFooterLogo col-md-6'>
            <table>
                
                <tbody>
                
                    <tr >
                        <td>
                            <img src={Logo} alt="Logo" width={250} height={70} />
                        </td>
                    </tr>
                    <tr colSpan='5'>
                        <td>
                            <h6>5th floor,RestInn tower,phase 1,IT park,<br></br>Hinjewadi,Pune,Maharastra-411057</h6>
                        </td>
                    </tr>
                    <tr>
                        <table>
                            <tbody>
                                <tr>
                                <td style={{width: 40}}>
                                <FaFacebook size={20} color="white" />
                            </td>
                            <td style={{width: 40}}>
                                <FaInstagram size={20} color="white"/>
                            </td>
                            <td style={{width: 40}}>
                                <FaWhatsapp size={20} color="white"/>
                            </td>
                            <td style={{width: 40}}>
                                <FaLinkedin size={20} color="white"/>
                            </td>
                            <td style={{width: 40}}>
                                <FaTwitter size={20} color="white"/>
                            </td>
                                </tr>
                            </tbody>
                        </table>   
                    </tr>
                </tbody>
            </table>
                  
            </div>
        <div className='col-md-6'>
            <table>
                <tbody>
                    <tr>
                        <td width={200}>
                            <RiMailLine size={20} color="white"/>   Email
                        </td>
                        <td>
                            <h6>
                                info@peakautomotives.in
                            </h6>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <MdPhone size={20} color="white"/>   Phone Number
                        </td>
                        <td>
                            <h6>
                                9171259561
                            </h6>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <FaCalendar size={20} color="white"/>   Working Days
                        </td>
                        <td>
                            <h6>
                                Monday-Sunday
                            </h6>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <FaClock size={20} color="white"/>   Working Hours
                        </td>
                        <td>
                            <h6>
                                7:00AM-9:00PM(IST)
                            </h6>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            
            
            
            </div>
        </div>
        
    </div> );
}

export default Footer;