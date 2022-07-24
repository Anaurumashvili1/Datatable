import {DatePicker} from "@mui/x-date-pickers";
import {TextField,Button} from "@mui/material";
import {useState} from "react"

import EntryForm from "./EntryForm"

const useData = (data, setData,form) => {

    const [date, setDate] = useState(null)
   const editFormValues = {

}

    const columns = [{label: 'სახელი', name: "name"}, {label: 'გვარი', name: 'surname'}, {
        label: 'პირადი ნომერი',
        name: "id"
    }, {name: 'sex', label: 'სქესი', options: {filterType: 'dropdown'}}, {
        label: 'დაბადების თარიღი', name: 'birthDate', options: {
            display: 'true', filter: true, filterType: "custom", filterOptions: {

                display: () => {
                    return <DatePicker
                        inputFormat="dd/MM/yyyy"
                        maxDate={Date.now()} onChange={(e) => setDate(e)} value={date}
                        renderInput={(params) => <TextField {...params} />}/>
                }, logic: (value, filter, row) => {
                    const filterDate = new Date(date)
                    const formatedDay = filterDate.getDate().toString().length < 2 ? `0${filterDate.getDate()}` : filterDate.getDate()
                    const formatedMonth = filterDate.getMonth().toString().length < 2 ? `0${filterDate.getMonth() + 1}` : filterDate.getMonth() + 1
                    const formatedDate = date != null ? `${formatedDay}/${formatedMonth}/${filterDate.getFullYear()}` : null

                    if (formatedDate != null && value !== formatedDate) return true
                    else return false

                },

            }
        }
    }, {label: 'დაბადების ადგილი', name: 'birthPlace'}, {label: 'მისამართი', name: 'address'}, {
        label: 'რედაქტირება', name: 'button', options: {filter: false, sort: false, customBodyRender: (value, tableMeta, updateValue) => {
                return (

                    <EntryForm action={"edit"} tableMeta={tableMeta} data={data} setData={setData} form={form} tableMeta={tableMeta}/>

                )
            }}
    }]

    const options = {
        customToolbar: () => (<EntryForm action={"add"} form={form} setData={setData} data={data} />),
        filterType: 'textField', jumpToPage: true, draggableColumns: {
            enabled: true
        }, onFilterChange: (changedColumn, filterList, type) => {
            if (type === "reset") setDate(null)
        },
        onRowsDelete:(deletedRows) => {
           const indexArray = deletedRows.data.map(e=>e.dataIndex)
            let filtered = []
            for (let i=0;i<indexArray.length; i++){
                filtered.push(data[indexArray[i]])
            }

            setData(data.filter(e=> filtered.indexOf(e)<0))
        },
        searchOpen: true, resizableColumns: true, textLabels: {
            body: {
                noMatch: "მონაცემები არ მოიძებნა",
                toolTip: "სორტირება",
                columnHeaderTooltip: column => `Sort for ${column.label}`
            }, pagination: {
                rowsPerPage: "მწკრივი ერთ გვერდზე:",
            }, toolbar: {
                search: "ძებნა",
                downloadCsv: "გადმოწერე CSV",
                print: "ბეჭდვა",
                viewColumns: "იხილე სვეტები",
                filterTable: "ფილტრაცია",
            }, filter: {
                all: "ყველა", title: "ფილტრები", reset: "გასუფთავება",
            }, viewColumns: {
                title: "სვეტები", titleAria: "გამოაჩინე/დამალე ცხრილის სვეტები",
            }, selectedRows: {
                text: "არჩეული მწკრივ(ებ)ი", delete: "წაშლა", deleteAria: "წაშალე არცეული მწკრივები",
            },

        }, rowsPerPageOptions: [10, 15, 20, 50, 100, 200]


    };



return {columns, options}
}

export default useData