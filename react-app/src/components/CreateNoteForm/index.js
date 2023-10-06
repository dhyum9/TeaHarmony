import NoteForm from "../NoteForm";

const CreateNoteForm = () => {
  const note = {
    note: '',
    score: 50,
    flavors: ''
  };

  return (
    <NoteForm formType={"create"} note={note}/>
  );
}

export default CreateNoteForm;
