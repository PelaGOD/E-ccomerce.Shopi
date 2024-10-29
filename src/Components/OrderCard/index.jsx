import { XMarkIcon } from "@heroicons/react/24/solid"


const OrderCard = props => {
    const { id, title, imageUrl, price, handleDelete } = props;
    let renderXMarkIcon = null
    if (handleDelete) {
        renderXMarkIcon = <div className="flex items-center gap-2">
            <XMarkIcon onClick={() => handleDelete(id)} className="h-6 w-6 text-blue-500 cursor-pointer" />
        </div>
    }
    return (
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
                <figure className="w-16 h-16">
                    <img
                        src={Array.isArray(imageUrl) ? imageUrl[0] : imageUrl} // Verifica si es array o string
                        alt={title}
                        className="w-full h-full rounded-lg object-cover"
                    />
                </figure>
                <span className="text-sm font-light">{title}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-lg font-medium">${price}</span>
                {renderXMarkIcon}
            </div>

        </div>
    );
}

export default OrderCard;
