import { useHistory } from "react-router";
import './TeaTile.css'
const TeaTile = ({ tea }) => {
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

  return (
    <div className="tea-tile" key={tea.id} onClick={handleClick}>
      <img
        className="tea-tile-image"
        src={image_url}></img>
      <div>{name}</div>
      <div>{company}</div>
      <div>{num_notes} Tasting Notes</div>
    </div>
  );
};

export default TeaTile;
