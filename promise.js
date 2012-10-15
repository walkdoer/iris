/**
 * Author zhangmhao@gmail.com
 * Create 2012-10-10 18:00:51
 * description:
 * =============================================
 *
    function searchTwitter(term) {

        var url, xhr, results, promise;
        url = 'http://search.twitter.com/search.json?rpp=100&q=' + term;
        promise = new Promise();
        xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function (e) {
            if (this.status === 200) {
                results = JSON.parse(this.responseText);
                promise.resolve(results);
            }
        };

        xhr.onerror = function (e) {
            promise.reject(e);
        };

        xhr.send();
        return promise;
    }

    function loadTweets() {
        var container = document.getElementById('container');
        searchTwitter('#IE10').then(function (data) {
            data.results.forEach(function (tweet) {
                var el = document.createElement('li');
                el.innerText = tweet.text;
                container.appendChild(el);
            });
        }, handleError);
    }
 * =============================================
 */
var Promise = function () {

};

Promise.prototype.then = function (onResolved, onRejected) {

};

Promise.prototype.resolve = function (value) {

};

Promise.prototype.reject = function (error) {

};

Promise.when = function () {

};