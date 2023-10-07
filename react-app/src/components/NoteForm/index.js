import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { thunkCreateTastingNote, thunkUpdateTastingNote } from '../../store/tastingnotes';
import { useModal } from "../../context/Modal";
import ReactSlider from 'react-slider';
import './NoteForm.css'

const NoteForm = ({ formType, tastingNote, teaId }) => {
  const [note, setNote] = useState(tastingNote.note);
  const [score, setScore] = useState(tastingNote.score);
  const [flavors, setFlavors] = useState(tastingNote.flavors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { closeModal } = useModal();

  useEffect(() => {
    setNote(tastingNote.note);
    setScore(tastingNote.score);
    setFlavors(tastingNote.flavors);
  }, [dispatch, tastingNote]);

  useEffect(() => {
    const errors = {};

    if (note.length < 10) errors.note = "Tasting Note must have more than 10 characters.";
    setErrors(errors);
  }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitted(true);

    const newTastingNote = {
      ...tastingNote,
      note,
      score,
      flavors
    };

    if(formType==='create'){
      if (!Object.values(errors).length) {
        const addTastingNote = await dispatch(thunkCreateTastingNote(newTastingNote, teaId));

        const combinedErrors = { ...errors, Errors: addTastingNote.errors };

        if (addTastingNote.errors) {
          setErrors(combinedErrors);
        } else {
          closeModal();
        }
      }
    } else {
      if (!Object.values(errors).length) {
        const updateTastingNote = await dispatch(thunkUpdateTastingNote(newTastingNote, tastingNote.id));

        const combinedErrors = { ...errors, Errors: updateTastingNote.errors };

        if (updateTastingNote.errors) {
          setErrors(combinedErrors);
        } else {
          closeModal();
        }
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {formType === "create" ? <h1>Create a Note</h1> : <h1>Update a Note</h1>}

        <div className='note-form-note-container'>
          <label>
            <div>Add a Note</div>
          </label>
          <textarea
            className='note-form-note'
            value={note}
            onChange={(e) => setNote(e.target.value)}/>
          {errors.note && submitted && (
            <div className="note-form-submit-errors">{errors.note}</div>
          )}
        </div>

        <div className='note-form-score-container'>
          <label>
            <div>Score</div>
          </label>
          <div className="actual-score">Score: {score}</div>
          <ReactSlider
            value={score}
            onAfterChange={(val) => {
              setScore(val)
            }}
            className="score-slider"
            thumbClassName="score-thumb"
            trackClassName="score-track"
            min={1}
            max={100}
            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          />
        </div>


        <div className='note-form-flavors-container'>
          <label>
            <div>Flavors</div>
            <div>What flavors and scents do you notice?</div>
          </label>
          <input
            className='note-form-flavors'
            type="text"
            value={flavors}
            onChange={(e) => setFlavors(e.target.value)}/>
        </div>

        <button type="submit">Submit Note</button>
      </form>
    </div>
  )
}

export default NoteForm;
