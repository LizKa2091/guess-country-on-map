export const checkCountry = (initialVal: string, inputedVal: string): boolean => {
   if (inputedVal.trim().toLowerCase() === initialVal.toLowerCase()) {
      return true;
   }

   return false;
}