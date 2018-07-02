/**
 * Created by amin on 3/2/17.
 */
export class FileLocation {
    public fileId: string;
    public accessHash: string;
    public fileStorageVersion: number;

    constructor(fileId: string, accessHash: string, fileStorageVersion: number) {
        this.fileId = fileId;
        this.accessHash = accessHash;
        this.fileStorageVersion = fileStorageVersion;
    }
}