import * as React from 'react';
import '../index.css';
import './index.css';
import { person, bedSingle, bedDouble } from '../../../../../img/index';
import { IAssetAmenity, IBedAmenity } from '../../../../../models/asset/amenities';
import { AssetAmenityTypes, AssetAmenityBedTypes } from '../../../../../models/asset/amenityTypes';

export interface Props {
    amenities: Array<IAssetAmenity>;
}

export interface State {
    // empty
}

interface IRoomDetail {
    maximumBedOccupency: number;
    single: number;
    double: number;
    triple: number;
    quad: number;
}

class RoomAmenity extends React.Component<Props, State> {
    public static defaultProps: Partial<Props> = {
        amenities: []
    };

    getBedOccupancy = (amenity: IBedAmenity | any): number => {
        switch (amenity.type) {
            case AssetAmenityBedTypes.SINGLE:
            case AssetAmenityBedTypes.HAMAC:
            case AssetAmenityBedTypes.BUNKBED:
                return 1;
            case AssetAmenityBedTypes.DOUBLE:
            case AssetAmenityBedTypes.QUEEN:
            case AssetAmenityBedTypes.KING:
            case AssetAmenityBedTypes.TWIN:
            case AssetAmenityBedTypes.COUCH:
                return 2;
            case AssetAmenityBedTypes.TRIPLE:
                return 3;
            case AssetAmenityBedTypes.QUAD:
                return 4;
            case AssetAmenityBedTypes.NONE:
            default:
                return 0;
        }
    }

    extractDetail = (): IRoomDetail => {
        var beds: Array<IAssetAmenity> = this.props.amenities.filter(a => a.type === AssetAmenityTypes.BED);
        var roomDetail: IRoomDetail = {
            maximumBedOccupency: beds.map(a => this.getBedOccupancy(a.properties) * a.properties['number']).reduce((p, a) => p + a),
            single: beds.filter(a => this.getBedOccupancy(a.properties) === 1).map(a => this.getBedOccupancy(a.properties) * a.properties['number']).reduce((p, a) => p + a, 0),
            double: beds.filter(a => this.getBedOccupancy(a.properties) === 2).map(a => this.getBedOccupancy(a.properties) * a.properties['number']).reduce((p, a) => p + a, 0),
            triple: beds.filter(a => this.getBedOccupancy(a.properties) === 3).map(a => this.getBedOccupancy(a.properties) * a.properties['number']).reduce((p, a) => p + a, 0),
            quad: beds.filter(a => this.getBedOccupancy(a.properties) === 4).map(a => this.getBedOccupancy(a.properties) * a.properties['number']).reduce((p, a) => p + a, 0)
        };

        return roomDetail;
    }

    render() {
        var roomDetail: IRoomDetail = this.extractDetail();
        return (
            <div className='asset-room-amenity'>
                <div className='detail'>
                    <img src={person} />
                    <span>x {roomDetail.maximumBedOccupency}</span>
                </div>
                {roomDetail.single > 0 && <div className='detail'>
                    <img src={bedSingle} />
                    <span>x {roomDetail.single}</span>
                </div>}
                {roomDetail.double > 0 && <div className='detail'>
                    <img src={bedDouble} />
                    <span>x {roomDetail.double}</span>
                </div>}
                {roomDetail.triple > 0 && <div className='detail'>
                    <img src={bedDouble} /><img className='reverse merge-1' src={bedSingle} />
                    <span>x {roomDetail.triple}</span>
                </div>}
                {roomDetail.quad > 0 && <div className='detail'>
                    <img src={bedDouble} /><img className='reverse merge-2' src={bedDouble} />
                    <span>x {roomDetail.quad}</span>
                </div>}
            </div >
        );
    }
}

export default RoomAmenity;