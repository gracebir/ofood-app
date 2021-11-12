
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import React from 'react';
import './featureInfo.component.css';

export default function FeatureInfo() {
    return (
        <div className="featured">
           <div className="featuredItem">
                <span className="featuredTitle">Revenues</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">10000FC</span>
                    <span className="featuredMoneyRate">
                        -11.4 <ArrowDownward className="featuredIcon negative"/>
                    </span>
                </div>
                <span className="featuredSub">Compared to last Month</span>
            </div>
                <div className="featuredItem">
                    <span className="featuredTitle">Ventes</span>
                    <div className="featuredMoneyContainer">
                        <span className="featuredMoney">20000FC</span>
                        <span className="featuredMoneyRate">
                            -1.4 <ArrowDownward className="featuredIcon negative"/>
                        </span>
                    </div>
                    <span className="featuredSub">Compared to last Month</span>
                </div>
            <div className="featuredItem">               
                <span className="featuredTitle">Demandes</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">300</span>
                    <span className="featuredMoneyRate">
                        +4.4 <ArrowUpward className="featuredIcon"/>
                    </span>
                </div>
                <span className="featuredSub">Compared to last Month</span>
            </div> 
        </div>
    )
}
