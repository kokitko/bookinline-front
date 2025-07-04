import { Link } from 'react-router-dom';

function ImageCard(props) {
    const propertyType = props.propertyType ? String(props.propertyType).toUpperCase() : null;
    const filter = {
        city: props.city,
        propertyType
    };

    return (
        <Link
            to="/search"
            state={{ filter }}
            className="flex flex-col items-center justify-center p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300"
            style={{ maxWidth: "300px", maxHeight: "200px", textDecoration: "none" }}
        >
            <img
                src={props.imageUrl}
                alt={props.city != null ? props.city : props.propertyType}
                style={{ borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
            />
            <p>{props.city != null ? props.city : props.propertyType}</p>
        </Link>
    );
}

export default ImageCard;