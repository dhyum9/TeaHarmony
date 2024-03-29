import { useHistory } from "react-router";
import OpenModalButton from '../OpenModalButton';
import { DeleteTeaModal } from '../DeleteTeaModal';
import icon from './teaharmony-kettle-icon.png'
import defaultImg from './teaharmony-default-banner.jpeg'
import './TeaTile.css'

const TeaTile = ({ tea, tiletype }) => {
  const {
    id,
    user_id,
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
  } = tea;

  const history = useHistory();

  const handleClick = () => {
    history.push(`/teas/${id}`);
  };

  const goToEditTeaForm = () => {
    history.push(`/teas/${id}/edit`);
  };


  return (
    <div className='tea-tile-container'>
      {avg_score ? <div className='tea-tile-score'>{Number.parseFloat(avg_score).toFixed(1)}</div> : <div className='tea-tile-score zero'>0.0</div>}
      <img src={icon} className='tea-tile-icon'></img>
      <div className="tea-tile" key={tea.id} onClick={handleClick}>
        {image_url ? <img className="tea-tile-image" src={image_url}></img> : <img className="tea-tile-image" src={defaultImg}></img>}
        <div className='tea-tile-name'>{name}</div>
        <div className='tea-tile-company'>{company}</div>
        <div className='tea-tile-num-notes'>{num_notes} Tasting Notes</div>
      </div>
      <div className='tea-tile-edit-delete-row'>
        {tiletype === "tealog" && (
        <button className='tea-tile-edit-button' onClick={goToEditTeaForm}>Edit</button>)}
        {tiletype==="tealog" && (
          <div>
            <OpenModalButton
            buttonText="Delete"
            buttonType='tea-tile-delete-button'
            modalComponent={
              <DeleteTeaModal teaId={tea.id} />
            }/>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeaTile;
