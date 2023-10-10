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
    <>
      <div className="tea-tile" key={tea.id} onClick={handleClick}>
        <div className='tea-tile-score'>{Number.parseFloat(avg_score).toFixed(1)}</div>
        <img src={icon} className='tea-tile-icon'></img>
        <img
          className="tea-tile-image"
          src={image_url}></img>
        <div>{name}</div>
        <div>{company}</div>
        <div>{num_notes} Tasting Notes</div>
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
    </>
  );
};

export default TeaTile;
