import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkCreateTea, thunkUpdateTea } from '../../store/teas';
import './TeaForm.css';

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
    } else {
      if (!Object.values(errors).length) {
        const updateTea = await dispatch(thunkUpdateTea(newTea, tea.id));

        const combinedErrors = { ...errors, Errors: updateTea.errors };

        if (updateTea.errors) {
          setErrors(combinedErrors);
        } else {
          history.push(`/teas/${updateTea.id}`);
        }
      }
    }
    setIsSubmitting(false);
  };

  const type_choices = ["Black", "Bubble Tea", "Chai", "Dark/Heicha", "Flavored", "Flowering",
              "Food", "Fruit", "Green", "Guayusa", "Herbal", "Honeybush",
              "Kombucha", "Matcha", "Oolong", "Pu'erh", "Pu'erh (Sheng)", "Pu'erh (Shou)",
              "Purple", "Rooibos", "Spice", "White", "Yaupon", "Yellow", "Yerba Maté"]

  const sold_in_choices = ["Bulk", "Canned/Bottled", "Compressed", "Loose Leaf", "Powder/Instant",
              "Sachet", "Tea Bag"]

  const certification_choices = ["Fair Trade", "Kosher", "Organic", "Vegan"]

  const modifyType = (name) => {
    let teatypes = document.getElementsByClassName('form-type')
    let decider;

    for (let i = 0; i < teatypes.length; i++){
      let teatype = teatypes[i];
      if (teatype.value === name){
        decider = teatype;
      }
    }

    if(decider.checked){
      type.push(decider.value)
      console.log(type);
    } else {
      let targetIdx;
      for (let j = 0; j < type.length; j++){
        let ele = type[j]
        if (ele === name){
          targetIdx = j;
        }
      }
      type.splice(targetIdx, 1);
      console.log(type);
    }
  }

  const modifySoldIn = (name) => {
    let teaforms = document.getElementsByClassName('form-sold-in')
    let decider;

    for (let i = 0; i < teaforms.length; i++){
      let teaform = teaforms[i];
      if (teaform.value === name){
        decider = teaform;
      }
    }

    if(decider.checked){
      sold_in.push(decider.value)
    } else {
      let targetIdx;
      for (let j = 0; j < sold_in.length; j++){
        let ele = sold_in[j]
        if (ele === name){
          targetIdx = j;
        }
      }
      sold_in.splice(targetIdx, 1);
    }
  }

  const modifyCertification = (name) => {
    let teacertifications = document.getElementsByClassName('form-certification')
    let decider;

    for (let i = 0; i < teacertifications.length; i++){
      let teacertification = teacertifications[i];
      if (teacertification.value === name){
        decider = teacertification;
      }
    }

    if(decider.checked){
      certification.push(decider.value)
    } else {
      let targetIdx;
      for (let j = 0; j < certification.length; j++){
        let ele = certification[j]
        if (ele === name){
          targetIdx = j;
        }
      }
      certification.splice(targetIdx, 1);
    }
  }

  const checkCheckboxes = () => {
    let allCheckboxes = document.getElementsByClassName('checkbox')
    for (let i = 0; i < allCheckboxes.length; i++){
      let checkbox = allCheckboxes[i];
      if (type.indexOf(checkbox.value) !== -1 || sold_in.indexOf(checkbox.value) !== -1 || certification.indexOf(checkbox.value) !== -1){
        checkbox.checked = true;
      }
    }
  }
  checkCheckboxes();

  return (
    <div className='tea-form-page'>
      <form className='tea-form' onSubmit={handleSubmit}>
        {formType === "create" ? <p>Add a Tea</p> : <p>Update a Tea</p>}
        <div className='tea-form-string-container'>
          <label className='tea-form-label-row'>
            <div>Image Url (optional)</div>
            <div>Give your tea an image</div>
          </label>
          <input
            className='tea-form-string-input'
            type="url"
            value={image_url}
            onChange={(e) => setImageUrl(e.target.value)}/>
        </div>

        <div className='tea-form-string-container'>
          <label className='tea-form-label-row'>
            <div>Tea Name</div>
            <div>ie. Earl Grey, Golden Yunnan</div>
          </label>
          <input
            className='tea-form-string-input'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}/>
          {errors.name && submitted && (
            <div className="tea-form-errors">{errors.name}</div>
          )}
        </div>

        <div className='tea-form-string-container'>
          <label className='tea-form-label-row'>
            <div>Company Name</div>
            <div>ie. Mighty Leaf, Adagio Teas</div>
          </label>
          <input
            className='tea-form-string-input'
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}/>
          {errors.company && submitted && (
            <div className="tea-form-errors">{errors.company}</div>
          )}
        </div>

        <div className='tea-form-checkbox-container'>
          <label>
            <div>Type (optional)</div>
            <div>Check all that apply</div>
          </label>
          {type_choices.map((type) => (
            <div>
              <input
                type="checkbox"
                value={type}
                className='form-type checkbox'
                onClick={() => modifyType(type)}
                />
                {type}
            </div>
          ))}
        </div>

        <div className='tea-form-sold-in-container'>
          <label>
            <div>Available In (optional)</div>
            <div>Check all that apply</div>
          </label>
          {sold_in_choices.map((sold_in) => (
            <div>
              <input
                type="checkbox"
                value={sold_in}
                className='form-sold-in checkbox'
                onClick={() => modifySoldIn(sold_in)}/>
                {sold_in}
            </div>
          ))}
        </div>

        <div className='tea-form-certification-container'>
          <label>
            <div>Certifications (optional)</div>
            <div>Check all that apply</div>
          </label>
          {certification_choices.map((certification) => (
            <div>
              <input
                type="checkbox"
                value={certification}
                className='form-certification checkbox'
                onClick={() => modifyCertification(certification)}/>
                {certification}
            </div>
          ))}
        </div>

        <div className='tea-form-string-container'>
          <label className='tea-form-label-row'>
            <div>Ingredients (optional)</div>
            <div>eg. Green Tea Leaves, Jasmine Petals, etc.</div>
          </label>
          <input
            className='tea-form-string-input'
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}/>
        </div>

        <div className='tea-form-select-container'>
          <label className='tea-form-label-row'>
            <div>Caffeine Level (optional)</div>
          </label>
          <select
            onChange={(e) => setCaffeine(e.target.value)}
            value={caffeine}
            className='tea-form-select-input'>
              <option></option>
              <option value='Low'>Low</option>
              <option value='Medium'>Medium</option>
              <option value='High'>High</option>
              <option value='Decaffeinated'>Decaffeinated</option>
              <option value='Caffeine Free'>Caffeine Free</option>
          </select>
        </div>

        <div className='tea-form-textarea-container'>
          <label className='tea-form-label-row'>
            <div>Tea Info (optional)</div>
            <div>How the tea company describes it (optional)</div>
          </label>
          <textarea
            className='tea-form-textarea-input'
            value={description}
            onChange={(e) => setDescription(e.target.value)}/>
        </div>

        <button className='tea-form-submit' type="submit">Submit Tea</button>
      </form>
    </div>
  );
}

export default TeaForm;
