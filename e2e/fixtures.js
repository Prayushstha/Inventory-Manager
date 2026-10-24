export const customers = [
  {
    id: 1,
    name: "Test Customer",
    phone: "9800000000",
    address: "Kathmandu",
    notes: "",
    totalDue: 100,
    bills: [
      {
        id: 11,
        date: "2026-10-23",
        payment_method: "Cash",
        total_purchased: 100,
        amount_paid: 100,
        amount_due: 0,
        status: "Paid",
        bill_type: "default",
        products: [
          {
            product_name: "Tea",
            quantity: 2,
            price_at_sale: 50,
            base: "Box",
            bucket_size: 1,
          },
        ],
      },
      {
        id: 12,
        date: "2026-10-24",
        payment_method: "Credit",
        total_purchased: 100,
        amount_paid: 0,
        amount_due: 100,
        status: "Due",
        bill_type: "default",
        products: [
          {
            product_name: "Coffee",
            quantity: 4,
            price_at_sale: 25,
            base: "Box",
            bucket_size: 1,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "-",
    phone: "",
    address: "",
    notes: "",
    totalDue: 0,
    bills: [
      {
        id: 13,
        date: "2026-10-24",
        payment_method: "Cash",
        total_purchased: 20,
        amount_paid: 20,
        amount_due: 0,
        status: "Paid",
        bill_type: "default",
        products: [
          {
            product_name: "Sugar",
            quantity: 1,
            price_at_sale: 20,
            base: "Bag",
            bucket_size: 1,
          },
        ],
      },
    ],
  },
];

export const products = [
  {
    id: "tea",
    name: "Tea",
    images: "",
    variants: [{ id: "tea-1", bucket_size: 1, landing: 30, sales: 50, mp: 55 }],
    bases: [{ id: "tea-box", name: "Box", stocks: [10] }],
  },
];

export function createMockDb() {
  return {
    customers,
    products,
    settings: {
      defaultPaymentMethod: "Cash",
      invoiceDefaults: {},
      appearanceTheme: "lara",
      appearanceMode: "light",
      onboardingCompleted: true,
    },
  };
}
