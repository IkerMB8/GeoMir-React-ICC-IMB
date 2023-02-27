import { useState } from "react";
export const useForm = (initialForm={}) => {
    let [formState, setFormState] = useState(initialForm);
    const onResetForm = () => {
        setFormState(useState(initialForm));
    };
    const onInputChange = ({ target }) => {
        // amb { target } desestructurem e
        // enlloc d'escriure e.target , escriurem target
        // Desestructurem ara target
        const { name, value } = target;
        setFormState({
        ...formState,
        // [target.name] : target.value
        [name]: value,
        });
        // Si no haguéssim desestrcuturat res...
        // [e.target.name] : e.target.value
    };
    return { ...formState, formState,onInputChange,onResetForm };
};

export default useForm;