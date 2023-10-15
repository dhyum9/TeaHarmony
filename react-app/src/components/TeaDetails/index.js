import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetTeaInfo } from "../../store/teas";
import { thunkGetTeaTastingNotes } from "../../store/tastingnotes";
import TeaTastingNote from "../TeaTastingNote";
import OpenModalButton from "../OpenModalButton";
import CreateNoteForm from "../CreateNoteForm";
import kettle from './teaharmony-kettle-icon.png'
import defaultImg from './teaharmony-default-banner.jpeg'
import './TeaDetails.css'

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

    // return () => clearTea();
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
    avg_score,
    num_notes
  } = singleTea;

  return (
    <div className='tea-details-page'>
      {image_url ? <img src={image_url} className='tea-details-banner'></img> : <img src={defaultImg} className='tea-details-banner'></img>}
      <div className='tea-details-container'>
        <div className="tea-details-banner-row">
            <p className="tea-details-name">{name}</p>
            <p className='tea-details-company'>by {company}</p>
            {image_url ? <img src={image_url} className='tea-details-image'></img> : <img src={defaultImg} className='tea-details-image'></img>}
        </div>
        <div className='tea-details-main-row'>
          <div className='tea-details-score-row-container'>
            <div className='tea-details-score-row'>
              <div className='tea-details-score-row-left'>
                <div className='tea-details-score-num'>
                  {avg_score ? <div>{Number.parseFloat(avg_score).toFixed(0)}</div> : <div>00</div>}
                </div>
                <img className='tea-details-score-kettle' src={kettle}></img>
              </div>
              <div className='tea-details-score-row-right'>
                <div className='tea-details-score-label-top'>TeaHarmony Score</div>
                <div className='tea-details-score-label-bottom'>
                  <div className='tea-details-num-notes'>with {num_notes} Ratings</div>
                  {postNoteSwitch && (
                    <OpenModalButton
                    buttonText="Rate this tea"
                    buttonType="create-note"
                    modalComponent={
                      <CreateNoteForm tea={singleTea}/>
                    }/>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='tea-details-info-row'>
          <div className='tea-details-info-label'>Tea Type</div>
          {type ? <div className='tea-details-info-information'>{type}</div> : <div className='tea-details-info-information tea-details-invalid-info'>Not available</div>}
          <div className='tea-details-info-label'>Ingredients</div>
          {ingredients ? <div className='tea-details-info-information'>{ingredients}</div> : <div className='tea-details-info-information tea-details-invalid-info'>Not available</div>}
          <div className='tea-details-info-label'>Sold In</div>
          {sold_in ? <div className='tea-details-info-information'>{sold_in}</div> : <div className='tea-details-info-information tea-details-invalid-info'>Not available</div>}
          <div className='tea-details-info-label'>Caffeine</div>
          {caffeine ? <div className='tea-details-info-information'>{caffeine}</div> : <div className='tea-details-info-information tea-details-invalid-info'>Not available</div>}
          <div className='tea-details-info-label'>Certification</div>
          {certification ? <div className='tea-details-info-information'>{certification}</div> : <div className='tea-details-info-information tea-details-invalid-info'>Not available</div>}
        </div>
        <div className='tea-details-company-row'>
          <div className='tea-details-company-row-heading'>From {company}</div>
          <div className='tea-details-company-row-body'>{description}</div>
        </div>
        <div className='tea-details-notes-row'>
          <div className='tea-details-notes-row-heading'>{num_notes} Tasting Notes</div>
          <div>
            {notesList.reverse().map((note) => {
              return (
                <TeaTastingNote key={note.id} currentUserId={currentUserId} tastingNote={note} teaId={teaId}/>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeaDetails;
