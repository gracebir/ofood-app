import { ArrowDownward, ArrowUpward } from '@material-ui/icons'
import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router';
import { getToDayOperations } from '../../redux/actions/operationAction';
import {getToDayRevenues} from '../../redux/actions/revenueAction';
import './featureInfo.component.css';

export default function FeatureInfo() {

    const history = useHistory();
    const dispatch = useDispatch();
    const {data, error} = useSelector(({operations: {operationLatest}})=>operationLatest);
    const {revenues, err} = useSelector(({revenues: {revenueOfDay}})=>revenueOfDay);
    useEffect(() =>{
        getToDayOperations(dispatch, history);
        getToDayRevenues(dispatch);
      }, [ dispatch ]);

    function total(){
        return data.reduce((amount, operation)=>(operation.montant + amount), 0)
    }
    const rev = ()=>{
        return revenues.reduce((amount, revenu)=>(revenu.retrocommission + amount), 0)
    }
    return (
        <div className="featured">
           <div className="featuredItem">
               <Link to='/revenues' className="link">
                    <span className="featuredTitle">Revenues</span>
                    <div className="featuredMoneyContainer">
                        <span className="featuredMoney">{rev()}FC</span>
                        <span className="featuredMoneyRate">
                            -11.4 <ArrowDownward className="featuredIcon negative"/>
                        </span>
                    </div>
               </Link>
                    <span className="featuredSub">Compared to last Month</span>
            </div>
                <div className="featuredItem">
                    <Link to='/ventes' className ="link">
                        <span className="featuredTitle">Ventes</span>
                        <div className="featuredMoneyContainer">
                            <span className="featuredMoney">{total()}FC</span>
                            <span className="featuredMoneyRate">
                                -1.4 <ArrowDownward className="featuredIcon negative"/>
                            </span>
                        </div>
                        <span className="featuredSub">Compared to last Month</span>
                    </Link>
                </div>
            <div className="featuredItem">
                <Link to="/ventes" className="link">                
                    <span className="featuredTitle">Transactions</span>
                    <div className="featuredMoneyContainer">
                        <span className="featuredMoney">{data.length}</span>
                        <span className="featuredMoneyRate">
                            +4.4 <ArrowUpward className="featuredIcon"/>
                        </span>
                    </div>
                    <span className="featuredSub">Compared to last Month</span>
                </Link>
            </div> 
        </div>
    )
}
