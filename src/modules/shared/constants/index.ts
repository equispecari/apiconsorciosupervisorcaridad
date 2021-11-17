export enum RoleEnum {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  ADMINISTRADOR = 'ADMINISTRADOR',
  USER = 'USER',
}

export enum UserTypeEnum {
  NATURAL = 'NATURAL',
  JURIDICA = 'JURIDICA',
}

export enum StateEnum {
  PENDIENTE = 'PENDIENTE',
  DERIVAR = 'DERIVAR',
  OBSERVAR = 'OBSERVAR',
  MODIFICADO = 'MODIFICADO',
  RECHAZADO = 'RECHAZADO',
}

export enum ProviderEnum {
  DATABASE_CONNECTION = 'DATABASE_CONNECTION',
  TENANT_CONNECTION = 'TENANT_CONNECTION',
}

export enum SchemaEnum {
  SEDE = 'Increment',
  USER = 'User',
  AREA = 'Area',
  REQUEST = 'Request',
  DATA_REQUEST = 'DataRequest',
  RESET_PASS = 'ResetPasswordToken',
}
