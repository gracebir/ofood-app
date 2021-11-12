import React from 'react';
import FeatureInfo from '../featureInfo/featureInfo.component';
import WidgetSm from '../screen/widget.component';
import WidgetLg from '../screen/widgetLg.component';
import './home.page.css';


export default function Home() {
    return (
        <div className="home">
            <FeatureInfo/>
            <div className="homeWidget">
                <WidgetSm/>
                <WidgetLg/>
            </div>    
        </div>
    )
}
