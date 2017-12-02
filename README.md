# pub-histogram
A histogram of publication (across years) with the highest cited paper on each year in [Europe PMC](https://europepmc.org/RestfulWebService). For a running app, please click on this link, [https://zaidrashid.github.io/pub-histogram](https://zaidrashid.github.io/pub-histogram)

Setup
-----
You will need to have [NodeJS and NPM](https://nodejs.org/en/) installed. Clone the repository, and run `npm install` on your preferred terminal at the root level, and then `npm run build`

Other available commands:

* `npm run build` : Will build the repo. Will produce `.build/` and `docs/`
* `npm test` : Run unit tests against the code. For more information refer to [`karma.conf.js`](https://github.com/zaidrashid/pub-histogram/blob/master/karma.conf.js) file.
* `npm run single-test` : Run a single run of unit test. 
* `npm run serve` : Serve the `.build/` folder on your local machine with port 8080

Framework
--------

The main stack used in this project is [AngularJS](https://angularjs.org/). As for the Histogram Charts, I used [Highcharts](https://www.highcharts.com/demo/column-basic) while the data is retrieved via API provided by the [Europe PMC](https://europepmc.org/RestfulWebService)

For other dependencies, please refer to the [package.json](https://github.com/zaidrashid/pub-histogram/blob/master/package.json) file or the [Graph Dependency](https://github.com/zaidrashid/pub-histogram/network/dependencies) page.

Folder Structure
----------------
| Path        | comments           |
| ------------|:-------------|
| .build/      | Early compilation of the app |
| docs/      | Final build with .js and .css compiled. Use for [github.io](https://zaidrashid.github.io/pub-histogram)     |
| src/ | The main source code file     |
| src/assets/scss/| Contains scss files. Copiled with `gulp-sass`|
| src/components/| Components used in the app. This includes the histogram canvas and the year picker. Uses AngularJS component modules|
| src/constant/| All the constant files, mainly options used in the App. |
| src/factory/| Contains the factory files to get the usage of the chart or the API we want to use. |
|src/highcharts/| All the classes use to intiate the highcharts. Used by the factory to initialize it. Expand this files, to add other type of charts|
|src/models/| Base object for data manipulation |
|src/publication/| Contains the API implementation. For now there is only implementation for PMC API. In future, expand this folder to add more APIs|
| src/search/ | The search page codes. Includes html, and js file. |
| src/util/| All utility classes, such as string, date, and etc. |
| src/index.html| A template html file. Use to inject the required .js and .css files based on config.json|
| src/mainController.js| The main controller for the app. |
| src/mainModule.js | The main initialization of the Angular app. |
| src/mainRoute.js | The Angular routing service |
| config.json| Configuration file used for build. Contains all the required .js and .css files used in the app. |

Getting the data
----------------

* Creating the query string.

The core usage of this app is to be able to search for publications based on a query between years selected. For e.g. to search for `malaria` between the year 2016 - 2017 will separte the queries to 2 sets of query string as below (or refer to [/src/publication/PmcApi.js](https://github.com/zaidrashid/pub-histogram/blob/master/src/publication/PmcApi.js))

`[https://www.ebi.ac.uk/europepmc/webservices/rest/search/query=malaria%20AND%20(FIRST_PDATE%3A%5B2016-01-01%20TO%202016-12-31%5D)&sort=CITED%20desc&format=JSON&pageSize=1,
https://www.ebi.ac.uk/europepmc/webservices/rest/search/query=malaria%20AND%20(FIRST_PDATE%3A%5B2017-01-01%20TO%202017-12-31%5D)&sort=CITED%20desc&format=JSON&pageSize=1]
`

* Getting the most cited publications

The api provided options to achieve this goal. Since we want just the highest number of cited publication, we can sort based on CITED descending, and only return a single publication. The configuration set can be seen in [/src/constant/PMC_OPTIONS.js](https://github.com/zaidrashid/pub-histogram/blob/master/src/constant/PMC_API_OPTIONS.js) or as below:

`
CONFIG: {
            type: 'query',
            baseUrl: 'https://www.ebi.ac.uk/europepmc/webservices/rest/search/',
            options: [
                {key: 'sort', value: 'CITED desc'},
                {key: 'format', value: 'JSON'},
                {key: 'pageSize', value: 1}
            ]
        }
`

* Formatting the data

The [publicationUtil.js](https://github.com/zaidrashid/pub-histogram/blob/master/src/util/publicationUtil.js) will format the data retrieved from the request. Since we only need the number of publication per year, and the most cited we format those in the utility class.

The factory pattern
-----------------

* Getting the API. 

The PMC api is initialized by the [publicationApiFactory.js](https://github.com/zaidrashid/pub-histogram/blob/master/src/factory/publicationApiFactory.js) and it follows the factory pattern. Although, it requires and interface (in this case a base class), I did not implement it yet as there's only a single API instance. 

* Setting the charts

Similarly, the [chartProviderFactory.js](https://github.com/zaidrashid/pub-histogram/blob/master/src/factory/chartProviderFactory.js) sets the chart based on [HISTOGRAM_OPTIONS.js](https://github.com/zaidrashid/pub-histogram/blob/master/src/constant/HISTOGRAM_OPTIONS.js). For now it is set on stone from the constant file to 'bar' chart. All type of charts will implement the [BaseChart](https://github.com/zaidrashid/pub-histogram/blob/master/src/highcharts/BaseChart.js) where the implementation of setting the data, title, etc. 


Highcharts usage
---------------

To initalize Highcharts, it requires a set of configuration. The important part of the configuration is the xAxis values and series. Publications data is provided through [phHistoCanvas.js](https://github.com/zaidrashid/pub-histogram/blob/master/src/components/phHistoCanvas.js) component. Another round of formatting will be executed in the [setData()](https://github.com/zaidrashid/pub-histogram/blob/master/src/highcharts/BaseChart.js#L75) implementation.

* Tooltip for most cited publication

When setting the data, I added the most cited publication into the series data. Highcharts allow the tooltip to be customized, and we can do this by providing a [custom method](https://github.com/zaidrashid/pub-histogram/blob/master/src/highcharts/BaseChart.js#L20). 

Future Improvements
------------------

* More meaningful unit tests.
* Display messages if there's no query found. For now it's just an empty chart. 
* Expand the chart if there are many years queried. 
* Proper styling. For now it uses bootstrap with minimum classes. 
* More enhance UX experience, e.g. searching years can be a slider instead of input text-box. 
