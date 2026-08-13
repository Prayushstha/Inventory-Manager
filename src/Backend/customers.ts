type CustomerDatas = {
  id: number;
  name: string;
  phone: string;
  address: string;
  date: string;
  paymentMethod: string;
  totalPurchased: number;
  amountPaid: number;
  amountDue: number;
  totalDue: number;
  status: string;
  products: [];
};

export const customerDatas: CustomerDatas[] = [
  {
    id: 1,
    name: "Ramesh Sharma",
    phone: "9841012345",
    address: "Baneshwor, Kathmandu",
    date: "2025-08-01",
    paymentMethod: "Cash",
    totalPurchased: 12500,
    amountPaid: 10000,
    amountDue: 2500,
    totalDue: 2500,
    status: "Partial",
    products: [],
  },
  {
    id: 2,
    name: "Sunita Thapa",
    phone: "9802034567",
    address: "Lalitpur, Patan",
    date: "2025-08-03",
    paymentMethod: "UPI",
    totalPurchased: 8750,
    amountPaid: 8750,
    amountDue: 0,
    totalDue: 0,
    status: "Paid",
    products: [],
  },
  {
    id: 3,
    name: "Bikash Rai",
    phone: "9867045678",
    address: "Bhaktapur Durbar Sq.",
    date: "2025-08-05",
    paymentMethod: "Card",
    totalPurchased: 22000,
    amountPaid: 0,
    amountDue: 22000,
    totalDue: 22000,
    status: "Due",
    products: [],
  },
  {
    id: 4,
    name: "Puja Maharjan",
    phone: "9823056789",
    address: "Kirtipur, Kathmandu",
    date: "2025-08-07",
    paymentMethod: "Credit",
    totalPurchased: 5400,
    amountPaid: 5400,
    amountDue: 0,
    totalDue: 0,
    status: "Paid",
    products: [],
  },
  {
    id: 5,
    name: "Arjun Tamang",
    phone: "9851067890",
    address: "Budhanilkantha, Kathmandu",
    date: "2025-08-10",
    paymentMethod: "Cash",
    totalPurchased: 16800,
    amountPaid: 8000,
    amountDue: 8800,
    totalDue: 8800,
    status: "Partial",
    products: [],
  },
];
const today = () => new Date().toISOString().split("T")[0];

export const emptyBill = {
  name: "",
  phone: "",
  address: "",
  date: today(),
  paymentMethod: "Cash",
  sellingPrice: "",
  amountPaid: "",
  amountDue: "",
  totalPurchased: "",
  totalDue: "",
  products: [],
};

export const statusMeta = {
  Paid: { label: "Paid", cls: "status-paid" },
  Partial: { label: "Partial", cls: "status-partial" },
  Due: { label: "Due", cls: "status-due" },
};
