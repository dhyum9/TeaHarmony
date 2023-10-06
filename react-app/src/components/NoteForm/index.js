import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const NoteForm = ({ formType, note }) => {
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
  return (
    <h1>Here is the NoteForm!</h1>
  )
}

export default NoteForm;
