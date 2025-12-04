import React, { useState } from 'react';
import { CartItem, CustomerDetails, OrderType, PaymentMethod } from '../types';
import { X, Trash2, ShoppingBag, Truck, Store, CreditCard, Banknote, ArrowRight, CheckCircle } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (cartId: string) => void;
  onUpdateQuantity: (cartId: string, delta: number) => void;
}

type CheckoutStep = 'cart' | 'method' | 'details' | 'payment' | 'success';

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemoveItem,
  onUpdateQuantity 
}) => {
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [orderType, setOrderType] = useState<OrderType>('pickup');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [details, setDetails] = useState<CustomerDetails>({
    firstName: '', lastName: '', phone: '', email: '', address: '', city: 'West Hempstead', zip: '11552', instructions: ''
  });

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08625; // NY Tax
  const deliveryFee = orderType === 'delivery' ? 5.00 : 0;
  const total = subtotal + tax + deliveryFee;

  if (!isOpen) return null;

  const reset = () => {
    setStep('cart');
    onClose();
  };

  const handlePlaceOrder = () => {
    // Simulate API call
    setTimeout(() => {
      setStep('success');
    }, 1500);
  };

  const renderHeader = () => (
    <div className="flex items-center justify-between px-6 py-4 bg-larosa-wood text-white border-b border-white/10">
      <div className="flex items-center">
        <h2 className="text-xl font-serif font-bold">
          {step === 'cart' && 'Your Order'}
          {step === 'method' && 'How would you like it?'}
          {step === 'details' && 'Your Details'}
          {step === 'payment' && 'Payment Preference'}
          {step === 'success' && 'Order Confirmed'}
        </h2>
      </div>
      <button onClick={reset} className="text-white/70 hover:text-white transition-colors">
        <X className="w-6 h-6" />
      </button>
    </div>
  );

  const renderCartStep = () => (
    <>
      <div className="flex-1 overflow-y-auto p-6">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <ShoppingBag className="w-16 h-16 mb-4 text-gray-300" />
            <p className="text-lg">Your cart is empty.</p>
            <button onClick={reset} className="mt-4 text-larosa-tomato font-bold hover:underline">
              Start Ordering
            </button>
          </div>
        ) : (
          <ul className="space-y-6">
            {items.map((item) => (
              <li key={item.cartId} className="flex py-2 border-b border-gray-100 pb-4 last:border-0">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="ml-4 flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex justify-between text-base font-bold text-gray-900">
                      <h3 className="font-serif">{item.name}</h3>
                      <p>${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    {item.selectedVariant && (
                       <p className="text-sm font-medium text-larosa-tomato">{item.selectedVariant.label}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">{item.category}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button onClick={() => onUpdateQuantity(item.cartId, -1)} className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50" disabled={item.quantity <= 1}>-</button>
                      <span className="px-2 font-medium text-sm">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.cartId, 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-100">+</button>
                    </div>
                    <button onClick={() => onRemoveItem(item.cartId)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {items.length > 0 && (
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <button
            onClick={() => setStep('method')}
            className="w-full bg-larosa-tomato text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors flex items-center justify-center"
          >
            Checkout <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      )}
    </>
  );

  const renderMethodStep = () => (
    <div className="flex-1 flex flex-col p-6 bg-gray-50">
      <div className="space-y-4">
        <button
          onClick={() => setOrderType('pickup')}
          className={`w-full p-6 rounded-xl border-2 flex items-center justify-between transition-all ${
            orderType === 'pickup' 
              ? 'border-larosa-tomato bg-white shadow-md' 
              : 'border-gray-200 bg-gray-100 text-gray-500'
          }`}
        >
          <div className="flex items-center">
            <Store className={`w-8 h-8 mr-4 ${orderType === 'pickup' ? 'text-larosa-tomato' : 'text-gray-400'}`} />
            <div className="text-left">
              <p className="font-bold text-lg">Pick Up</p>
              <p className="text-sm">West Hempstead Location</p>
            </div>
          </div>
          {orderType === 'pickup' && <CheckCircle className="w-6 h-6 text-larosa-tomato" />}
        </button>

        <button
          onClick={() => setOrderType('delivery')}
          className={`w-full p-6 rounded-xl border-2 flex items-center justify-between transition-all ${
            orderType === 'delivery' 
              ? 'border-larosa-tomato bg-white shadow-md' 
              : 'border-gray-200 bg-gray-100 text-gray-500'
          }`}
        >
          <div className="flex items-center">
            <Truck className={`w-8 h-8 mr-4 ${orderType === 'delivery' ? 'text-larosa-tomato' : 'text-gray-400'}`} />
            <div className="text-left">
              <p className="font-bold text-lg">Delivery</p>
              <p className="text-sm">Straight to your door</p>
            </div>
          </div>
          {orderType === 'delivery' && <CheckCircle className="w-6 h-6 text-larosa-tomato" />}
        </button>
      </div>

      <div className="mt-auto">
        <button
          onClick={() => setStep('details')}
          className="w-full bg-larosa-wood text-white py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
        >
          Continue <ArrowRight className="w-5 h-5 ml-2" />
        </button>
        <button onClick={() => setStep('cart')} className="w-full mt-4 py-2 text-gray-500 hover:text-gray-900 font-medium">Back</button>
      </div>
    </div>
  );

  const renderDetailsStep = () => (
    <div className="flex-1 flex flex-col p-6 bg-white overflow-y-auto">
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
             <input 
               type="text" 
               className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-larosa-tomato" 
               placeholder="Mario"
               value={details.firstName}
               onChange={e => setDetails({...details, firstName: e.target.value})}
             />
          </div>
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
             <input 
               type="text" 
               className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-larosa-tomato" 
               placeholder="Rossi"
               value={details.lastName}
               onChange={e => setDetails({...details, lastName: e.target.value})}
             />
          </div>
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
           <input 
             type="tel" 
             className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-larosa-tomato" 
             placeholder="(516) 555-0123"
             value={details.phone}
             onChange={e => setDetails({...details, phone: e.target.value})}
           />
        </div>

        {orderType === 'delivery' && (
          <>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
               <input 
                 type="text" 
                 className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-larosa-tomato" 
                 placeholder="123 Pizza Way"
                 value={details.address}
                 onChange={e => setDetails({...details, address: e.target.value})}
               />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                 <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50" 
                    value={details.city}
                    readOnly
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                 <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-larosa-tomato" 
                    value={details.zip}
                    onChange={e => setDetails({...details, zip: e.target.value})}
                 />
               </div>
            </div>
          </>
        )}

        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Instructions / Notes</label>
           <textarea 
             className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-larosa-tomato" 
             rows={3}
             placeholder="Gate code, allergies, extra napkins..."
             value={details.instructions}
             onChange={e => setDetails({...details, instructions: e.target.value})}
           />
        </div>
      </form>

      <div className="mt-8">
        <button
          onClick={() => setStep('payment')}
          className="w-full bg-larosa-wood text-white py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
        >
          Proceed to Payment <ArrowRight className="w-5 h-5 ml-2" />
        </button>
        <button onClick={() => setStep('method')} className="w-full mt-4 py-2 text-gray-500 hover:text-gray-900 font-medium">Back</button>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="flex-1 flex flex-col p-6 bg-gray-50 overflow-y-auto">
      {/* Order Summary */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <h3 className="font-bold text-gray-900 mb-2">Order Summary</h3>
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        {orderType === 'delivery' && (
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Delivery Fee</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-lg font-bold text-larosa-wood mt-2 pt-2 border-t border-gray-100">
          <span>Total Due</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <h3 className="font-bold text-gray-900 mb-4">How will you pay {orderType === 'pickup' ? 'at pickup' : 'upon delivery'}?</h3>
      <div className="space-y-3 mb-6">
        <button
          onClick={() => setPaymentMethod('card')}
          className={`w-full p-4 rounded-lg border-2 flex items-center justify-between transition-colors ${
            paymentMethod === 'card' ? 'border-larosa-tomato bg-white' : 'border-gray-200 bg-gray-50'
          }`}
        >
           <span className="flex items-center font-medium"><CreditCard className="w-5 h-5 mr-3" /> Pay with Card (In Person)</span>
           {paymentMethod === 'card' && <div className="w-3 h-3 bg-larosa-tomato rounded-full" />}
        </button>
        <button
          onClick={() => setPaymentMethod('cash')}
          className={`w-full p-4 rounded-lg border-2 flex items-center justify-between transition-colors ${
            paymentMethod === 'cash' ? 'border-larosa-tomato bg-white' : 'border-gray-200 bg-gray-50'
          }`}
        >
           <span className="flex items-center font-medium"><Banknote className="w-5 h-5 mr-3" /> Pay with Cash</span>
           {paymentMethod === 'cash' && <div className="w-3 h-3 bg-larosa-tomato rounded-full" />}
        </button>
      </div>

      <div className="p-4 bg-blue-50 text-blue-800 text-sm rounded-lg mb-8">
         <p className="font-bold mb-1">Note:</p>
         <p>You are not charged now. Payment is collected when you receive your order.</p>
      </div>

      <div className="mt-auto">
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors shadow-lg"
        >
          Confirm Order (${total.toFixed(2)})
        </button>
        <button onClick={() => setStep('details')} className="w-full mt-4 py-2 text-gray-500 hover:text-gray-900 font-medium">Back</button>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white text-center">
       <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-300">
         <CheckCircle className="w-12 h-12 text-green-600" />
       </div>
       <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Grazie!</h2>
       <p className="text-lg text-gray-600 mb-8">
         Your order has been placed successfully.<br/>
         We are firing up the oven now!
       </p>
       
       <div className="bg-gray-50 p-6 rounded-xl w-full max-w-sm mb-8">
         <p className="text-sm text-gray-500 mb-1">Order Number</p>
         <p className="text-xl font-bold font-mono text-gray-900 mb-4">#LR-{Math.floor(Math.random() * 10000)}</p>
         
         <p className="text-sm text-gray-500 mb-1">Estimated Time</p>
         <p className="text-xl font-bold text-larosa-tomato">{orderType === 'delivery' ? '45-60' : '20-30'} Minutes</p>

         <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">Amount Due {orderType === 'pickup' ? 'at Counter' : 'on Delivery'}</p>
            <p className="text-lg font-bold text-gray-900">${total.toFixed(2)} ({paymentMethod === 'card' ? 'Card' : 'Cash'})</p>
         </div>
       </div>

       <button onClick={reset} className="px-8 py-3 border-2 border-larosa-wood text-larosa-wood font-bold rounded-full hover:bg-larosa-wood hover:text-white transition-colors">
         Back to Menu
       </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-60 transition-opacity backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
        <div className="flex-1 flex flex-col bg-white shadow-2xl animate-in slide-in-from-right duration-300">
          {renderHeader()}
          {step === 'cart' && renderCartStep()}
          {step === 'method' && renderMethodStep()}
          {step === 'details' && renderDetailsStep()}
          {step === 'payment' && renderPaymentStep()}
          {step === 'success' && renderSuccessStep()}
        </div>
      </div>
    </div>
  );
};