import { useContext } from 'react';
import './styles.css';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';
import OrderCard from '../OrderCard';
import { totalPrice } from '../../utils';
import { Link } from "react-router-dom";

const CheckoutSideMenu = () => {
    const context = useContext(ShoppingCartContext);

    const handleDelete = (id) => {
        const filteredProducts = context.cartProducts.filter(product => product.id !== id);
        context.setCartProducts(filteredProducts);
    }

    const handleCheckout = () => {
        const date = new Date(); // Obtiene la fecha actual

        const orderToAdd = {
            date: date.toLocaleDateString(), // Establece la fecha en el formato local
            products: context.cartProducts, // Asegúrate de que aquí sea `cartProducts`
            totalProducts: context.cartProducts.length,
            totalPrice: totalPrice(context.cartProducts)
        };

        context.setOrder([...context.order, orderToAdd]); // Agrega el nuevo pedido al contexto
        context.setCartProducts([]); // Limpia el carrito
    }

    return (
        <aside className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}>
            <div className="flex justify-between items-center p-6">
                <h2 className="font-medium text-xl">My Order</h2>
                <div onClick={() => context.closeCheckoutSideMenu()}>
                    <XMarkIcon className="h-6 w-6 text-blue-500 cursor-pointer" />
                </div>
            </div>

            <div className="p-6 overflow-y-scroll flex-1">
                {context.cartProducts.map(product => (
                    <OrderCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        imageUrl={product.imageUrl}
                        price={product.price}
                        handleDelete={handleDelete}
                    />
                ))}
            </div>
            <div className='px-6'>
                <p className='flex justify-between items-center'>
                    <span className='font-light'>Total: </span>
                    <span className='font-medium text-2xl'>${totalPrice(context.cartProducts)}</span>
                </p>
                <Link to='/my-orders/last'>
                    <button className='w-full bg-black py-3 text-white rounded-lg' onClick={() => handleCheckout()}>
                        Checkout
                    </button>
                </Link>
            </div>
        </aside>
    );
};

export default CheckoutSideMenu;


