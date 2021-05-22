import moment from 'moment';
import 'moment/locale/fr';

import { AppThunk } from '../store';
import { serverPort } from './constants';

// --------------------------------------------------------//
// ----------------------- ENV ----------------------------//
// --------------------------------------------------------//
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-unused-expressions */


// --------------------------------------------------------------------//
// ----------------------- Parsers/Formatter --------------------------//
// --------------------------------------------------------------------//
// to capitalize only first letter
export const capitalizeFirstLetter = (string: string): string => {
  if (!string || typeof string !== 'string' || (string && string.trim().length === 0)) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * boolean to string
 * @param booleanValue
 * @returns {string}
 */
export const booleanFormatter = (booleanValue: boolean): string => booleanValue ? 'true' : 'false';

/**
 * string to boolean
 * @param value
 * @returns {boolean}
 */
export const toBoolean = (value: any) => typeof value === 'boolean' ? value : value === 'true';

export const toDate = (momentOrDateOrString: any) => {
  if (momentOrDateOrString == null) {
    return undefined;
  } if (typeof momentOrDateOrString === 'string') {
    let [year, month, day]: any = momentOrDateOrString.split('-');
    if (momentOrDateOrString.includes('/')) {
      // french date DD/MM/YY
      [day, month, year] = momentOrDateOrString.split('/');
    }
    return new Date(year, month - 1, day);
  } if (moment.isMoment(momentOrDateOrString)) {
    return momentOrDateOrString.toDate();
  } 
  return momentOrDateOrString;
	
};
export const toMoment = (momentOrDateOrString?: any) => {
  if (momentOrDateOrString == null) {
    return moment();
  } if (moment.isMoment(momentOrDateOrString)) {
    // ---- moment ----//
    return momentOrDateOrString;
  } if (typeof momentOrDateOrString === 'string') {
    // ---- string ----//
    return moment(momentOrDateOrString, 'YYYY-MM-DD');
  } 
  // ---- date ----//
  return moment(momentOrDateOrString);
	
};

export const getDayName = (dateOrString: any, capitalized = true) => {
  const date = toDate(dateOrString);
  let day = moment(date).format('dddd');
  capitalized && (day = capitalizeFirstLetter(day));
  return day;
};

export const getMonthName = (dateOrString: any, capitalized = true) => {
  const date = toDate(dateOrString);
  let month = moment(date).format('MMMM');
  capitalized && (month = capitalizeFirstLetter(month));
  return month;
};

export const formatDate = (dateOrString: any, withDayName = true, withYear = true) => {
  if (!dateOrString) {
    return '';
  }
  const date = toDate(dateOrString);

  const dayAndMonth = `${date.getDate() + (date.getDate() === 1 ? 'er' : '')  } ${  getMonthName(date, false)}`;

  // ---- parts construction ----//
  const parts = [];
  withDayName && parts.push(getDayName(date));
  parts.push(dayAndMonth);
  withYear && parts.push(date.getFullYear());

  return parts.join(' ');
};

export const toIndexFormatString = (momentOrDateOrString: any) => toMoment(momentOrDateOrString).format('YYYYMMDD');
export const toDateFormatString = (momentOrDateOrString: any) => toMoment(momentOrDateOrString).format('YYYY-MM-DD');
export function getLast3Month() {
  const last3Month = toMoment().subtract(3, 'month');
  return toDateFormatString(last3Month);
}


export const toShortDateString = (momentOrDateOrString: any, fullYear = false) => {
  const format = fullYear ? 'DD/MM/YYYY' : 'DD/MM/YY';
  return toMoment(momentOrDateOrString).format(format);
};
export const toFrDateString = (momentOrDateOrString: any, withSlash = false) => {
  const strFormat = withSlash ? 'DD/MM/YYYY' : 'DD MMMM YYYY';
  return toMoment(momentOrDateOrString).format(strFormat);
};
export const toFrDateTimeString = (momentOrDateOrString: any, withDoubleDots = true, withPreposition = false) => {
  let dateTimeStr = toMoment(momentOrDateOrString).format('DD/MM/YY - HH:mm');
  if (!withDoubleDots) {
    dateTimeStr = dateTimeStr.replace(':', 'h');
  }
  if (withPreposition) {
    dateTimeStr = dateTimeStr.replace('-', 'à');
  }
  return dateTimeStr;
};
export const toLongDateString = (momentOrDateOrString: any) => toMoment(momentOrDateOrString).format('dddd DD MMMM YYYY');
export const toTimeString = (momentOrDateOrString: any) => toMoment(momentOrDateOrString).format('HH:mm');

/**
 * to check if the selected date is less then limit date
 * @param {date | String} date
 * @param {date | String} [limitDate]
 */
export const isOutOfDate = (date: any, limitDate: any) => {
  if (!date) return false;
  return toDateFormatString(date) < toDateFormatString(limitDate);
};

export const randomString = () => Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6);
// --------------------------------------------------------------------//
// ------------------------- normalization ----------------------------//
// --------------------------------------------------------------------//
/**
 * to int number
 * @param value
 * @returns {number}
 */
export const toInt = (value: any) => value ? parseInt(value, 10) : 0;

export const normalizeTo3Digits = (value: any): any => {
  if (!value) return null;
  const onlyNums = value.replace(/[^\d]/g, '');
  // max 3 numbers
  if (onlyNums.length <= 3) {
    return toInt(onlyNums);
  }
  const newVal = onlyNums.slice(0, 3);
  return normalizeTo3Digits(newVal);
};

/**
 * convert string to number
 * @param {string | number} value
 * @returns {number}
 */
export const toNumber = (value: any) => {
  if (!value) {
    return 0;
  } 
  if (typeof value === 'number') return value;
	
  const onlyNums = value.replace(/[^\d]/g, '');
  return toInt(onlyNums);
};

/**
 * to decimal number
 * @param value
 * @param [afterComma]
 * @returns {number}
 */
export const toDecimal = (value: any, afterComma = 2): any => {
  if ((!value && value !== 0) || value === 0 || value === '0.0' || value === 0.0) {
    return 0;
  }	
  if (typeof value === 'number') return parseFloat(value.toFixed(afterComma));
	
  // replace ',' to '.'
  const str = value.includes(',') ? value.replace(',', '.') : value;
  const res = parseFloat(str);
  if (!isNaN(res)) {
    return toDecimal(res, afterComma); // to get a good format decimal
  }
  return 0;
};

/**
 * normalize input type number
 * @param {*} value 
 */
export function normalizeNumber(value: any){
  const number  =  parseInt(value, 10);
  if (isNaN(number) || number < 1){
    return 0;
  }
  return number;
}

/**
 * format input type number
 * @param {*} value 
 */
export function formatNumber(value: any){
  const number  =  parseInt(value, 10);
  if (isNaN(number) || number < 1){
    return '0';
  }
  return number;
}

/**
 * get french format for decimal
 * @param price
 * @param currency
 * @returns {string} like 78,90
 */
export function toFrFormatStrWithComma(price: any, currency = '€') {
  if (!price) return '';
  const priceStr = typeof price === 'number' ? price.toFixed(2) : price;
  const parts = priceStr.split('.');
  if (parts.length > 1) {

    const partsOne = parts[1] === '00' ? '' : parts[1];
    // add '0' at the end if one digit into centime
    const formattedPartsOne = partsOne.length === 1 ? `${partsOne  }0` : partsOne;
    return `${parts[0] + (formattedPartsOne.length ? ',' : '') + formattedPartsOne  } ${  currency}`;
  } 
  return `${price  } ${  currency}`;
	
}

/**
 * check if it's null ( 0, '', null, undefined, {}, [] )
 * @param item
 * @returns {boolean}
 */
export function isNull(item: any): any {
  // NOTE : typeof null = 'object', typeof undefined = 'undefined'
  // see Loose Equality Comparisons With == at ( https://www.sitepoint.com/javascript-truthy-falsy )
  const typeOfValue = typeof item;
  switch (typeOfValue) {
  case 'string':
    return item.trim() === '';
  case 'object':
    return Object.is(item, null) || Object.values(item).every(val => isNull(val));
  case 'number':
    return !item;
  default:
    return item == null;
  }
}

/**
 * remove empty value
 * @param object
 * @returns {*}
 */
/* eslint-disable no-continue */
export function removeEmptyValues(object: any) {
  if (!object) return null;
  for (const key in object) {
    if (!object.hasOwnProperty(key)) {
      continue;
    }
    const value = object[key];
    if (isNull(value)) {
      delete object[key];
    }
  }
  return object;
}

// --------------------------------------------------------------------//
// ----------------------------- Misc ---------------------------------//
// --------------------------------------------------------------------//
export function sort(array: any[], keySupplier: any): any {
  array.sort((item1, item2) => {
    const item1Key = keySupplier(item1);
    const item2Key = keySupplier(item2);
    if (item1Key < item2Key) return -1;
    if (item1Key > item2Key) return 1;
    return 0;
  });
  return array;
}

export function sortDesc(array: any[], keySupplier = (val: any) => val) {
  array.sort((item1, item2) => {
    const item1Key = keySupplier(item1);
    const item2Key = keySupplier(item2);
    return item2Key - item1Key;
  });
  return array;
}

export const first = (array: any[]) => (array && array.length) ? array[0] : null;

export function removeIndex(array: any[], index: number) {
  array.splice(index, 1);
}

export function remove(array: any[], itemOrFunction: any) {
  let i;
  if (typeof itemOrFunction === 'function') {
    i = array.findIndex(itemOrFunction);
  } else {
    i = array.indexOf(itemOrFunction);
  }
  if (i !== -1) {
    removeIndex(array, i);
    return true;
  }
  return false;
}

export function insert(array: any[], index: number, item: any) {
  array.splice(index, 0, item);
}

export const clone = (instance: any) => Object.assign(Object.create(instance), instance);

/**
 * @param object
 * @param {array|Set} names
 * @returns {*}
 */
export const filter = (object: any, names: any) => Object.keys(object)
  .filter((key: any) => names.has ? names.has(key) : names.includes(key))
  .reduce((obj: any, key) => {
    obj[key] = object[key];
    return obj;
  }, {});

/**
 * other functions at http://2ality.com/2014/10/es6-promises-api.html
 * @param ms
 * @returns {Promise}
 */
export const delay = (ms: any) => new Promise(resolve => {
  setTimeout(resolve, ms);
});

// to capitalize all first letter of each word
export function capitalizeCase(string: string) {
  if (!string) {
    return '';
  }
  string = string.trim(); // important
  if (!string.length) {
    return '';
  }
  return string.toLowerCase().split(' ').map(word =>
    word[0].toUpperCase() + word.substr(1),
  ).join(' ');
}
// to uppercase
export function uppercase(str: any) {
  if (!str || typeof str !== 'string') return '';
  return str.toUpperCase();
}
// to lowercase
export function lowercase(str: any) {
  if (!str || typeof str !== 'string') return '';
  return str.toLowerCase();
}

export function isIncluded(itemOrStr: any, text: string) {
  if (!itemOrStr || !text) return false;
  return itemOrStr.toString().toLowerCase().includes(text.toLowerCase());
}

export function getKeyValue(object: any, value: any) {
  if (!object) return value;
  let keyValue = value;
  Object.keys(object).forEach(key => {
    if (object[key].toLowerCase() === value.toLowerCase()) {
      keyValue = key;
    }
  });
  return keyValue;
}

export function shallowEquals(a: any, b: any) {
  for (const i in a) if (!(i in b)) return false;
  for (const i in b) if (a[i] !== b[i]) return false;
  return true;
}

/**
 * check if text is empty or null
 * @param string
 * @returns {boolean}
 */
export function isTextEmpty(string: any) {
  if (string) {
    string = string.trim();
    return !string.length;
  } 
  return true;
	
}
// --------------------------------------------//
// ------------------- Forms ------------------//
// --------------------------------------------//

// ----- email validation -----//
export const regexEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
export const isValidEmail = (email: string) => email.match(regexEmail);
