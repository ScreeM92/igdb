import requester from '../data/requester.js';
import template from 'template';
import 'jquery';

class RegisterController {

    index(context) {
        return Promise.all([template.get('home-header'), template.get('register'), template.get('article'), template.get('footer')])
            .then(([header, content, article, footer]) => {
                let html = header() + content() + article() + footer();
                context.swap(html);
            });
    }
}

export default RegisterController;