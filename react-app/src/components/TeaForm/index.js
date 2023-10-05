import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkCreateTea, thunkGetTeaInfo } from '../../store/teas';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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

  useEffect(() => {
    const errors = {};

    if (!name) errors.name = "Name is required.";
    if (!company) errors.company = "Company is required.";
    setErrors(errors);
  }, [name, company]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitted(true);

    const newTea = {
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

    if(formType==='create'){
      if (!Object.values(errors).length) {
        const addTea = await dispatch(thunkCreateTea(newTea));

        const combinedErrors = { ...errors, Errors: addTea.errors };

        if (addTea.errors) {
          setErrors(combinedErrors);
        } else {
          history.push(`/teas/${addTea.id}`);
        }
      }
    }
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
    setIsSubmitting(false);
  };

  const type_choices = ["Black", "Bubble Tea", "Chai", "Dark/Heicha", "Flavored", "Flowering",
              "Food", "Fruit", "Green", "Guayusa", "Herbal", "Honeybush",
              "Kombucha", "Matcha", "Oolong", "Pu'erh", "Pu'erh (Sheng)", "Pu'erh (Shou)",
              "Purple", "Rooibos", "Spice", "White", "Yaupon", "Yellow", "Yerba Maté"]

  const sold_in_choices = ["Bulk", "Canned/Bottled", "Compressed", "Loose Leaf", "Powder/Instant",
              "Sachet", "Tea Bag"]

  const certification_choices = ["Fair Trade", "Kosher", "Organic", "Vegan"]

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Create a Tea</h1>
        <h3>
          {errors.name}
          {errors.company}
        </h3>
        <div className='tea-form-image-container'>
          <label for='form-image-url'>
            <div>Image Url (optional)</div>
          </label>
          <input
            id='form-image-url'
            type="url"
            value={image_url}
            onChange={(e) => setImageUrl(e.target.value)}/>
        </div>

        <div className='tea-form-name-container'>
          <label for='form-name'>
            <div>Tea Name</div>
            <div>ie. Earl Grey, Golden Yunnan</div>
          </label>
          <input
            id='form-name'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}/>
        </div>

        <div className='tea-form-company-container'>
          <label for='form-company'>
            <div>Company Name</div>
            <div>ie. Mighty Leaf, Adagio Teas</div>
          </label>
          <input
            id='form-company'
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}/>
        </div>

        <div className='tea-form-type-container'>
          <label>
            <div>Type</div>
            <div>Check all that apply</div>
          </label>
          {type_choices.map((type) => (
            <div>
              <input
                type="checkbox"
                value={type}/>
                {type}
            </div>
          ))}
        </div>

        <div className='tea-form-sold-in-container'>
          <label>
            <div>Available In</div>
            <div>Check all that apply</div>
          </label>
          {sold_in_choices.map((sold_in) => (
            <div>
              <input
                type="checkbox"
                value={sold_in}/>
                {sold_in}
            </div>
          ))}
        </div>

        <div className='tea-form-certification-container'>
          <label>
            <div>Certifications</div>
            <div>Check all that apply</div>
          </label>
          {certification_choices.map((certification) => (
            <div>
              <input
                type="checkbox"
                value={certification}/>
                {certification}
            </div>
          ))}
        </div>

        <div className='tea-form-ingredients-container'>
          <label for='form-ingredients'>
            <div>Ingredients</div>
          </label>
          <input
            id='form-ingredients'
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}/>
        </div>

        <div className='tea-form-caffeine-container'>
          <label>
            <div>Caffeine Level</div>
          </label>
          <select
            onChange={(e) => setCaffeine(e.target.value)}>
              <option></option>
              <option value='Low'>Low</option>
              <option value='Medium'>Medium</option>
              <option value='High'>High</option>
              <option value='Decaffeinated'>Decaffeinated</option>
              <option value='Caffeine Free'>Caffeine Free</option>
          </select>
        </div>

        <div className='tea-form-description-container'>
          <label for='form-description'>
            <div>Tea Info</div>
            <div>How the tea company describes it (optional)</div>
          </label>
          <textarea
            id='form-description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}/>
        </div>

        <button type="submit">Submit Tea</button>
      </form>
    </div>
  );
}

export default TeaForm;
