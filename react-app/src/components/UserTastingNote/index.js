import OpenModalButton from "../OpenModalButton";
import EditNoteForm from "../EditNoteForm";

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
      <button>Delete this Note</button>
    </div>
  );
}

export default UserTastingNote;
