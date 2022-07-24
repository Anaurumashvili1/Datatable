import MUIDataTable from "mui-datatables";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers'
import useData from "./helpers/useData"
import {useForm, FormProvider} from "react-hook-form";
import {useState} from "react";

function App() {
    const [data, setData] = useState([])
    const form = useForm({defaultValues: {name:"", surname:"",sex:"",birthDate:null, id:"",address:"", birthPlace:""}})
    const {options, columns} = useData(data, setData, form)
    return (<>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormProvider {...form}
            >
                <MUIDataTable data={data} columns={columns}
                              options={options}/>
            </FormProvider>
        </LocalizationProvider>
    </>);
}


export default App;
