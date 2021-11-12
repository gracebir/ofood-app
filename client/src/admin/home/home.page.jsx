import React from 'react';
import ChartComp from '../../components/chart/chart.component'
import FeatureInfo from '../../components/featureInfo/featureInfo.component';
import './home.page.css';
import WidgetSm from '../../components/screen/widget.component';
import WidgetLg from '../../components/screen/widgetLg.component';
import { useSelector } from 'react-redux';

export default function Home() {
    const {data} = useSelector(({users: {currentUser}})=>currentUser)
    return (
        <div className="home">
            {
                data.role === 1 ?
                <> 
                    <FeatureInfo/>
                    <ChartComp/>
                    <div className="homeWidget">
                        <WidgetSm/>
                        <WidgetLg/>
                    </div>
                </> 
                :                
                <>
                    <ChartComp/>
                    <div className="homeWidget">
                        <WidgetSm/>
                        <WidgetLg/>
                    </div>
                </>
            }             
        </div>
    )
}
