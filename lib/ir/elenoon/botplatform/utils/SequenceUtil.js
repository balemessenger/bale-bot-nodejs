"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by emran on 5/24/17.
 */
const fs = require('fs');
class SequenceUtil {
    static get SEQ_FILE_PATH() {
        return "./.BaleSeqNumber";
    }
    static getLastSeqNumber() {
        return new Promise((resolve, reject) => {
            fs.exists(SequenceUtil.SEQ_FILE_PATH, (exists) => {
                if (exists)
                    fs.readFile(SequenceUtil.SEQ_FILE_PATH, (err, data) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        var response = (data.toString()).replace("\n", "");
                        resolve(response);
                    });
                else {
                    fs.writeFile(SequenceUtil.SEQ_FILE_PATH, "0", {}, (err) => {
                        if (err)
                            reject(err);
                        else
                            resolve(0);
                    });
                }
            });
        });
    }
    static setLastSeqNumber(seqNum) {
        return new Promise((resolve, reject) => {
            fs.writeFile(SequenceUtil.SEQ_FILE_PATH, seqNum.toString(), {}, (err) => {
                if (err)
                    reject(err);
                else
                    resolve(seqNum.toString());
            });
        });
    }
}
exports.SequenceUtil = SequenceUtil;
//# sourceMappingURL=SequenceUtil.js.map