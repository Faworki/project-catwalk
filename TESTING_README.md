## Testing Info

Run all jest test: `npm test`

### Test File Naming
Test files should be named accorind to the following convention: <filebeingtested>.test.js.
ex. If you are testing App.jsx the test file should be called: App.test.js.

Test files should be in the directory as the file they are testing or alternatively they can be kept in a directory called '__test__'.

An example of a file structure with tests

    client
    |-- components
    |  |-- App.jsx
    |  |-- App.test.js
    |  |-- galleryComponents
    |  |  |-- __tests__
    |  |  |  | -- ThumbNailList.test.js
    |  |  |  | -- Gallery.test.js
    |  |  |-- ThumbNailList.jsx
    |  |  |-- Gallery.jsx

Testing Documentation
* [Jest](https://jestjs.io/en/)
* [Enzyme](https://enzymejs.github.io/enzyme/)
* [React Testing Examples](https://reactjs.org/docs/testing.html)
* [Puppeteer](https://pptr.dev/)
* [jest-puppeteer](https://github.com/smooth-code/jest-puppeteer)
