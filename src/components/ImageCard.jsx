import { useNavigate } from 'react-router-dom';

function ImageCard(props) {
    const navigate = useNavigate();

    
    const handdleClick = () => {
        const propertyType = props.propertyType ? String(props.propertyType).toUpperCase() : null;
        const filter = {
            city: props.city,
            propertyType
        }

        navigate('/search', { state: { filter }});
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300" style={{ maxWidth: "300px", maxHeight: "200px" }} onClick={handdleClick}>
            <img
                src={props.imageUrl}
                alt={props.city !== null ? props.city : props.propertyType}
                style={{ borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} />
            <p>{props.city != null ? props.city : props.propertyType}</p>
        </div>
    )
}

export default ImageCard;