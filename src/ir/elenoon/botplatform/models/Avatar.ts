import {Photo} from "./Photo";
/**
 * Created by amin on 3/2/17.
 */
export class Avatar {

    public smallImage: Photo;
    public largeImage: Photo;
    public fullImage: Photo;

    constructor(smallImage: Photo, largeImage: Photo, fullImage: Photo) {
        this.smallImage = smallImage;
        this.largeImage = largeImage;
        this.fullImage = fullImage;
    }
}