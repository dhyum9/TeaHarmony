import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkGetTeaInfo } from '../../store/teas';

const TeaForm = ({tea, formType}) => {
  const [name, setName] = useState(tea.name);
  const [company, setCompany] = useState(tea.company);
  const [type, setType] = useState(tea.type);
  const [sold_in, setSoldIn] = useState(tea.sold_in);
  const [certification, setCertification] = useState(tea.certification);
  const [ingredients, setIngredients] = useState(tea.ingredients);
  const [caffeine, setCaffeine] = useState(tea.caffeine);
  const [description, setDescription] = useState(tea.description);
  const [image_url, setImageUrl] = useState(tea.image_url);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setName(tea.name);
    setCompany(tea.company);
    setType(tea.type);
    setSoldIn(tea.sold_in);
    setCertification(tea.certification);
    setIngredients(tea.ingredients);
    setCaffeine(tea.caffeine);
    setDescription(tea.description);
    setImageUrl(tea.image_url);
  }, [dispatch, tea]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const payload = {
      ...tea,
      name,
      company,
      type,
      sold_in,
      certification,
      ingredients,
      caffeine,
      description,
      image_url
    };

    // if(formType==='create'){
    //   const createdTea = await dispatch(createTea(payload))
    //   .catch(async(res) => {
    //     const data = await res.json();
    //     if (data && data.errors) {
    //       setErrors(data.errors);
    //     }
    //   });

    //   if (createdTea) {
    //     await dispatch(thunkGetTeaInfo(createdTea.id));
    //     history.push(`/teas/${createdTea.id}`);
    //   }
    // }
    // else if (formType==='Update'){
    //   const updatedSpot = await dispatch(updateSpot(payload, spot.id))
    //   .catch(async(res) => {
    //     const data = await res.json();
    //     if (data && data.errors) {
    //       setErrors(data.errors);
    //     }
    //   });

    //   if (updatedSpot) {
    //     await dispatch(fetchSpotDetails(updatedSpot.id));
    //     history.push(`/spots/${updatedSpot.id}`);
    //   }
    // }
  };

  const type_choices=["Black", "Bubble Tea", "Chai", "Dark/Heicha", "Flavored", "Flowering",
              "Food", "Fruit", "Green", "Guayusa", "Herbal", "Honeybush",
              "Kombucha", "Matcha", "Oolong", "Pu'erh", "Pu'erh (Sheng)", "Pu'erh (Shou)",
              "Purple", "Rooibos", "Spice", "White", "Yaupon", "Yellow", "Yerba Maté"]

  return (
    <div>
      <form>
        <h1>Create a Tea</h1>

        <div className='tea-form-image-container'>
          <label>
            <div>Image Url (optional)</div>
          </label>
          <input
            type="url"
            value={image_url}
            onChange={(e) => setImageUrl(e.target.value)}/>
        </div>

        <div className='tea-form-name-container'>
          <label>
            <div>Tea Name</div>
            <div>ie. Earl Grey, Golden Yunnan</div>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}/>
        </div>

        <div className='tea-form-company-container'>
          <label>
            <div>Company Name</div>
            <div>ie. Mighty Leaf, Adagio Teas</div>
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}/>
        </div>

        <div className='tea-form-company-container'>
          <label>
            <div>Type</div>
            <div>Check all that apply</div>
          </label>
          {type_choices.forEach((type) => (
            <div>
              {type}
              <input
                type="checkbox"
                value={type}/>
            </div>
          ))}
          {/* <input
            type="checkbox"
            value="Black"/> Black
          <input
            type="checkbox"
            value="Bubble Tea"/> Bubble Tea
          <input
            type="checkbox"
            value="Chai"/> Chai <br/>
          <input
            type="checkbox"
            value="Dark/Heicha"/> Dark/Heicha
          <input
            type="checkbox"
            value="Flavored"/> Flavored
          <input
            type="checkbox"
            value="Flowering"/> Flowering <br/>
          <input
            type="checkbox"
            value="Food"/> Food */}


        </div>

      </form>
    </div>
  );
}

export default TeaForm;
