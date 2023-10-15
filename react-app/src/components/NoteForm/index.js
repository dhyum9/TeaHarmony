import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { thunkCreateTastingNote, thunkUpdateTastingNote } from '../../store/tastingnotes';
import { useModal } from "../../context/Modal";
import ReactSlider from 'react-slider';
import './NoteForm.css'

const NoteForm = ({ formType, tastingNote, tea }) => {
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
        const addTastingNote = await dispatch(thunkCreateTastingNote(newTastingNote, tea.id));

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
    <div className='note-form-modal'>
      <form className='note-form' onSubmit={handleSubmit}>
        {formType === "create" ? <p className='note-form-heading'>Add a Tasting Note</p> : <p className='note-form-heading'>Update Your Tasting Note</p>}
        <p className='note-form-subheading'>For {tea}</p>
        <div className='note-form-textarea-container'>
          <label className='note-form-label-row'>
            <div>Your Note</div>
            <div>Must be at least 10 characters</div>
          </label>
          <textarea
            className='note-form-textarea-input'
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows='4'/>
          {errors.note && submitted && (
            <div className="note-form-errors">{errors.note}</div>
          )}
        </div>

        <div className='note-form-score-container'>
          <label className='note-form-label-row'>
            <div>How would you rate this tea?</div>
            <div>Score ranges from 1 to 100</div>
          </label>
          {/* <div className="actual-score">Score: {score}</div> */}
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
            renderThumb={(props, state) => <div {...props}><div>{state.valueNow}</div></div>}
          />
        </div>


        <div className='note-form-string-container'>
          <label className='note-form-label-row'>
            <div>Flavors (optional)</div>
            <div>What flavors and scents do you notice?</div>
          </label>
          <input
            className='note-form-string-input'
            type="text"
            value={flavors}
            onChange={(e) => setFlavors(e.target.value)}/>
        </div>

        <button className='note-form-submit' type="submit">Submit Note</button>
      </form>
    </div>
  )
}

export default NoteForm;
