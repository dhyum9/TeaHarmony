import NoteForm from "../NoteForm";

const EditNoteForm = ({ note, tea }) => {

  return (
    <NoteForm formType={"update"} tea={tea} tastingNote={note}/>
  );
}

export default EditNoteForm;
