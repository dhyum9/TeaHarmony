import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TeaTile from "../TeaTile"
import { thunkGetUserTeas } from "../../store/teas";
import './Tealog.css'

const TeaLog = () => {
  const dispatch = useDispatch();

  const getTeas = useSelector((state) => state.teas.allTeas);
  const teas = Object.values(getTeas);
  const sessionUser = useSelector((state) => state.session.user);

  const {username} = sessionUser;

  useEffect(() => {
    dispatch(thunkGetUserTeas());
  }, [dispatch, teas.length]);

  return (
    <div className="tealog-page">
      <div className="tealog">
        <p className="tealog-heading">Tealog</p>
        <p className="tealog-subheading">Hey {username}, what's in your cup?</p>
        <div className="tealog-grid">
          {teas.map((tea) => (
            <>
              <TeaTile key={tea.id} tea={tea} tiletype={"tealog"}/>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeaLog;
