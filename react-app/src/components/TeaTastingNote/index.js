import icon from './teaharmony-icon.png'
import './TeaTastingNote.css'

const TeaTastingNote = ({currentUser, tastingNote, teaId}) => {
  const {
    note,
    score,
    flavors,
    user,
    tea
  } = tastingNote;

  return (
    <div className='tea-note'>
      <div className='tea-note-left'>
          <div className='tea-note-user-pic-container'>
            <img className='tea-note-user-pic' src={icon}></img>
          </div>
          <div className='tea-note-user-score-container'>
            <div>
              {score}
            </div>
          </div>
      </div>
      <div className='tea-note-right'>
        <div className='tea-note-user-name'>
          {user}
        </div>
        <div className='tea-note-user-note'>
          {note}
        </div>
        {flavors && <div className='tea-note-user-flavors'>Flavors: {flavors}</div>}
      </div>
    </div>
  );
}

export default TeaTastingNote;
