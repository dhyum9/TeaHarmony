import NoteForm from "../NoteForm";

const CreateNoteForm = ({ teaId }) => {
  const note = {
    note: '',
    score: 50,
    flavors: ''
  };

  return (
    <NoteForm formType={"create"} tastingNote={note} teaId={teaId}/>
  );
}

export default CreateNoteForm;
