import { useHistory } from "react-router";
import OpenModalButton from '../OpenModalButton';
import { DeleteTeaModal } from '../DeleteTeaModal';
import icon from './teaharmony-kettle-icon.png'
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
      <div className='tea-tile-score'>{Number.parseFloat(avg_score).toFixed(1)}</div>
      <img src={icon} className='tea-tile-icon'></img>
      <div className="tea-tile" key={tea.id} onClick={handleClick}>
        <img
          className="tea-tile-image"
          src={image_url}></img>
        <div className='tea-tile-name'>{name}</div>
        <div className='tea-tile-company'>{company}</div>
        <div className='tea-tile-num-notes'>{num_notes} Tasting Notes</div>
      </div>
        {tiletype === "tealog" && (
        <button onClick={goToEditTeaForm}>Edit</button>)}
        {tiletype==="tealog" && (
          <OpenModalButton
          buttonText="Delete This Tea"
          modalComponent={
            <DeleteTeaModal teaId={tea.id} />
          }/>
        )}
    </div>
  );
};

export default TeaTile;
