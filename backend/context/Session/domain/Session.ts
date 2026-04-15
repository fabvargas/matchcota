import { SessionCreatedAt } from "./SessionCreatedAt";
import { SessionExpireAt } from "./SessionExpireAt";
import { SessionId } from "./SessionId";
import { SessionToken } from "./SessionToken";
import { SessionUserId } from "./SessionUserId";


export class Session{

    private constructor(
        private readonly id:SessionId,
        private readonly authId:SessionUserId,
        private readonly createdAt:SessionCreatedAt,
        private readonly expireAt:SessionExpireAt,
        private readonly token:SessionToken
    ){}

    static create(
        userId:SessionUserId,
        expireAt:SessionExpireAt,
    ): Session {
        const id = SessionId.create();
        const token = SessionToken.create();
        const createdAt = SessionCreatedAt.create();
        return new Session(id, userId, createdAt, expireAt, token);
    }

    toPrimitives() {
        return {
            id: this.id.getValue(),
            authId: this.authId.getValue(),
            createdAt: this.createdAt.getValue(),
            expireAt: this.expireAt.getValue(),
            token: this.token.getValue()
        }
    }

    static fromPrimitives(primitives: {
        id: string,
        authId: string,
        createdAt: Date,
        expireAt: Date,
        token: string
    }): Session {
        return new Session(
            new SessionId(primitives.id),
            new SessionUserId(primitives.authId),
            new SessionCreatedAt(primitives.createdAt),
            new SessionExpireAt(primitives.expireAt),
            new SessionToken(primitives.token)
        )
    }

    getToken(): SessionToken {
        return this.token;
    }

   

}