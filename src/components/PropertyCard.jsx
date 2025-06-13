
import noimage from '*/assets/noimage.jpg';

function PropertyCard({ property }) {
    if (!property) return null;
    const apiUrl = import.meta.env.VITE_API_URL;
    return (
        <div className="flex flex-col items-center justify-center p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300">
            <img src={property.imageUrls && property.imageUrls.length > 0 ? (apiUrl+property.imageUrls[0]) : noimage} 
            alt={property.title} 
            className="w-full h-48 object-cover rounded-lg shadow-md" />
            <h3>{property.title}</h3>
            <p>{property.city}, {property.address}</p>
        </div>
    );
}

export default PropertyCard;