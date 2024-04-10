import { useState } from "react";

const useForm = (initStateForm) => {
  const [formData, setFormData] = useState(initStateForm);

  const handlerForm = (e) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;
    setFormData((state) => ({ ...state, [targetName]: targetValue }));
  };
  return { formData, setFormData, handlerForm };
};

export default useForm;
