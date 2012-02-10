Ext.define('KCCVBS.controller.AppController', {
    extend: 'Ext.app.Controller',
    init: function () {

        this.control({

            // Add all your toolbar actions & navigation pane's actions...
            'navigation menuitem[action="children"]': {
                click: function (butt, evt) {
                    this.application.getController('Children').displayList();
                }
            },
             'navigation menuitem[action="workers"]': {
                click: function (butt, evt) {
                    this.application.getController('Workers').displayList();
                }
            },
            'navigation menuitem[action="classes"]': {
                click: function (butt, evt) {
                    this.application.getController('Classes').displayList();
                }
            }
        });
    }
});
