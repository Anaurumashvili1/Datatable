import {useFormContext, useFormState, Controller, useForm} from "react-hook-form";
import {useState} from "react"
import {
    TextField,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Select,
    MenuItem,
    Input,
    InputLabel,
    IconButton,
    Container
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {DatePicker} from "@mui/x-date-pickers";
import FormField from "./FormField"

const EntryForm = ({form, setData, data, tableMeta, action}) => {
    const formState = useFormState()
    const formContext = useFormContext()
    const [open, setOpen] = useState(false)
    const {clearErrors, reset, getValues, setValue} = form

    const rowIndex = tableMeta?.rowIndex;
    const entry = tableMeta?.tableData[rowIndex]
    const id = entry?.id

    const handleOpenforEdit = () => {
        setOpen(true)
        setValue("name",entry.name,{ shouldValidate: true })
        setValue("surname",entry.surname,{ shouldValidate: true })
        setValue("id",entry.id,{ shouldValidate: true })
        setValue("sex",entry.sex,{ shouldValidate: true })
        setValue("birthDate",entry.dateFormat,{ shouldValidate: true })
        setValue("birthPlace",entry.birthPlace,{ shouldValidate: true })
        setValue("address",entry.address,{ shouldValidate: true })
    }

    const handleOpen = ()=>{
        setOpen(true)

    }
    const convertDate=(receivedDate)=>{
        const collectedDate = new Date(receivedDate.birthDate)
        const formatedDay = collectedDate.getDate().toString().length < 2 ? `0${collectedDate.getDate()}` : collectedDate.getDate()
        const formatedMonth = collectedDate.getMonth().toString().length < 2 ? `0${collectedDate.getMonth() + 1}` : collectedDate.getMonth() + 1
        const formatedDate = receivedDate.birthDate != null ? `${formatedDay}/${formatedMonth}/${collectedDate.getFullYear()}` : null

        return formatedDate
    }
    const onSubmit = (data) => {
        const newEntry = {...data}
        newEntry.birthDate = convertDate(data);
        newEntry.dateFormat = data.birthDate
        setData(prev => [...prev, newEntry])
        handleClose()
        reset()
    }
    const handleClose = () => {
        setOpen(false)
        clearErrors(Object.keys(formState.errors))
        reset()
    }


    const onEdit = (collectedData) => {
        const editedEntry = {...collectedData}
        editedEntry.birthDate = convertDate(collectedData);
        editedEntry.dateFormat = collectedData.birthDate
        setData(data.map(entry=>entry.id===id ? editedEntry : entry))
        handleClose()
        reset()
    }

    return <>
        <Container>
            {action==="add"? <IconButton size={'small'} onClick={handleOpen}><AddIcon/> დამატება</IconButton>

          :  <Button size={'small'} onClick={handleOpenforEdit}> რედაქტირება</Button>}
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogContent>
                    <DialogContentText mb={2}>ახალი მონაცემის დამატება</DialogContentText>
                    <form>
                        <FormField Component={TextField} rules={{required: "სახელის შევსება სავალდებულოა"}}
                                   name={"name"}
                                   label={"სახელი"} />
                        <br/>

                        <FormField Component={TextField} rules={{required: "გვარის შევსება სავალდებულოა"}}
                                   name={"surname"}
                                   label={"გვარი"}
                                   />
                        <br/>

                        <FormField rules={{
                            required: "პირადი ნომრის შევსება სავალდებულოა",
                            minLength: {value: 11, message: "პირადი ნომერი უნდა შეიცავდეს მინიმუმ 11 სიმბოლოს"},
                            validate: (value) => {
                                const idExists = data.find(entry => entry.id === value && entry.id!== id)
                                return !idExists
                            }
                        }} name={"id"} label={"პირადი ნომერი"} Component={TextField}/>
                        <br/>
                        {formState.errors.id?.type === "validate" &&
                            <p className={'error-message'}>მონაცემი ამ პირადი ნომრით უკვე არსებობს</p>}
                        <InputLabel>სქესი</InputLabel>

                        <Controller name='sex' render={({field: {onChange, onBlur, value, ref}}) => (
                            <Select  error={Boolean(formState.errors.sex)} fullWidth name="sex" label={'სქესი'}
                                    onChange={onChange} onBlur={onBlur} value={value}
                                    ref={ref}>
                                <MenuItem value={"მდედრობითი"}>მდედრობითი</MenuItem>
                                <MenuItem value={"მამრობითი"}>მამრობითი</MenuItem>
                            </Select>
                        )
                        } rules={{required: "სქესის შევსება სავალდებულოა"}}
                        />

                        {formState.errors.sex && <p className={'error-message'}>{formState.errors.sex.message}</p>}
                        <br/>

                        <FormField  renderInput={(params) => <TextField fullWidth {...params} />} Component={DatePicker}
                                   inputFormat={"dd/MM/yyyy"} disableFuture={true}
                                   rules={{required: "დაბადების თარიღის შევსება სავალდებულოა"}} name={"birthDate"}
                                   label={"დაბადების თარიღი"}/>

                        {formState.errors.birthDate &&
                            <p className={'error-message'}>{formState.errors.birthDate.message}</p>}
                        <br/>

                        <FormField Component={TextField} rules={{required: "დაბადების ადგილის შევსება სავალდებულოა"}}
                                   name={"birthPlace"}
                                   label={"დაბადების ადგილი"}/>
                        <br/>

                        <FormField  Component={TextField} rules={{required: "მისამართის შევსება სავალდებულოა"}}
                                   name={"address"}
                                   label={"მისამართი"}/>
                        <br/>

                    </form>
                    <DialogActions>
                        <Input type='submit' value={action==="add"?"დამატება":'რედაქტირება'} onClick={action==="add"?form.handleSubmit(onSubmit):form.handleSubmit(onEdit)}></Input>
                        <Button onClick={handleClose}>დახურვა</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Container>

    </>
}

export default EntryForm