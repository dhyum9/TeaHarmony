import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TeaTile from "../TeaTile"
import { thunkGetUserTeas } from "../../store/teas";

const TeaLog = () => {
  const dispatch = useDispatch();

  const getTeas = useSelector((state) => state.teas.allTeas);
  const teas = Object.values(getTeas);

  useEffect(() => {
    dispatch(thunkGetUserTeas());
  }, [dispatch]);

  const goToEditTeaForm = () => {
    history.push(`/teas/new`);
  };

  return (
    <div>
      <h1>Tealog</h1>
      {teas.map((tea) => (
        <>
          <TeaTile key={tea.id} tea={tea} />
          <button onClick={goToEditTeaForm}>Edit</button>
        </>
      ))}
    </div>
  );
};

export default TeaLog;
