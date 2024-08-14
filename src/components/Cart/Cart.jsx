import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from 'react-use-cart';

const CartPage = () => {
  const { items, totalItems, cartTotal, updateItemQuantity, removeItem } = useCart();

  return (
    <div className="bg-gray-100 h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">Wishlist</h1>
        {totalItems === 0 ? (
          <p className=''>No Car is in wishlist</p>
        ) : (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left pl-28 text-base font-semibold">Car</th>
                      <th className="text-left font-semibold">Price</th>
                      <th className="text-left font-semibold">Remove</th>
                    
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <tr key={item.id}>
                        <td className="py-4">
                          <div className="flex items-center">
                            <img className="h-40 rounded-md mr-4" src={item.image} alt={item.name} />
                            <span className="font-semibold">{item.name}</span>
                          </div>
                        </td>
                        <td className="py-4">{item.price}</td>
                       
                        <td className="py-4 "><button className='bg-slate-100 rounded-lg p-2' onClick={() => removeItem(item.id)}>Remove</button>
</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Test Drive Charge</span>
                  <span>{cartTotal/1000}.00</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Taxes</span>
                  <span>0.00</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>0.00</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">{cartTotal/1000 }.00</span>
                </div>
                <Link to="/checkout" className="bg-blue-500 text-white py-2 px-4 rounded-lg   ">Checkout</Link>
              </div>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
