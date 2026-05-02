import { Application } from "../domain/Application";
import { ApplicationId } from "../domain/ApplicationId";
import { ApplicationMessage } from "../domain/ApplicationMessage";
import { ApplicationState } from "../domain/ApplicationState";

import { PetId } from "../../Pet/domain/PetId";
import { AuthId } from "../../Auth/domain/AuthId";
import { RefugioId } from "../../Refugio/domain/RefugioId";

export class ApplicationMapper {

  // 🔥 mapa interno (DB <-> dominio)
  private static STATE_TO_ID = {
    disponible: 1,
    adoptado: 2,
  } as const;

  private static ID_TO_STATE = {
    1: "disponible",
    2: "adoptado",
  } as const;

  // =========================
  // DOMAIN → DB
  // =========================
  static toPersistence(application: Application) {
    const primitive = application.toPrimitives();

    return {
      id_solicitud: primitive.id,
      mensaje_postulacion: primitive.mensaje,

      fecha_solicitud: primitive.createdAt,
      fecha_actualizacion: primitive.updatedAt,

      id_mascota: primitive.mascotaId,
      auth_id: primitive.authId,
      id_refugio: primitive.refugioId,

      // 🔥 aquí resolvemos el estado
      id_estado_adopcion: this.STATE_TO_ID[
        primitive.state as keyof typeof this.STATE_TO_ID
      ],
    };
  }

  // =========================
  // DB → DOMAIN
  // =========================
  static toDomain(raw: any): Application {
    const stateString = this.ID_TO_STATE[
      raw.id_estado_adopcion as 1 | 2
    ];

    if (!stateString) {
      throw new Error(`Estado inválido desde DB: ${raw.id_estado_adopcion}`);
    }

    return new Application(
      new ApplicationId(raw.id_solicitud),
      new PetId(raw.id_mascota),
      new AuthId(raw.auth_id),
      new RefugioId(raw.id_refugio),
      new ApplicationMessage(raw.mensaje_postulacion),
      new ApplicationState(stateString),
      new Date(raw.fecha_solicitud),
      raw.fecha_actualizacion
        ? new Date(raw.fecha_actualizacion)
        : new Date(raw.fecha_solicitud)
    );
  }
}