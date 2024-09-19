document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Lemon juice", img: "1.jpg", price: 15000 },
      { id: 2, name: "Creme Brulee", img: "2.jpg", price: 15000 },
      { id: 3, name: "Blue lagoon", img: "3.jpg", price: 14000 },
      { id: 4, name: "Chicken Flatter", img: "4.jpg", price: 15000 },
      { id: 5, name: "Macaroni Schotel", img: "5.jpg", price: 10000 },
      { id: 6, name: "Lychee Tea", img: "6.jpg", price: 15000 },
      { id: 7, name: "Bread", img: "7.jpg", price: 5000 },
      { id: 8, name: "Cocktail", img: "8.jpg", price: 10000 }
    ]
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      const cartItem = this.items.find((item) => item.id === newItem.id);

      if (!cartItem) {
        // Item is not in the cart, add it
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // Item already exists in the cart, update quantity and total
        cartItem.quantity++;
        cartItem.total = cartItem.price * cartItem.quantity;
        this.quantity++;
        this.total += cartItem.price;
      }
    },
    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);

      if (cartItem) {
        if (cartItem.quantity > 1) {
          // If more than one, just decrease the quantity
          cartItem.quantity--;
          cartItem.total = cartItem.price * cartItem.quantity;
          this.quantity--;
          this.total -= cartItem.price;
        } else {
          // If it's the last item, remove it from the cart
          this.items = this.items.filter((item) => item.id !== id);
          this.quantity--;
          this.total -= cartItem.price;
        }
      }
    }
  });
});

// Function to format numbers as Indonesian Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(number);
};
