import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TeaTile from "../TeaTile"
import { thunkGetTeas } from "../../store/teas";
import { useHistory } from "react-router";
import './TeaIndex.css'

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

  const goToCreateTeaForm = () => {
    history.push(`/teas/new`);
  };

  return (
    <div className='tea-index-page'>
      <div className='tea-index-body'>
        <div>
          {sessionUser &&
            <button onClick={goToCreateTeaForm}>Add a Tea</button>
          }
        </div>
        <p className='tea-index-heading'>Best Teas</p>
        <p className='tea-index-subheading'>As rated by the TeaHarmony community</p>
        <div className='tea-index-grid'>
          {teas.map((tea) => (
            <TeaTile key={tea.id} tea={tea} tiletype={"teaindex"} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeaIndex;
