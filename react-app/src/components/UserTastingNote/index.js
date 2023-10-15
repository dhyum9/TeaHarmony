import OpenModalButton from "../OpenModalButton";
import EditNoteForm from "../EditNoteForm";
import { DeleteNoteModal } from "../DeleteNoteModal";
import icon from './teaharmony-icon.png'
import './UserTastingNote.css'

const UserTastingNote = ({tastingNote}) => {
  const {
    note,
    score,
    flavors,
    user,
    tea
  } = tastingNote;

  return (
    <div>
      <div className='user-note'>
        <div className='user-note-left'>
            <div className='user-note-user-pic-container'>
              <img className='user-note-user-pic' src={icon}></img>
            </div>
            <div className='user-note-user-score-container'>
              <div>
                {score}
              </div>
            </div>
        </div>
        <div className='user-note-right'>
          <div className='user-note-user-tea'>
            {tea}
          </div>
          <div className='user-note-user-note'>
            {note}
          </div>
          {flavors && <div className='user-note-user-flavors'>Flavors: {flavors}</div>}
        </div>
      </div>
      <div className='user-note-button-row'>
        <div>
          <OpenModalButton
              buttonText="Edit This Note"
              buttonType="user-note-button"
              modalComponent={
                <EditNoteForm tea={tea} note={tastingNote} />
          }/>
        </div>
        <div>
          <OpenModalButton
          buttonText="Delete This Note"
          buttonType="user-note-button"
          modalComponent={
            <DeleteNoteModal noteId={tastingNote.id} />
          }/>
        </div>
      </div>
    </div>
  );
}

export default UserTastingNote;
