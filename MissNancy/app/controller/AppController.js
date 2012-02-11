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
            },
            'navigation menuitem[action="buses"]': {
                click: function (butt, evt) {
                    this.application.getController('Buses').displayList();
                }
            },
            'navigation menuitem[action="neighborhoods"]': {
                click: function (butt, evt) {
                    this.application.getController('Neighborhoods').displayList();
                }
            },
            'navigation menuitem[action="routes"]': {
                click: function (butt, evt) {
                    this.application.getController('Routes').displayList();
                }
            }
        });
    }
});
