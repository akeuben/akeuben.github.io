import { setup } from "axios-cache-adapter";
import localforage from "localforage";

const configure = () => {
    console.log("creating axios");
    const forageStore = localforage.createInstance({
        // List of drivers used
        driver: [
            localforage.INDEXEDDB,
            localforage.LOCALSTORAGE
        ],
        // Prefix all storage keys to prevent conflicts
        name: 'my-cache'
    })
    return setup({
        // `axios-cache-adapter` options
        cache: {
            maxAge: 60 * 60 * 1000,
            store: forageStore, // Pass `localforage` store to `axios-cache-adapter`,
            exclude: {
                query: false
            }
        }
    })
}

const axios = configure();
console.log(axios.interceptors);

export default axios;