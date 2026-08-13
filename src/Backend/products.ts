type Variant = {
    bucket_size: number;
    rate: number;
    tax_bucket: number;
    scheme: number;
    after_scheme: number;
    after_trade: number;
    net_value: number;
    vat: number;
    with_vat: number;
    sales: number;
    mp: number;
}

type Base = {
    name: string;
    stocks: number[]; // index matches variants array
}

type Product = {
    id: string;
    name: string;
    images: string;
    variants: Variant[];
    bases: Base[];
}

type Products = Product[];