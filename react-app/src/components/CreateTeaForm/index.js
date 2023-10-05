import TeaForm from "../TeaForm";

const CreateTeaForm = () => {
  const tea = {
    name: '',
    company: '',
    type: [],
    sold_in: [],
    certification: [],
    ingredients: '',
    caffeine: '',
    description: '',
    image_url: ''
  };

  return (
    <TeaForm formType={"create"} tea={tea}/>
  );
}

export default CreateTeaForm;
