import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TeaForm from "../TeaForm";
import { useEffect } from "react";
import { thunkGetTeaInfo } from "../../store/teas";

const EditTeaForm = () => {
   const { teaId } = useParams();
   const dispatch = useDispatch();
   let tea = useSelector((state) => state.teas.singleTea);

   useEffect(() => {
    dispatch(thunkGetTeaInfo(teaId));
   }, [dispatch, teaId]);

   const newTea = (tea) => {
    let newTea = {...tea}
     if (tea.type){
      if (!tea.type.includes(",")){
        newTea.type = [tea.type]
      } else {
        newTea.type = tea.type.split(", ")
      }
     } else {
      newTea.type = [];
     }
     if (tea.sold_in){
      if (!tea.sold_in.includes(",")){
        newTea.sold_in = [tea.sold_in]
      } else {
        newTea.sold_in = tea.sold_in.split(", ")
      }
     } else {
      newTea.sold_in = [];
     }
     if (tea.certification){
      if (!tea.certification.includes(",")){
        newTea.certification = [tea.certification]
      } else {
        newTea.certification = tea.certification.split(", ")
      }
     } else {
      newTea.certification = [];
     }
     return newTea
   }

   return <TeaForm tea={newTea(tea)} formType={"update"} />;
};

export default EditTeaForm;
