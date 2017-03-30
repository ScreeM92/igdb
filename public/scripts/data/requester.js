import 'jquery';
const ORIGIN = 'http://api.igdb.local/api';
// const ORIGIN = 'http://127.0.0.1:8000/api';
// const ORIGIN = 'http://igdb-api.local/api';

let requester = {
    get(url, data = undefined) {
        return new Promise((resolve, reject) => {
            $.ajax({
                    url: ORIGIN + url,
                    contentType: 'application/json',
                    method: 'GET',
                    data: JSON.stringify(data)
                })
                .done(resolve)
                .fail(reject);
        });
    },
    post(url, data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                    url: ORIGIN + url,
                    contentType: 'application/json',
                    method: 'POST',
                    data: JSON.stringify(data),
                    crossDomain: true
                })
                .done(resolve)
                .fail(err => {
                    reject(err);
                });
        });
    },
    put(url, data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                    url: ORIGIN + url,
                    contentType: 'application/json',
                    method: 'PUT',
                    data: JSON.stringify(data)
                })
                .done(resolve)
                .fail(reject);
        });
    },
    delete(url, data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                    url: ORIGIN + url,
                    contentType: 'application/json',
                    method: 'DELETE',
                    data: JSON.stringify(data)
                })
                .done(resolve)
                .fail(reject);
        });
    }
};

export default requester;