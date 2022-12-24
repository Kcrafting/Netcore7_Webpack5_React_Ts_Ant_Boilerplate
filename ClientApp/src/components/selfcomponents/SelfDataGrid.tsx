import React from "react";
import DataGrid ,{DataGridProps }from 'react-data-grid';
export interface _Row{
    key:any,
    index:string,
    errrorTime?:string,
    description?:string,
    isError?:boolean,
}


// export interface _Column{
//     name:string,
//     dataIndex:string,
//     key:string,
//     resizable:boolean,
//     type?:string,
//     width?:number
//     formatter?:(props: FormatterProps<_Row, unknown>) => ReactNode ,
//     headerRenderer?:(props: HeaderRendererProps<_Row, unknown>) => React.ReactNode
// }

const SelfDataGrid:React.FC<DataGridProps<_Row>> = (props)=>{

    return(
        <DataGrid {...props} columns = {props.columns} />
    )
}