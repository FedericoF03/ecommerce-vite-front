import { useState } from "react";

const useForm = (initForm) => {
  const [formData, setFormData] = useState(initForm);

  const handlerForm = (dataChange) => {
    const value = dataChange.target.value;
    const name = dataChange.target.name;
    const empty = "";
    if (dataChange !== empty)
      setFormData((formDataState) => ({ ...formDataState, [name] : value }));
  };

  return { formData, handlerForm };
};

export default useForm;
