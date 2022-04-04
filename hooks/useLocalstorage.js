import { useState, useEffect } from "react";
// import { useImmer } from "use-immer";
// import throttle from "lodash.throttle";

function get(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (e) {
    console.error(e.message);
    return null;
  }
}

function set(key, value) {
  try {
    if (value === null || value === undefined)
      window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e.message);
    return null;
  }
}

export default function useLocalstorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const savedValue = get(key);
    if (savedValue) return savedValue;
    if (typeof initialValue === "function") return initialValue();
    return initialValue;
  });

  function setWithLocalstorage(newValue) {
    setValue(newValue);
    set(key, newValue);
  }

  return [value, setWithLocalstorage];
}

// export default function useLocalstorage(key, initialValue) {
//   console.log({ key, initialValue });
//   function initialFunction() {
//     return typeof initialValue === "function" ? initalValue() : initialValue;
//   }
//   const [storedValue, setStoredValue] = useState(() => {
//     if (typeof window === "undefined") {
//       return initialFunction();
//     }
//     try {
//       const item = window.localStorage.getItem(key);
//       return item ? JSON.parse(item) : initialFunction();
//     } catch (error) {
//       console.error(error.message);
//       return initialFunction();
//     }
//   });
//   // Return a wrapped version of useState's setter function that ...
//   // ... persists the new value to localStorage.
//   const setValue = (value) => {
//     try {
//       // Allow value to be a function so we have same API as useState
//       const valueToStore =
//         value instanceof Function ? value(storedValue) : value;
//       // Save state
//       setStoredValue(valueToStore);
//       // Save to local storage
//       if (typeof window !== "undefined") {
//         window.localStorage.setItem(key, JSON.stringify(valueToStore));
//       }
//     } catch (error) {
//       // A more advanced implementation would handle the error case
//       console.log(error);
//     }
//   };
//   return [storedValue, setValue];
// }

// const debouncedSetLocalstorage = throttle((k, v) => {
//   console.log("setting local storage");
//   console.log({ k, v });

//   localStorage.setItem(k, JSON.stringify(v));
// }, 500);

// defaultValue can be a function if it's expense to generate, like a nanoid
// const useLocalstorage = (key, defaultValue) => {
//   let initialValue = JSON.parse("" + localStorage.getItem(key));
//   if (!initialValue)
//     initialValue =
//       typeof defaultValue === "function" ? defaultValue() : defaultValue;

//   const [value, setValue] = useState(initialValue);

//   useEffect(() => {
//     debouncedSetLocalstorage(key, value);
//   }, [key, value]);
//   console.log({ key, value });

//   return [value, setValue];
// };

// export default useLocalstorage;
