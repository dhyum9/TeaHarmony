import { useHistory } from "react-router";

const TeaTile = ({ key, tea }) => {
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
    <div className="tea-grid" key={key} onClick={handleClick}>
      <div>TEA NAME {name}</div>
      <div>TEA COMPANY {company}</div>
      <div>TEA NOTES {num_notes}</div>
    </div>
  );
};

export default TeaTile;
