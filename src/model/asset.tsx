export default interface IAsset {
    id: string;
    name: string;
    description: string;
    active: boolean;
    parent: string;
    staysMap: any;
    stays: Array<any>;
    price: number;
    currency: string;
}