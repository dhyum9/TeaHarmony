import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteTea } from "../../store/teas";
import './DeleteTeaModal.css'

export const DeleteTeaModal = ({ teaId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleClick = (e) => {
    e.preventDefault();

    return dispatch(thunkDeleteTea(teaId)).then(closeModal);
  };

  return (
    <div className="delete-tea-modal">
      <div className="delete-tea-content">
        <p className="delete-tea-heading">Confirm Delete</p>
        <p>
          Are you sure you want to remove this tea from our website?
        </p>
        <div className="delete-tea-button-row">
          <button className='delete-tea-button' type="button" onClick={handleClick}>
            Yes (Delete tea)
          </button>
          <button className='delete-tea-button' type="button" onClick={closeModal}>
            No (Keep tea)
          </button>
        </div>
      </div>
    </div>
  );
};
