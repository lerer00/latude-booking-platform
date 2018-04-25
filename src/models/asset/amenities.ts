import { AssetAmenityBedTypes, AssetAmenityTypes, AssetAmenityMeetingRoomSetupsTypes } from './amenityTypes';

export interface IAssetAmenity {
    type: AssetAmenityTypes;
    properties: IBedAmenity | IMeetingRoomAmenity;
}

export interface IBedAmenity {
    type: AssetAmenityBedTypes;
    number: number;
}

export interface IMeetingRoomAmenity {
    type: AssetAmenityMeetingRoomSetupsTypes;
    width: number;
    length: number;
}