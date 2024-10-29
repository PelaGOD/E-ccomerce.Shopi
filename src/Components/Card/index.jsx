import React, { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid';

const Card = ({ data }) => {
    const {
        count,
        setCount,
        cartProducts,
        setCartProducts,
        openProductDetail,
        setProductToShow,
        closeProductDetail,
        openCheckoutSideMenu,
        closeCheckoutSideMenu
    } = useContext(ShoppingCartContext);

    const { category, images, title, price, id } = data;

    const showProduct = () => {
        openProductDetail();
        setProductToShow(data);
        closeCheckoutSideMenu();
    };

    const handleAddToCart = (event) => {
        event.stopPropagation();
        setCount(count + 1);
        setCartProducts([...cartProducts, data]);
        closeProductDetail();
        openCheckoutSideMenu();
    };

    const renderIcon = () => {
        const isInCart = cartProducts.some(product => product.id === id);

        if (isInCart) {
            return (
                <button
                    className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1">
                    <CheckIcon className="h-6 w-6" />
                </button>
            );
        } else {
            return (
                <button
                    className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1"
                    onClick={handleAddToCart}>
                    <PlusIcon className="h-6 w-6" />
                </button>
            );
        }
    };

    return (
        <div className="bg-white cursor-pointer w-56 h-60 rounded-lg" onClick={showProduct}>
            <figure className="relative mb-2 w-full h-4/5">
                <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">
                    {category?.name || category}
                </span>
                <img
                    className="w-full h-full object-cover rounded-lg"
                    src={images[0] || '/placeholder.png'}
                    alt={title}
                />
                {renderIcon()}
            </figure>
            <p className="flex justify-between">
                <span className="text-sm font-light">{title}</span>
                <span className="flex text-lg  font-medium">${price}</span>
            </p>
        </div>
    );
};

export default Card;





