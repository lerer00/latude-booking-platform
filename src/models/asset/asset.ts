import { AssetTypes } from './types';
import { IAssetAmenity } from './amenities';

export interface IAsset {
    id: string;
    type: AssetTypes;
    name: string;
    description: string;
    active: boolean;
    parent: string;
    staysMap: any;
    stays: Array<any>;
    amenities: Array<IAssetAmenity>;
    price: number;
    currency: string;
}