import {Responder, BaleBot} from "../layers/implementation/BaleBot";
import {Message} from "../models/message/Message";
import {TextMessageSensitive} from "./sensitive/TextMessageSensitive";
import {User} from "../models/User";
import {Sensitive} from "./sensitive/Sensitive";
import {ReceivedMessage} from "../models/serverMessages/ReceivedMessage";
/**
 * A class to handle conversation concept in the platform.
 *
 */

export class Conversation {

    private tracer: Tracer;

    private startSensitive: Sensitive;

    private cancelSensitive: Sensitive;
    private cancelCallback: (message: Message, session: Session, responser: Responder, receivedMessage: ReceivedMessage) => void;

    private sessions: Array<Session>;

    public constructor() {
        this.sessions = [];
    }

    /**
     * Determines when to start the conversation.
     * @param sensitive
     * @return {Tracer}
     */
    public startsWith(sensitive: string[] | Sensitive): Tracer {
        this.startSensitive = Array.isArray(sensitive) ? new TextMessageSensitive(sensitive) : sensitive;
        return this.tracer = new Tracer();
    }

    /**
     * Determines when a conversation should stop. This is optional.
     * @example
     * conv.cancelsWith("bye")
     * @param sensitive
     * @param cancelCallback Gets called when a message leads the conversation to stop.
     */
    public cancelsWith(sensitive: string[] | Sensitive, cancelCallback?: (message: Message, session: Session, responser: Responder) => void): void {
        this.cancelSensitive = Array.isArray(sensitive) ? new TextMessageSensitive(sensitive) : sensitive;
        this.cancelCallback = cancelCallback;
    }

    /**
     * Determines whether the current conversation could be started due the given message.
     * @param message
     * @return {boolean} True if the given message matches with the conversation startSensitive. Note that it returns false if the conversation has already been started no matter the message matches or not.
     */
    public canStart(message: Message, sender: User): boolean {
        if (this.startSensitive.match(message) && !this.isActive(sender))
            return true;
        else
            return false;
    }

    public handleMessage(bot: BaleBot, message: Message, sender: User, receivedMessage: ReceivedMessage): void {
        if (!this.sessions[sender.id])
            this.sessions[sender.id] = new Session(this.tracer);

        let responser = new Responder(bot, sender);

        let session: Session = this.sessions[sender.id];

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
    public isActive(peer: User): boolean {
        if (!this.sessions[peer.id])
            return false;
        return this.sessions[peer.id].currentState != Session.PRE_START_STATE;
    }
}

export class Tracer {
    private _callbacks: Array<(message: Message, session: Session, responser: Responder, receivedMessage: ReceivedMessage) => void>;
    private callbacksCounter: number;

    public constructor() {
        this._callbacks = [];
        this.callbacksCounter = 0;
    }

    public then(callback: (message: Message, session: Session, responser: Responder, receivedMessage: ReceivedMessage) => void): Tracer {

        this._callbacks[this.callbacksCounter] = callback;
        this.callbacksCounter++;

        return this;
    }

    get callbacks(): Array<(message: Message, session: Session, responser: Responder, receivedMessage: ReceivedMessage) => void> {
        return this._callbacks;
    }

    get callbacksNum(): number {
        return this.callbacksCounter;
    }
}

export class Session {
    public static get PRE_START_STATE(): number {
        return -1;
    }

    private _currentState: number = Session.PRE_START_STATE;
    private tracer: Tracer;
    private storage: any;

    public constructor(tracer: Tracer) {
        this.tracer = tracer;
        this.storage = {};
    }

    /**
     * Puts a custom key-value pair to the session. It's useful when a data should transfer between states.
     * Note that the session memory will be cleared when session resets or arrives the end of states.
     * @param key
     * @param value
     */
    public putToSessionMemory(key: any, value: any): void {
        this.storage[key] = value;
    }

    /**
     * Returns the corresponding value of the given key.
     * @param key
     * @return {any}
     */
    public getFromSessionMemory(key: any): any {
        return this.storage[key];
    }

    get currentState(): number {
        return this._currentState;
    }

    /**
     * Goes to the next state. If reached over the last state, resets.
     */
    public next(): void {
        this._currentState++;

        //Check if the session state is over, then finish out the session.
        if (this.currentState >= this.tracer.callbacksNum)
            this.reset();
    }

    /**
     * Resets the session to the first state.
     * Also removes the session memory.
     */
    public reset(): void {
        this._currentState = Session.PRE_START_STATE;
        this.storage = {};
    }
}