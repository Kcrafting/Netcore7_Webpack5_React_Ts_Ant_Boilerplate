import React,{ReactNode,useEffect,useState} from "react";
import DataGrid ,{DataGridProps,Column }from 'react-data-grid';
import { FormatterProps } from "react-data-grid";
import { HeaderRendererProps } from '../../store/redux/store_robam_import/types'
import { Checkbox,Input,Select } from 'antd';

export interface _Row{
    key:any,
    index:number,
    errorTime?:string,
    description?:string,
    isError?:boolean,
}
export interface _Column{
    name:string,
    dataIndex:string,
    key:string,
    resizable:boolean,
    type?:string,
    width?:number,
    headerCellClass?:string,
    formatter?:(props: FormatterProps<_Row, unknown>) => ReactNode ,
    headerRenderer?:(props: HeaderRendererProps<_Row, unknown>) => React.ReactNode | undefined
}

const SelfDataGrid:React.FC<DataGridProps<_Row>> = (props)=>{
    const {columns,rows} = props;
    const [isErrorFilter,setIsErrorFilter] = useState<string>('all');
    const [descriptionFilter,setDescrptionFilter] = useState<string>('');
    const [timeFilter,setTimeFilter] = useState<string>('');

    const [_isErrorFilter,set_IsErrorFilter] = React.useState<(val:_Row,idx:number,arr:readonly _Row[])=>_Row | undefined>((val,idx,arr)=>(val));
    const AddColumnHeader  = (header_columns:_Column[])=>{
        return header_columns.map((val,index,arr)=>{
            val.headerCellClass="filter-cell";
            if(val.key === 'isError'){
                val.formatter = (row) =>{
                    return (
                      <Checkbox checked={row.row.isError}/>
                    );
                  };
                val.headerRenderer = (row)=>{
                      return ( <>
                        <div style={{
                            height:'35px',
                            maxHeight:'35px',
                            flex:1,
                            lineHeight:'35px',
                            width:'100%',
                            borderBlockEnd:'1px solid',
                            paddingBlock:'0px',
                            paddingInline:'8px',
                            borderBlockEndColor:'var(--rdg-border-color)'
                            }}>
                        <span><b>{row.column.name}</b></span>
                        </div>
                        <div style={{height:'30px',maxHeight:'35px',flex:1,lineHeight:'30px',paddingBlock:'0px',paddingInline:'0px',padding:'2px'}}>
              <Select
                    defaultValue="all"
                    style={{ width:'100%',height:'30px' }}
                    onChange={(value: string)=>{
                        setIsErrorFilter(value);
                    }}
                    options={[
                    {
                        label: '单选',
                        options: [
                        { label: '勾选', value: 'checked' },
                        { label: '未勾选', value: 'unchecked' },
                        ],
                    },
                    {
                        label: '全选',
                        options: [{ label: '全选', value: 'all' }],
                    },
                    ]}
                />
                        </div>
                        </>)
                  }
            }
            if(val.key === 'errorTime'){
                val.headerCellClass="filter-cell";
                val.headerRenderer = (row)=>{
                    return ( <>
                        <div style={{
                            height:'35px',
                            maxHeight:'35px',
                            flex:1,
                            lineHeight:'35px',
                            width:'100%',
                            borderBlockEnd:'1px solid',
                            paddingBlock:'0px',
                            paddingInline:'8px',
                            borderBlockEndColor:'var(--rdg-border-color)'
                            }}>
                        <span><b>{row.column.name}</b></span>
                        </div>
                        <div style={{height:'30px',maxHeight:'35px',flex:1,lineHeight:'30px',paddingBlock:'0px',paddingInline:'0px',padding:'2px'}}>
                     
                        <Input.Search allowClear onChange={(txt)=>{
                            setTimeFilter(txt?.currentTarget?.value??'');
                        }}  style={{height:'30px',flex:1,width:'100%',inlineSize:'100%'}}/>
                        </div>
                        </>)
                }
            }
            if(val.key === 'description' ){
                val.headerCellClass="filter-cell";
                val.headerRenderer = (row)=>{
                    return (
                        <>
                        <div style={{
                            height:'35px',
                            maxHeight:'35px',
                            flex:1,
                            lineHeight:'35px',
                            width:'100%',
                            borderBlockEnd:'1px solid',
                            paddingBlock:'0px',
                            paddingInline:'8px',
                            borderBlockEndColor:'var(--rdg-border-color)'
                            }}>
                        <span><b>{row.column.name}</b></span>
                        </div>
                        <div style={{height:'30px',maxHeight:'35px',flex:1,lineHeight:'30px',paddingBlock:'0px',paddingInline:'0px',padding:'2px'}}>
                     
                        <Input.Search allowClear onChange={(txt)=>{
                            setTimeFilter(txt?.currentTarget?.value??'');
                        }}  style={{flex:1,width:'100%',inlineSize:'100%',height:'30px'}} size={"middle"}/>
                        </div>
                        </>
                    ) 
                }
            }
        }) as unknown[] as _Column[];
    }
    AddColumnHeader(columns as _Column[]);
    return(
        <DataGrid {...props} 
        columns = {columns} 
        rows={(rows as _Row[]).filter((item)=>{
            if((isErrorFilter === 'all' ? true : (isErrorFilter === 'checked' ? item?.isError : !item?.isError)) && 
               (descriptionFilter === '' || item?.description?.includes(descriptionFilter)) && 
               (timeFilter === '' || item?.errorTime?.includes(timeFilter)))
            return isErrorFilter === 'all' ? true : (isErrorFilter === 'checked' ? item?.isError : !item?.isError);
        })} 
        headerRowHeight = {70}
        />
    )
}

export default SelfDataGrid;