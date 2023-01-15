export type Cuenta = {
   idCuenta: number;
   nombre: string;
   correo: string;
   passw?: string;
};

export type Perfil = {
   idPerfil?: number;
   idCuenta?: number;
   tipo: "super" | "admin" | "usuario" | "consulta";
};

export type Proyecto = {
   idProyecto?: number;
   nombre?: string;
   fechaInicio?: Date;
   fechaFin?: Date | null;
};

export type Recurso = {
   idRecurso?: number;
   idProyecto?: number;
   idPerfil?: number;
};

export type Tarea = {
   idTarea?: number;
   descripcion?: string;
   fechaInicio?: Date;
   fechaFin?: Date | null;
   estatus: "To Do" | "Doing" | "Done";
};

export type Actividad = {
   idActividad?: number;
   objetivo: string;
   idRecurso?: number;
   idTarea?: number;
};

export type Session = {
   token: boolean,
   url: string
}