import { Shop } from '../../shops/models/shop';

export class User {
    id: string;
    email: string;
    password: string;
    preferredShops: Shop[]= [];
}
