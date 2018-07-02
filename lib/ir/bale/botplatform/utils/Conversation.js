"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaleBot_1 = require("../layers/implementation/BaleBot");
const TextMessageSensitive_1 = require("./sensitive/TextMessageSensitive");
/**
 * A class to handle conversation concept in the platform.
 *
 */
class Conversation {
    constructor() {
        this.sessions = [];
    }
    /**
     * Determines when to start the conversation.
     * @param sensitive
     * @return {Tracer}
     */
    startsWith(sensitive) {
        this.startSensitive = Array.isArray(sensitive) ? new TextMessageSensitive_1.TextMessageSensitive(sensitive) : sensitive;
        return this.tracer = new Tracer();
    }
    /**
     * Determines when a conversation should stop. This is optional.
     * @example
     * conv.cancelsWith("bye")
     * @param sensitive
     * @param cancelCallback Gets called when a message leads the conversation to stop.
     */
    cancelsWith(sensitive, cancelCallback) {
        this.cancelSensitive = Array.isArray(sensitive) ? new TextMessageSensitive_1.TextMessageSensitive(sensitive) : sensitive;
        this.cancelCallback = cancelCallback;
    }
    /**
     * Determines whether the current conversation could be started due the given message.
     * @param message
     * @return {boolean} True if the given message matches with the conversation startSensitive. Note that it returns false if the conversation has already been started no matter the message matches or not.
     */
    canStart(message, sender) {
        if (this.startSensitive.match(message) && !this.isActive(sender))
            return true;
        else
            return false;
    }
    handleMessage(bot, message, sender, receivedMessage) {
        if (!this.sessions[sender.id])
            this.sessions[sender.id] = new Session(this.tracer);
        let responser = new BaleBot_1.Responder(bot, sender);
        let session = this.sessions[sender.id];
        if (this.cancelSensitive != null && this.cancelSensitive.match(message)) {
            if (this.cancelCallback != null)
                this.cancelCallback(message, session, responser, receivedMessage);
            session.reset();
            return;
        }
        if (session.currentState === Session.PRE_START_STATE) {
            //So it's the initial message
            //Go to state 0
            session.next();
        }
        this.tracer.callbacks[session.currentState](message, session, responser, receivedMessage);
    }
    /**
     * Determines if the conversation has started and is not finished its states yet.
     * @receiver The receiver user is needed to because the state of the conversation depends on the receiver user.
     * @return {boolean}
     */
    isActive(peer) {
        if (!this.sessions[peer.id])
            return false;
        return this.sessions[peer.id].currentState != Session.PRE_START_STATE;
    }
}
exports.Conversation = Conversation;
class Tracer {
    constructor() {
        this._callbacks = [];
        this.callbacksCounter = 0;
    }
    then(callback) {
        this._callbacks[this.callbacksCounter] = callback;
        this.callbacksCounter++;
        return this;
    }
    get callbacks() {
        return this._callbacks;
    }
    get callbacksNum() {
        return this.callbacksCounter;
    }
}
exports.Tracer = Tracer;
class Session {
    constructor(tracer) {
        this._currentState = Session.PRE_START_STATE;
        this.tracer = tracer;
        this.storage = {};
    }
    static get PRE_START_STATE() {
        return -1;
    }
    /**
     * Puts a custom key-value pair to the session. It's useful when a data should transfer between states.
     * Note that the session memory will be cleared when session resets or arrives the end of states.
     * @param key
     * @param value
     */
    putToSessionMemory(key, value) {
        this.storage[key] = value;
    }
    /**
     * Returns the corresponding value of the given key.
     * @param key
     * @return {any}
     */
    getFromSessionMemory(key) {
        return this.storage[key];
    }
    get currentState() {
        return this._currentState;
    }
    /**
     * Goes to the next state. If reached over the last state, resets.
     */
    next() {
        this._currentState++;
        //Check if the session state is over, then finish out the session.
        if (this.currentState >= this.tracer.callbacksNum)
            this.reset();
    }
    /**
     * Resets the session to the first state.
     * Also removes the session memory.
     */
    reset() {
        this._currentState = Session.PRE_START_STATE;
        this.storage = {};
    }
}
exports.Session = Session;
//# sourceMappingURL=Conversation.js.map