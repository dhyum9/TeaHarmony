import NoteForm from "../NoteForm";

const EditNoteForm = ({ note }) => {

  return (
    <NoteForm formType={"update"} tastingNote={note}/>
  );
}

export default EditNoteForm;
