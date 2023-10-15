import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteTastingNote } from "../../store/tastingnotes";
import './DeleteNoteModal.css'

export const DeleteNoteModal = ({ noteId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleClick = (e) => {
    e.preventDefault();

    return dispatch(thunkDeleteTastingNote(noteId)).then(closeModal);
  };

  return (
    <div className='delete-note-modal'>
      <div className='delete-note-content'>
        <p className="delete-note-heading">Confirm Delete</p>
        <p>
          Are you sure you want to remove your Tasting Note?
        </p>
        <div className='delete-note-button-row'>
          <button className='delete-note-button' type="button" onClick={handleClick}>
            Yes (Delete)
          </button>
          <button className='delete-note-button' type="button" onClick={closeModal}>
            No (Keep)
          </button>
        </div>
      </div>
    </div>
  );
};
