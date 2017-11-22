import {Location} from './location';
export class Shop{
    id: string;
    picture: string;
    name: string;
    email: string;
    city: string;
    location: Location= new Location();
}