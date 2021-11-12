import React from 'react';
import './widgetLg.component.css';
import product2 from '../../assets/product-2.jpg'
import { Avatar } from 'antd';

export default function WidgetLg(props) {
   
    return(
        <div className="widgetLg">
          <h3 className="widgetLgTitle">Top 5 d'Agents les plus Monnayer </h3>
          <table className="widgetLgTable">
            <thead>
                <tr className="widgetLgTr">
                  <th className="widgetLgTh">Customer</th>
                  <th className="widgetLgTh">Date created</th>
                  <th className="widgetLgTh">Amount</th>
                  <th className="widgetLgTh">Phone</th>
              </tr>
            </thead>
            <tbody>
                <>
                    <tr className="widgetLgTr">
                        <td className="widgetLgUser">
                            <Avatar className="avatar-userList" children={<img src={product2}className="avatar"/>} /> Ibrahim Bagalwa
                        </td>
                        <td className="widgetDate">le 12-23-2022</td> 
                        <td className="widgetAmount">23</td> 
                        <td className="widgetStatus">00000000000</td> 
                    </tr>  
                </>
            </tbody>   
          </table>
        </div>
    )

}
