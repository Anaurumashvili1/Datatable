import {Controller, useFormState} from "react-hook-form";

const FormField = ({name,label, rules, Component, defaultValue,...props}) => {
    const formState = useFormState()
    return <Controller name={name} render={({field: {onChange, onBlur, value, ref}}) => (
        <Component error={Boolean(formState.errors[name])}
                   helperText={formState.errors[name]?.message} fullWidth name={name}
                   label={label}
                   defaultValue={defaultValue}
                   onChange={onChange} onBlur={onBlur}
                   value={value} ref={ref} {...props}/>
    )
    } rules={rules}
    />
}

export default FormField