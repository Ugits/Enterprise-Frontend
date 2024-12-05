// import { ISpell } from '../_types/ISpell';
// import { IExternalAPIErrorResponse } from '../_types/IErrorResponse';
// import {SPELLIFY_API_URL} from '../variable.env'
// /**
//  * Fetches all spells from the external API.
//  * @returns Promise resolving to an array of SpellDTO
//  */
// export const fetchAllSpells = async (): Promise<ISpell[]> => {
  
//   const response = await fetch(SPELLIFY_API_URL, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       // Add any necessary headers here, e.g., Authorization
//     },
//   });

//   if (!response.ok) {
//     const errorData = (await response.json()) as IExternalAPIErrorResponse;
//     throw new Error(`Error ${errorData.statusCode}: ${errorData.message}`);
//   }

//   const data = (await response.json()) as ISpell[];
//   return data;
// };