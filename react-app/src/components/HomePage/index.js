import { useSelector } from 'react-redux';
import SignupFormModal from '../SignupFormModal';
import './HomePage.css'
import { Redirect } from 'react-router-dom';

const HomePage = () => {
  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) return <Redirect to="/teas" />;

  return (
    <div className='home-page'>
      <main className='home-first-row'>
        <div className='home-first-left'>
          <p className='home-heading'>Dive into the universe of tea.</p>
          <p className='home-subheading'>Write a tea journal, see what others are drinking and get recommendations from people you trust.</p>
        </div>
        <div className='home-first-right'>
          <SignupFormModal modalType={'signup-home'}/>
        </div>
      </main>
      <div className='home-second-row'>
        <div className='home-second-left'></div>
        <div className='home-second-right'></div>
      </div>
    </div>
  );
};

export default HomePage;
