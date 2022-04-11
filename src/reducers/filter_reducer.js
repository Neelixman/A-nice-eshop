import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  switch(action.type) {
    case LOAD_PRODUCTS:
      let maxPrice, minPrice;
      let allPrices = action.payload.map((p) => p.price);
      if(allPrices.length) {
        maxPrice = allPrices.reduce((a,b) => Math.max(a,b))
        minPrice = allPrices.reduce((a,b) => Math.min(a,b))
      }
      return {...state, all_products: [...action.payload], filtered_products: [...action.payload], filters: {...state.filters, max_price: maxPrice, price: maxPrice, min_price: minPrice}}
    case SET_GRIDVIEW:
      return {...state, grid_view: true}
    case SET_LISTVIEW:
      return {...state, grid_view: false}
    case UPDATE_SORT:
      return {...state, sorting_by: action.payload}
    case SORT_PRODUCTS:
      const {sorting_by, filtered_products} = state;
      let tempProducts = [...filtered_products];

      if(sorting_by === "price-lowest") {
        tempProducts.sort((a, b) => a.price - b.price)
      }

      if(sorting_by === "price-highest") {
        tempProducts.sort((a, b) => b.price - a.price)
      }

      if(sorting_by === "name-a") {
        tempProducts.sort((a, b) => a.name.localeCompare(b.name) );
      }

      if(sorting_by === "name-z") {
        tempProducts.sort((a, b) => b.name.localeCompare(a.name) );
      }
      return {...state, filtered_products: tempProducts}
    case UPDATE_FILTERS:
      return {...state, filters: {...state.filters, ...action.payload }}
    case FILTER_PRODUCTS:
      const {all_products} = state;
      const {text, category, company, color, price, shipping} = state.filters;
      let filteredProducts = [...all_products];

      // Filtering will start here
      if(text) {
        filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().startsWith(text))
      }

      if(category && category !== "all") {
        filteredProducts = filteredProducts.filter(p => p.category === category)
      }

      if(company && company !== "all") {
        filteredProducts = filteredProducts.filter(p => p.company === company)
      }

      if(color !== "all") {
        filteredProducts = filteredProducts.filter(p => p.colors.find((c) => c === color))
      }

      if(shipping) {
        filteredProducts = filteredProducts.filter(p => p.shipping)
      }

      filteredProducts = filteredProducts.filter(p => p.price <= price)
     
      return {...state, filtered_products: filteredProducts}
    case CLEAR_FILTERS: 
      return {...state, filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false
      }}
    default:
      return state
  }
}

export default filter_reducer
