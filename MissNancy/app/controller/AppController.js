Ext.define('KCCVBS.controller.AppController', {
    extend: 'Ext.app.Controller',

    views: ['menu.Navigation','shared.ColumnActive', 'shared.ColumnAttendance'],

    init: function () {

        this.control({

            // Add all your toolbar actions & navigation pane's actions...
            'navigation menuitem[action="children"]': {
                click: function (button, evt) {
                    this.application.getController('Children').displayList();
                }
            },
            'navigation menuitem[action="workers"]': {
                click: function (button, evt) {
                    this.application.getController('Workers').displayList();
                }
            },
            'navigation menuitem[action="classes"]': {
                click: function (button, evt) {
                    this.application.getController('Classes').displayList();
                }
            },
            'navigation menuitem[action="buses"]': {
                click: function (button, evt) {
                    this.application.getController('Buses').displayList();
                }
            },
            'navigation menuitem[action="neighborhoods"]': {
                click: function (button, evt) {
                    this.application.getController('Neighborhoods').displayList();
                }
            },
            'navigation menuitem[action="routes"]': {
                click: function (button, evt) {
                    this.application.getController('Routes').displayList();
                }
            },
            'navigation menuitem[action="reports"]': {
                click: function (button, evt) {
                    this.application.getController('Reports').displayList();
                }
            },
            'navigation menuitem[action="ages"]': {
                click: function (button, evt) {
                    this.application.getController('Ages').displayList();
                }
            },
            'navigation menuitem[action="locations"]': {
                click: function (button, evt) {
                    this.application.getController('Locations').displayList();
                }
            },
            'navigation menuitem[action="workertypes"]': {
                click: function (button, evt) {
                    this.application.getController('WorkerTypes').displayList();
                }
            }
        });
    }
});
