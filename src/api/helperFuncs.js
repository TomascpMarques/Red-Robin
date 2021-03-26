import * as crypto from "crypto-js";

/**
 * @param {Object} parametro Variável de qualquer tipo, objeto, string, int, etc.
 * @returns Devolve a variável no formato esperado pelo query
 */
export function parseParametros(parametro) {
  switch (typeof parametro) {
    case "string":
      return "\"" + parametro + "\"";
    case "object":
      return JSON.stringify(parametro);

    default:
      return parametro;
  };
};

/**
 * @param {object} func Um objeto com dois parametros, um com o nome da func e outro com 1 array com os seus params
 * @returns Devolve o query feito apartir do objeto passado
 */
export function gerarAction(func) {
  var templateBase = "action:\n";
  // Adiciona o nome da func a chamar à action
  templateBase += "\"" + func.name + "\":\n";
  // Analisa e converte os parametros utilizados pelo query
  func.params.forEach(param => {
    templateBase += parseParametros(param) + ",\n";
  });

  return templateBase;
};

/**
 * @param {string} str Uma string a encriptar
 * @returns Uma string enciptada sem salt em MD5
 */
export function toMD5(str) {
  return crypto.MD5(str).toString();
};