import handlebars from 'handlebars';
import 'jquery';

handlebars.registerHelper("inc", function(value, options) {
    return parseInt(value) + 1;
});

handlebars.registerHelper('trimString', function(passedString) {
    var theString = passedString.substring(0, 2050);
    return theString + '...';
});

export default {
    get(name) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `../views/${name}-template.handlebars`,
                success: html => {
                    let template = handlebars.compile(html);

                    resolve(template);
                }
            });
        });
    }
};