(function($angular) {
    'use strict';

    var app = $angular.module('pubHistogram');
    app.factory('publicationUtil', function(Publication) {
        // publication.count = data.hitCount
        //                      data.resultList.result[] == 1
        // publication.mostCited = result[0]
        // publication.year = results[0].pubYear;
        function generatePublicationDataByYears(res) {
            if (!res || !res.length) {
                return;
            }

            var publicationList = [];
            for (var i=0; i < res.length; i++) {
                var data = res[i].data;
                if (!data) {
                    continue;
                }

                var year;
                var count;
                var mostCited;

                count = data.hitCount || 0;
                if (data.resultList && data.resultList.result &&
                    data.resultList.result.length > 0) {
                    var result = data.resultList.result[0];
                    mostCited = result;
                    year = result.pubYear;
                }
                publicationList.push(new Publication(year, count, mostCited));
            }

            return publicationList;
        }

        return {
            generatePublicationDataByYears: generatePublicationDataByYears
        };
    });
})(window.angular);
