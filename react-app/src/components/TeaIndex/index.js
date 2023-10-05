import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TeaTile from "../TeaTile"
import { thunkGetTeas } from "../../store/teas";
import { useHistory } from "react-router";

const TeaIndex = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const getTeas = useSelector(
    (state) => state.teas.allTeas
  );

  const sessionUser = useSelector(
    (state) => state.session.user
  );

  const teas = Object.values(getTeas);

  useEffect(() => {
    dispatch(thunkGetTeas());
  }, [dispatch]);

  if (!teas.length) return null;

  const goToTeaForm = () => {
    history.push(`/teas/new`);
  };

  return (
    <div>
      <h1>Tea Index</h1>
      {sessionUser &&
        <button onClick={goToTeaForm}>Add a Tea</button>
      }
      {teas.map((tea) => (
        <TeaTile key={tea.id} tea={tea} />
      ))}
    </div>
  );
};

export default TeaIndex;
