import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TeaTile from "../TeaTile"

const TeaIndex = () => {
  const dispatch = useDispatch();

  const getTeas = useSelector(
    (state) => state.teas.allTeas
  );

  const teas = Object.values(getTeas);

  useEffect(() => {
    dispatch(thunkGetTeas());
  }, [dispatch]);

  if (!teas.length) return null;

  // const showAlert = () => {
  //   window.alert("Feature Coming Soon");
  // };

  return (
    <div>
      {teas.map((tea) => (
        <TeaTile key={tea.id} tea={tea} />
      ))}
    </div>
  );
};

export default TeaIndex;
