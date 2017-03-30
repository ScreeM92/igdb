import requester from '../data/requester.js';
import template from 'template';
import 'jquery';

const SIZE = 3;

class NewsController {

    index(page) {

        let news;
        let data = { page: page };

        return new Promise((resolve, reject) => {
            requester.post('/news', data)
                .then(data => {
                    news = data;
                })
                .then(() => {
                    return Promise.all([template.get('home-header'), template.get('news'), template.get('article'), template.get('footer')])
                        .then(([header, content, article, footer]) => {
                            let html = header() + content(news) + article() + footer();
                            resolve(html);
                        });
                });
        });
    }

    get(id) {
        return new Promise((resolve, reject) => {
            requester.get('/news/' + id)
                .then(data => {
                    resolve(data);
                });
        });
    }

    add(context) {
        context.params.price = parseFloat(context.params.price);
        return requester.post('/news', context.params);
    }

    edit() {
        function increaseLikes(bookId, newLikes) {
            return requester.put(`/news/${bookId}`, { likes: newLikes });
        }

        return {
            increaseLikes
        };
    }

    delete() {
        requester.get('/news').then((news) => {
            // TODO delete news
        });
    }
}

export default NewsController;