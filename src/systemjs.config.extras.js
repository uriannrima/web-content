/**
 * Add barrels and stuff
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        map: {
            event: 'app/event',
            typeahead: 'app/typeahead'
        },
        packages: {
            event: {
                main: 'index',
                defaultExtension: 'js'
            },
            typeahead: {
                main: 'index',
                defaultExtension: 'js'
            }
        }
    });
})(this);
