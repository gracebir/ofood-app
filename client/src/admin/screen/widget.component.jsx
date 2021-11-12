
import { Avatar } from 'antd';
import React from 'react';
import './widgetSm.component.css';
import product1 from '../../assets/product-1.jpg'

export default function WidgetSm() {

    return (
        <div className="widgetSm">
          <h3 className="widgetLgTitle">Top 5 de Clients les plus Monnayer </h3>
          <table className="widgetLgTable">
            <thead>
                <tr className="widgetLgTr">
                  <th className="widgetLgTh">Customer</th>
                  <th className="widgetLgTh">Date created</th>
                  <th className="widgetLgTh">Email</th>
                  <th className="widgetLgTh">Phone</th>
              </tr>
            </thead>
            <tbody>        
                <>
                    <tr className="widgetLgTr">
                        <td className="widgetLgUser">
                            <Avatar className="avatar-userList" children={<img src={product1}className="avatar"/>} /> Ibrahim Bagalwa
                        </td>
                        <td className="widgetDate">11-21-2012</td> 
                        <td className="widgetAmount">email.@gmail.com</td> 
                        <td className="widgetStatus">+259791042558</td> 
                    </tr>  
                </>
            </tbody>   
          </table>
        </div>
    )
}
