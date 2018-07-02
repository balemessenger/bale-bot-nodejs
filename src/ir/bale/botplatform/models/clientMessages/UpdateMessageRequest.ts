//TODO make compatible with its parent.

// export class UpdateMessageRequest extends SendMessageRequest {


// private _updatedMessage: string;
//
// /**
//  * create UpdateMessageRequest class with peer user and updated Message content
//  * @param peer
//  * @param updatedMessage
//  */
// constructor(peer: User, updatedMessage: string) {
//     super(peer);
//     this._updatedMessage = updatedMessage;
// }
//
// /**
//  *
//  * @return {JsonObject}
//  */
// protected getJsonObject(): any {
//     let requestObj = super.getJsonObject();
//     requestObj.body.$type = "UpdateMessageContent";
//     requestObj.body.message = {};
//     requestObj.body.message.$type = "Text";
//     requestObj.body.message.text = this._updatedMessage;
//     return requestObj;
// }
//
// /**
//  * conver Json Object to string
//  * @return {string}
//  */
// toJson(): string {
//     return JSON.stringify(this.getJsonObject());
// }

// }