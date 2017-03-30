import requester from '../data/requester.js';
import template from 'template';
import 'jquery';

const SIZE = 3;

class GamesController {

    index(page) {

        let games;
        let data = { page: page };
        // let categories;

        /* Get all categories */
        // let categoriesPromise = requester.get('/categories');
        // categoriesPromise.then(data => {
        //     categories = data;
        // });

        return new Promise((resolve, reject) => {
            requester.post('/games', data)
                .then(data => {
                    games = data;
                })
                .then(() => {
                    return Promise.all([template.get('home-header'), template.get('games'), template.get('article'), template.get('footer')])
                        .then(([header, content, article, footer]) => {
                            let html = header() + content(games) + article() + footer();
                            resolve(html);
                        });
                });
        });
    }

    get(id) {
        return new Promise((resolve, reject) => {
            requester.get('/games/' + id)
                .then(data => {
                    resolve(data);
                });
        });
    }

    attachToTemplate(data, templateName) {
        return new Promise((resolve, reject) => {
            template.get(templateName).then(template => {
                let obj = { book: data };
                let html = template(obj);
                resolve(html);
            });
        });
    }

    add(context) {
        context.params.price = parseFloat(context.params.price);
        return requester.post('/games', context.params);
    }

    edit() {
        function increaseLikes(gameId, newLikes) {
            return requester.put(`/games/${gameId}`, { likes: newLikes });
        }

        return {
            increaseLikes
        };
    }

    delete() {
        requester.get('/games').then((games) => {
            // TODO delete games
        });
    }
}

export default GamesController;