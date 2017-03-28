import requester from '../data/requester.js';
import template from 'template';
import 'jquery';
import 'slick';

class HomeController {

    index(context) {
        Promise.all([template.get('home-header'), template.get('home'), template.get('article'), template.get('footer')])
            .then(([header, content, article, footer]) => {
                let html = header() + content() + article() + footer();
                context.swap(html);
            });
    }
}

export default HomeController;