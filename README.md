# Cipher News
A news application with content provided by the NY Times Top Stories API. Built with React, Node, Lambda functions, and Netlify.

## Running locally
1. In the root directory: `npm run build`
2. Start Lambda server: `npm run lambda:serve`
3. Start React client: `cd ./client` and then `npm run start`
4. Navigate to `http://localhost:3000` for UI and `http://localhost:9000/.netlify/functions/news` to view the lambda function endpoint.

_Optionally, you can run the node app with the React client locally and hit those endpoints in `./server/index.js` with `proxy` changed to `http://localhost:8000` in `package.json` of React project, but in production the lambda endpoints in `./functions` must be used._

## Contributing
Feel free to contribute to this project by suggesting a new feature or modification.

- Open an [issue](https://github.com/tannerdolby/cipher-news/issues) for any features/modifications or bugs.

## Notes
The UI is built with React, using a custom hook to fetch data from the [NY Times Top Stories API](https://developer.nytimes.com/docs/top-stories-product/1/overview). The custom hook uses [memoization](https://en.wikipedia.org/wiki/Memoization) to store the response of API calls in a cache and return the cached result when the same API request occurs again later. This greatly improves performance by reducing the number of costly API calls. If an API call is made to the lambda endpoint `/.netlify/functions/news?section=movies`, we will first check the cache to see if that data is already stored, if it isn't make the request and store response in cache, if it is already stored, simply use the cached result to avoid making another API call.

## Design
Original design by Vishnu Prasad on dribbble - https://dribbble.com/shots/10827673-Retro-news-web-app

## Maintainer
[@tannerdolby](https://github.com/tannerdolby)