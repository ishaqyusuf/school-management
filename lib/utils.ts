 
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 import slugify from 'slugify'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function sluggify(...values) {
  return slugify(values.join(" "));
}
export function undot(items) {
  if (Array.isArray(items)) {
    return items;
  }

  let collection = {};

  Object.keys(items).forEach((key) => {
    if (key.indexOf('.') !== -1) {
      const obj = collection;

      key.split('.').reduce((acc, current, index, array) => {
        if (!acc[current]) {
          acc[current] = {};
        }

        if ((index === array.length - 1)) {
          acc[current] = items[key];
        }

        return acc[current];
      }, obj);

      collection = { ...collection, ...obj };
    } else {
      collection[key] = items[key];
    }
  });

  return collection
};
export function generateRandomString(length) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset.charAt(randomIndex);
  }

  return randomString;
}
export const formatCurrency = new Intl.NumberFormat("en-US", {
  // style: "currency",
  // currencySign: "I",
  // currency: "NGN", // Replace with your desired currency code
})
export function kFormatter(num) {
    const v = Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1) as any) + 'k' : Math.sign(num)*Math.abs(num)
    return `₦${v}`
}

export function convertNumber(strNum,from,to) {
   var ar = from.split('');
   var en = to.split('');
  




   const escapedDynamicPart = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  console.log(escapedDynamicPart)
  // Create a regex with the dynamic part
  const regex = new RegExp(escapedDynamicPart, 'g');
   strNum = strNum.replace(regex, x => en[ar.indexOf(x)]);
   strNum = strNum.replace(/[^\d]/g, '');
   return strNum;
} 
const ar = '٠١٢٣٤٥٦٧٨٩';
const en = '0123456789'
// export functio
export function toArabic(num)
{
 return convertNum(num,true)
}
export function convertNum(input,toArabic = false) {
  if(typeof input === 'number')
  input = input.toString()
  const splAr = ar.split('')
  const splEn = en.split('')
  const map  =convertListsToKeyValue(
    toArabic ? splEn : splAr,
    toArabic ? splAr : splEn
  )
  
const regex = new RegExp(
  toArabic ? /[0-9]/g : /[٠-٩]/g
)
  return input.replace(regex, match => map[match]);
}
export function toEnglish(num)
{
  return convertNum(num,false)
}function convertListsToKeyValue(keys, values) {
  const keyValuePairs = {};

  for (let i = 0; i < keys.length; i++) {
    if (i < values.length) {
      keyValuePairs[keys[i]] = values[i];
    } else {
      keyValuePairs[keys[i]] = null; // Or you can choose a default value for missing entries
    }
  }

  return keyValuePairs;
}
export function sum<T>(array: T[], key: keyof T | undefined = undefined) {
    return array
        .map(v => (!key ? v : v?.[key]))
        .map(v => (v ? Number(v) : null))
        .filter(v => (v as any) > 0 && !isNaN(v as any))
        .reduce((sum, val) => (sum || 0) + (val as number), 0);
}
export function termLink(params,link)
{
  if(!params)
  return ''
  const {sessionSlug,termSlug}= params
  
  return `/session/${sessionSlug}/term/${termSlug}/${link}`
}export function labelValue(label,value?,extras?)
{
  return {label,value,extras: extras || {}}
}