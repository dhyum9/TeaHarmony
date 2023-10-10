import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetTeaInfo } from "../../store/teas";
import { thunkGetTeaTastingNotes } from "../../store/tastingnotes";
import TeaTastingNote from "../TeaTastingNote";
import OpenModalButton from "../OpenModalButton";
import CreateNoteForm from "../CreateNoteForm";

const TeaDetails = () => {
  const dispatch = useDispatch();

  const { teaId } = useParams();

  const singleTea = useSelector((state) => state.teas.singleTea);
  const notes = useSelector((state) => state.tastingnotes.tea);
  const currentUser = useSelector(state => state.session.user);

  const notesList = Object.values(notes);

  useEffect(() => {
    dispatch(thunkGetTeaInfo(teaId));
    dispatch(thunkGetTeaTastingNotes(teaId));
  }, [dispatch, teaId, notesList.length]);

  if (!singleTea) return null;

  //Checks if we need a Post-Your-Review button
  let currentUserId;
  let postNoteSwitch = true;
  if(currentUser) {
    currentUserId = currentUser.id;
    notesList.forEach((note) => {
      if (note.user_id === currentUserId) postNoteSwitch = false;
    })
    if(singleTea.user_id === currentUserId) postNoteSwitch = false;
  } else {
    postNoteSwitch = false;
  }

  const {
    name,
    company,
    type,
    sold_in,
    certification,
    ingredients,
    caffeine,
    description,
    image_url,
  } = singleTea;

  return (
    <div>
      <img
        src={image_url}></img>
      <h1>{name}</h1>
      <h2>by {company}</h2>
      <ul>
        <li>Type: {type}</li>
        <li>Available In: {sold_in}</li>
        <li>Certification: {certification}</li>
        <li>Ingredients: {ingredients}</li>
        <li>Caffeine: {caffeine}</li>
        <li>Tea Info: {description}</li>
      </ul>

      {postNoteSwitch && (
          <OpenModalButton
          buttonText="Review this tea"
          modalComponent={
            <CreateNoteForm teaId={teaId}/>
          }/>
      )}

      <div>
        {notesList.reverse().map((note) => {
            return (
              <TeaTastingNote key={note.id} currentUserId={currentUserId} tastingNote={note} teaId={teaId}/>
            );
          })}
      </div>
    </div>
  );
};

export default TeaDetails;
