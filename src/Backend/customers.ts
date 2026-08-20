// For to map out database scheme only
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