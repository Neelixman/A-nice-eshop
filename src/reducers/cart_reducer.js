import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  const {type, payload} = action;
  switch(type) {
    case ADD_TO_CART:
      const {id, color, amount, product} = payload;
      const itemToAddExists = state.cart.find((i) => i.id === id + color);

      if(!itemToAddExists) {
        const newItem = {
          id: id+color,
          name: product.name,
          color: color,
          amount: amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock
        };
        return {...state, cart: [...state.cart, newItem]}
      } else {
        const tempCart = state.cart.map((cartItem) => {
          if(cartItem.id === id + color) {
            let newAmount = cartItem.amount + amount;
            if(newAmount > cartItem.max) {
              newAmount = cartItem.max
            }

            return {...cartItem, amount: newAmount}
          }

          return cartItem
        })

        return {...state, cart: tempCart}
      }
      case REMOVE_CART_ITEM:
        const newCart = state.cart.filter((item) => item.id !== payload);
    
        return {...state, cart: newCart}
      case TOGGLE_CART_ITEM_AMOUNT:
        const newItems = state.cart.map(item => {
          if(item.id === payload.id) {
            let newAmount = item.amount;

            if(payload.value === "inc") {
              newAmount = +newAmount + 1
            } 

            if(payload.value === "dec") {
              newAmount = +newAmount - 1
              if(newAmount < 1) newAmount = 1;
            }
            item.amount = newAmount > item.max ? item.max : newAmount;
          }
          return item;  
        });

        
        
        return {...state, cart: newItems}
      case COUNT_CART_TOTALS: 
        const {total_items, total_amount} = state.cart.reduce((acc, cartItem) => {
          const {amount, price} = cartItem;

          acc.total_items += amount;
          acc.total_amount += price * amount;
          return acc;
        }, {
          total_items: 0,
          total_amount: 0
        })
        return {...state, total_items, total_amount}
      case CLEAR_CART:
        return {...state, cart: []}
      default:
        return  {...state, }
        
  }
}

export default cart_reducer
