import AutoSizer from 'react-virtualized-auto-sizer' 
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { VariableSizeGrid } from 'react-window';
const KTableList = (rawData: object[],columns:Array<number>, { scrollbarSize, ref, onScroll }: any)=>{

    return (
        <VariableSizeGrid
        rowHeight={(index: number) => index}
        rowCount = {rawData.length}
        columnCount={columns.length}
        height={500}
        width={1000}
        columnWidth={(index: number)=>index}
        >
{
    ({columnIndex,rowIndex,style}) =>{
        return <>
        
        </>
    }
}
        </VariableSizeGrid>
    )
}

const KTable : React.FC = <RecordType extends object>(props: TableProps<RecordType>)=>{
    return(
        <AutoSizer>
            {
                ({height,width})=> (
                <Table>

                </Table>)
            }
        </AutoSizer>
    )
    

}