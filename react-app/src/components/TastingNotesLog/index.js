import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserTastingNotes } from "../../store/tastingnotes";
import UserTastingNote from "../UserTastingNote";

const TastingNotesLog = () => {
  const dispatch = useDispatch();

  const notes = useSelector((state) => state.tastingnotes.user);
  const notesList = Object.values(notes);

  useEffect(() => {
    dispatch(thunkGetUserTastingNotes());
  }, [dispatch, notesList.length]);

  return (
    <div>
      <h1>Tasting Notes</h1>
      {notesList.reverse().map((note) => {
          return (
            <UserTastingNote key={note.id} tastingNote={note}/>
          );
        })}
    </div>
  );
};

export default TastingNotesLog;
