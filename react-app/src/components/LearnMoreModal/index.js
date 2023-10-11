import gif from './teaharmony-learn-more.gif'
import './LearnMoreModal.css'

const LearnMoreModal = () => {
  return (
    <div className='learn-more-modal'>
      <div>
        Thank you for checking out TeaHarmony, a clone
        inspired by <a href='https://steepster.com/' target='_blank'>Steepster</a>.
        Allowing its users to post about, review,
        and discuss their favorite teas, the site aims
        to connect tea lovers worldwide. Primarily using
        React and Flask, it was built in two weeks to
        represent the culmination of time as a student
        developer at App Academy as my capstone
        project.
      </div>
      <div>For more information about the project, the Github
        link can be found <a href='https://github.com/dhyum9/TeaHarmony' target='_blank'>here</a>.</div>
      <img src={gif}></img>
    </div>
  );
}

export default LearnMoreModal;
