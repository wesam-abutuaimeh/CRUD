import { Component } from "react";
import "./style.css"

class Table extends Component {
    render() {
        const { columns, data, onRowClick } = this.props;
        return <table>
            <thead>
                <tr>
                    {columns.map((col, index) => {
                        return <th key={col.key}>{col.title}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => {
                    return <tr key={row.id} onClick={() => { onRowClick(row) }}>
                        {columns.map((column) => (
                            <td key={`${row.id + column.key}`}>
                                {column.render ? column.render(row) : row[column.key]}
                            </td>
                        ))
                        }
                    </tr>
                })}
            </tbody>
        </table>
    }
}

export default Table;
