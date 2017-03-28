import requester from '../data/requester.js';
import template from 'template';
import 'jquery';

class IndexController {

    index(context) {
        Promise.all([template.get('index-header'), template.get('index'), template.get('article'), template.get('footer')])
            .then(([header, content, article, footer]) => {
                let html = header() + content() + article() + footer();
                context.swap(html);
            });
    }

    // add(newCategory) {
    //     requester.post('/categories', newCategory);
    // }

    // searchBooksByCategory(context, categoryName) {
    //     Promise.all([requester.get('/books'), template.get('booksByCategory')])
    //         .then(([books, template]) => {
    //             let filteredBooks = books.filter(book=>book._category === categoryName);
    //             let obj={
    //                 books:filteredBooks
    //             };

    //             let html = template(obj);
    //            context.$element().find('#selected-books').html(html);
    //         });
    // }
}

export default IndexController;