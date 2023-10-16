import './Footer.css'
import GithubLogo from './teaharmony-github-logo.png'
import OpenModalButton from "../OpenModalButton";
import LearnMoreModal from '../LearnMoreModal';

const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='footer'>
        <div className='footer-left'>
          <div>
            TeaHarmony 2023
          </div>
          <div>
            Python
          </div>
          <div>
            Flask
          </div>
          <div>
            JavaScript
          </div>
          <div>
            React
          </div>
          <div>
            Redux
          </div>
          <div>
            CSS 3
          </div>
          <div>
            HTML 5
          </div>
        </div>
        <div className='footer-right'>
          <a href='https://github.com/dhyum9/TeaHarmony' target='_blank' className='footer-right-option'>
            <img className='footer-github-logo' src={GithubLogo}></img>
            <div>Github</div>
          </a>
          <div className='footer-right-option'>
            <OpenModalButton
              buttonText="Learn More"
              modalComponent={<LearnMoreModal />}
              buttonType="footer-option"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;
