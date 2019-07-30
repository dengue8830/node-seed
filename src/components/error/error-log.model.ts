import { DataTypes, Model } from 'sequelize';
import config from '../../common/config';
import sequelize from '../../common/connection';

export interface IErrorLogAttrs {
  /**
   * Human-readable-id. The main goal is identify the error that user has reported,
   * with screenshot usually.
   */
  code?: string;
  userId?: string;
  stacktrace?: string;
  // When an inconsistent state has produced in the app and it has to terminate itself.
  isFatal?: boolean;
  // The message of new Error('xxx')
  message?: string;
  // Any useful data that helps to resolve the issue. Usually some state related stuff.
  extra?: string;
  // Eg Android API 26
  APIlevel?: number;
  /**
   * Round up before set
   * https://github.com/rebeccahughes/react-native-device-info#getbatterylevel
   */
  batteryLevel?: number;
  brand?: string;
  /**
   * Parse to string before because on ios is string and on android a number
   * https://github.com/rebeccahughes/react-native-device-info#getbuildnumber
   */
  buildNumber?: string;
  carrier?: string;
  // Eg ar
  countryCode?: string;
  deviceId?: string;
  language?: string;
  // Refeer to the app
  installDate?: Date;
  // Refeer to the app
  updateDate?: Date;
  manufacturer?: string;
  maxMemory?: number;
  model?: string;
  // https://github.com/rebeccahughes/react-native-device-info#getreadableversion
  readableVersion?: string;
  os?: string;
  osVersion?: string;
  // https://github.com/rebeccahughes/react-native-device-info#gettimezone
  timezone?: string;
  // https://github.com/rebeccahughes/react-native-device-info#getversion
  appVersion?: string;
  is24hs?: boolean;
  isEmulador?: boolean;
  isTablet?: boolean;
}

export class ErrorLog extends Model implements IErrorLogAttrs {
  userId?: string;
}

ErrorLog.init(
  {
    id: config.getPkDefinition(),
    codige: { type: DataTypes.STRING(50) },
    userId: { type: DataTypes.STRING },
    stacktrace: { type: DataTypes.TEXT },
    message: { type: DataTypes.TEXT },
    extra: { type: DataTypes.TEXT },
    isFatal: { type: DataTypes.BOOLEAN },
    APIlevel: { type: DataTypes.INTEGER },
    batteryLevel: { type: DataTypes.FLOAT({ length: 3, decimals: 2 }) },
    brand: { type: DataTypes.STRING(100) },
    buildNumber: { type: DataTypes.STRING(10) },
    carrier: { type: DataTypes.STRING(50) },
    countryCode: { type: DataTypes.STRING(50) },
    deviceId: { type: DataTypes.STRING(50) },
    language: { type: DataTypes.STRING(50) },
    // Los mills tienen longitud 13 por si las porsias pongo 15
    installDate: { type: DataTypes.DATE },
    updateDate: { type: DataTypes.DATE },
    manufacturer: { type: DataTypes.STRING(100) },
    maxMemory: { type: DataTypes.INTEGER },
    model: { type: DataTypes.STRING(100) },
    readableVersion: { type: DataTypes.STRING(30) },
    os: { type: DataTypes.STRING(30) },
    osVersion: { type: DataTypes.STRING(30) },
    timezone: { type: DataTypes.STRING(100) },
    appVersion: { type: DataTypes.STRING(30) },
    is24hs: { type: DataTypes.BOOLEAN },
    isEmulador: { type: DataTypes.BOOLEAN },
    isTablet: { type: DataTypes.BOOLEAN }
  },
  { sequelize, paranoid: false, timestamps: true, tableName: 'errorLog' }
);