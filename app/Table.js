import React from 'react'
import config from './config.json'

class Table extends React.Component {
    render() {
        return (
            <table>
                <thead>
                <tr>
                    <td>{config.head.name}</td>
                    <td>{config.head.age}</td>
                    <td>{config.head.sex}</td>
                    <td>是否选择</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>muyuanqiang7</td>
                    <td>27</td>
                    <td>男</td>
                    <td>是否选择</td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export default Table;