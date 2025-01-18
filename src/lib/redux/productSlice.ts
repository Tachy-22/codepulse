import { ProductData } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  products: ProductData[];
  currentProduct: ProductData | null;
}

const initialState: ProductState = {
  products: [],
  currentProduct: null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductData[]>) => {
      state.products = action.payload;
    },
    setCurrentProduct: (state, action: PayloadAction<ProductData | null>) => {
      state.currentProduct = action.payload;
    },
    updateProduct: (state, action: PayloadAction<ProductData>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      if (state.currentProduct?.id === action.payload.id) {
        state.currentProduct = action.payload;
      }
    },
    clearProducts: (state) => {
      state.products = [];
      state.currentProduct = null;
    },
  },
});

export const { setProducts, setCurrentProduct, updateProduct, clearProducts } = productSlice.actions;

export default productSlice.reducer;
