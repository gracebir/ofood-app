import {Image} from 'cloudinary-react';


export function CloudImg(props){
    const { publicId, className } = props;

    return(
        <Image publicId={publicId} className={className} cloudName='bagalwa' />
    )
}