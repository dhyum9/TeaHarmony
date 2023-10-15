import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserTastingNotes } from "../../store/tastingnotes";
import UserTastingNote from "../UserTastingNote";
import './TastingNotesLog.css'

const TastingNotesLog = () => {
  const dispatch = useDispatch();

  const notes = useSelector((state) => state.tastingnotes.user);
  const notesList = Object.values(notes);

  useEffect(() => {
    dispatch(thunkGetUserTastingNotes());
  }, [dispatch, notesList.length]);

  return (
    <div className="tasting-notes-log-page">
      <div className="tasting-notes-log">
        <p className='tasting-notes-log-heading'>Tasting Notes</p>
        {notesList.reverse().map((note) => {
            return (
              <UserTastingNote key={note.id} tastingNote={note}/>
            );
          })}
      </div>
    </div>
  );
};

export default TastingNotesLog;
