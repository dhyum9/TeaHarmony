import OpenModalButton from "../OpenModalButton";
import EditNoteForm from "../EditNoteForm";
import { DeleteNoteModal } from "../DeleteNoteModal";

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
      <div>
        TEA: {tea}
      </div>
      <div>
        SCORE: {score}
      </div>
      <div>
        NOTE: {note}
      </div>
      <OpenModalButton
          buttonText="Edit this tea"
          modalComponent={
            <EditNoteForm note={tastingNote}/>
      }/>
      <OpenModalButton
      buttonText="Delete This Note"
      modalComponent={
        <DeleteNoteModal noteId={tastingNote.id} />
      }/>
    </div>
  );
}

export default UserTastingNote;
