import NoteForm from "../NoteForm";

const CreateNoteForm = ({ tea }) => {
  const note = {
    note: '',
    score: 50,
    flavors: ''
  };

  return (
    <NoteForm formType={"create"} tastingNote={note} tea={tea}/>
  );
}

export default CreateNoteForm;
