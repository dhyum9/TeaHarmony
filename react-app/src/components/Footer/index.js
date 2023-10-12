import './Footer.css'
import GithubLogo from './teaharmony-github-logo.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-left'>
        TeaHarmony 2023
      </div>
      <div className='footer-right'>
        <div className='footer-right-option'>
          <img className='footer-github-logo' src={GithubLogo}></img>
          <div>Github</div>
        </div>
        <div className='footer-right-option'>
          Learn More
        </div>
      </div>
    </div>
  )
}

export default Footer;
