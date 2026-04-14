// Asegúrate de importar el authUser correctamente

import { Session } from "../domain/Session";
import { SessionUserId } from "../domain/SessionUserId";
import { SessionExpireAt } from "../domain/SessionExpireAt";

export class SaveSessionUseCase {

    constructor(
       
    ){}

    async execute(authId: string): Promise<Session> {

        const session = Session.create(
         new SessionUserId(authId),
         SessionExpireAt.createExpireAtOneDay()
        );

        // await sessionRepository.save(session);

        return session;
        
    }

}