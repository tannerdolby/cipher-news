import { useEffect, useRef, useReducer, MutableRefObject } from 'react';

// Custom hook for fetching from NY Times API
export const useFetch = (url: string) => {
    const cache: MutableRefObject<any> = useRef({});

    const initialState = {
        status: 'idle',
        error: null,
        data: []
    };

     // Convert useState() to useReducer()s
     const [state, dispatch] = useReducer((state: any, action: { type: string; payload?: any; }) => {
        switch (action.type) {
            case 'FETCHING':
                return { ...initialState, status: 'fetching' };
            case 'FETCHED':
                return { ...initialState, status: 'fetched', data: action.payload };
            case 'FETCH_ERR':
                return { ...initialState, status: 'error', error: action.payload };
            default:
                return state;
        }
    }, initialState);

    // Use API request URL as value in dependency array for useEffect hook,
    // this way if the section data was just fetched, we don't fetch again
    // telling useEffect to track query changes, if the prev query 
    // is NOT the same as the current query then the useEffect gets invoked again
    useEffect(() => {

        // boolean to determine whether request should continue fetching or stop
        // assuming data from response isn't already in the cache
        let cancelRequest = false;
        
        // kill off effect if url is falsy
        // to ensure API request doesnt occur
        // and attemp to fetch data that doesn't exist
        if (!url) return; // bail!

        // So with the cache, if we fetch some data that 
        // doesn't already exist in cache, make the API request and then store
        // the response in local cache, if fetch wants data that already exists
        // in local cache then set the data from local cache without making
        // another API call :-)
        const fetchData = async () => {
            // set data and status at the same time to help prevent impossible states
            // and uneccessary re-renders
            dispatch({ type: 'Fetching!' });
            // Mapping URLs in cache object to data from API
            // if APi request URL already exists as a key in cache object,
            // use that data to update state
            if (cache.current[url]) {
                const data = cache.current[url];
                dispatch({ type: 'Fetch complete', payload: data });
            } else {
                try {
                // Make the request with Fetch which uses the Promise API
                const res = await fetch(url);
                const data = await res.json();
                // Set response in cache to add Memoization
                cache.current[url] = data;
                if (cancelRequest) return; // cancel request and bail
                dispatch({ type: "FETCHED", payload: data });
                } catch (err) {
                    if (cancelRequest) return;
                    dispatch({ type: "FAILED", payload: err.message });
                }
            }
        };

        fetchData();

        // Clean up the side effect
        // help resolve React state update error
        // so state doesnt attempt to be updated while
        // the component is unmounted, this way with the
        // cleanup function, if a component is unmounted,
        // leave it, otherwise if it hasn't been unmounted
        // update it with our cache data
        return function cleanup() {
            cancelRequest = true;
        }

    }, [url]);

    return state;
};