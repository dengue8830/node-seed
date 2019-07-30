import { DataTypes, Model } from 'sequelize';
import config from '../../common/config';
import sequelize from '../../common/connection';

export interface IErrorLogAttrs {
  // Es el codigo del error que asigna la app. Es para poder identificarlo facilmente
  // cuando reporten un error con captura de pantalla
  codigo?: string;
  usuarioId?: string;
  stacktrace?: string;
  // Fatal si produjo un estado inconsistente y la app se tuvo que cerrar
  isFatal?: boolean;
  // String que se coloca al hacer new Error('xxx')
  mensaje?: string;
  // Cualquier dato que sea util, por lo general algo representando el estado en el que se produjo el error
  extra?: string;
  // Datos extras que pueden ser utiles para resolver un problema
  nivelAPI?: number;
  // redondear antes de setear
  // https://github.com/rebeccahughes/react-native-device-info#getbatterylevel
  nivelBateria?: number;
  marca?: string;
  // parsear a string porque en ios es string y en android number  https://github.com/rebeccahughes/react-native-device-info#getbuildnumber
  buildNumber?: string;
  operadora?: string;
  codigoPais?: string;
  deviceId?: string;
  idioma?: string;
  fechaInstalacion?: Date;
  // ip necesita permiso de wifistate
  fechaActualizacion?: Date;
  fabricante?: string;
  memoriaMaxima?: number;
  modelo?: string;
  // https://github.com/rebeccahughes/react-native-device-info#getreadableversion
  versionLegible?: string;
  sistemaOperativo?: string;
  versionSistemaOperativo?: string;
  // https://github.com/rebeccahughes/react-native-device-info#gettimezone
  zonaHoraria?: string;
  // https://github.com/rebeccahughes/react-native-device-info#getversion
  versionAplicacion?: string;
  is24hs?: boolean;
  isEmulador?: boolean;
  isTablet?: boolean;
}

export class ErrorLog extends Model implements IErrorLogAttrs {
  usuarioId?: string;
}

ErrorLog.init(
  {
    id: config.getPkDefinition(),
    codigo: { type: DataTypes.STRING(50) },
    usuarioId: { type: DataTypes.STRING },
    stacktrace: { type: DataTypes.TEXT },
    mensaje: { type: DataTypes.TEXT },
    extra: { type: DataTypes.TEXT },
    isFatal: { type: DataTypes.BOOLEAN },
    nivelAPI: { type: DataTypes.INTEGER },
    nivelBateria: { type: DataTypes.FLOAT({ length: 3, decimals: 2 }) },
    marca: { type: DataTypes.STRING(100) },
    buildNumber: { type: DataTypes.STRING(10) },
    operadora: { type: DataTypes.STRING(50) },
    codigoPais: { type: DataTypes.STRING(50) },
    deviceId: { type: DataTypes.STRING(50) },
    idioma: { type: DataTypes.STRING(50) },
    // Los mills tienen longitud 13 por si las porsias pongo 15
    fechaInstalacion: { type: DataTypes.DATE },
    fechaActualizacion: { type: DataTypes.DATE },
    fabricante: { type: DataTypes.STRING(100) },
    memoriaMaxima: { type: DataTypes.INTEGER },
    modelo: { type: DataTypes.STRING(100) },
    versionLegible: { type: DataTypes.STRING(30) },
    sistemaOperativo: { type: DataTypes.STRING(30) },
    versionSistemaOperativo: { type: DataTypes.STRING(30) },
    zonaHoraria: { type: DataTypes.STRING(100) },
    versionAplicacion: { type: DataTypes.STRING(30) },
    is24hs: { type: DataTypes.BOOLEAN },
    isEmulador: { type: DataTypes.BOOLEAN },
    isTablet: { type: DataTypes.BOOLEAN }
  },
  { sequelize, paranoid: false, timestamps: true, tableName: 'errorLog' }
);