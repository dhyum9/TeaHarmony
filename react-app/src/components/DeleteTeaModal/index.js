import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteTea } from "../../store/teas";

export const DeleteTeaModal = ({ teaId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleClick = (e) => {
    e.preventDefault();

    return dispatch(thunkDeleteTea(teaId)).then(closeModal);
  };

  return (
    <div>
      <div>
        <h3>Confirm Delete</h3>
        <p>
          Are you sure you want to remove this restaurant from the listings?
        </p>
        <div>

          <button type="button" onClick={handleClick}>
            Yes (Delete tea)
          </button>
          <button type="button" onClick={closeModal}>
            No (Keep tea)
          </button>

        </div>
      </div>
    </div>
  );
};
