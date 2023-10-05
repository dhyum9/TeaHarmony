import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetTeaInfo } from "../../store/teas";

const TeaDetails = () => {
  const dispatch = useDispatch();

  const { teaId } = useParams();

  const singleTea = useSelector(
    (state) => state.teas.singleTea
  );

  useEffect(() => {
    dispatch(thunkGetTeaInfo(teaId));
  }, [dispatch, teaId]);

  if (!singleTea) return null;

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
    </div>
  );
};

export default TeaDetails;
