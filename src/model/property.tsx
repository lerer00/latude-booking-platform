import ILocation from './location';

export default interface IProperty {
    id: string;
    active: boolean;
    location: ILocation;
    name: string;
    description: string;
    rating: number;
    comments: Array<any>;
    parent: string;
}