import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteTastingNote } from "../../store/tastingnotes";

export const DeleteNoteModal = ({ noteId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleClick = (e) => {
    e.preventDefault();

    return dispatch(thunkDeleteTastingNote(noteId)).then(closeModal);
  };

  return (
    <div>
      <div>
        <h3>Confirm Delete</h3>
        <p>
          Are you sure you want to remove your Tasting Note?
        </p>
        <div>

          <button type="button" onClick={handleClick}>
            Yes (Delete Tasting Note)
          </button>
          <button type="button" onClick={closeModal}>
            No (Keep Tasting Note)
          </button>

        </div>
      </div>
    </div>
  );
};
