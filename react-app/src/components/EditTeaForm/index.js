import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TeaForm from "../TeaForm";
import { useEffect } from "react";
import { thunkGetTeaInfo } from "../../store/spot";

const EditTeaForm = () => {
   const { teaId } = useParams();
   const dispatch = useDispatch();
   const tea = useSelector((state) => state.teas.singleTea);

   useEffect(() => {
    dispatch(thunkGetTeaInfo(teaId));
   }, [dispatch, teaId]);

   return <TeaForm tea={tea} formType={"update"} />;
};

export default EditTeaForm;
