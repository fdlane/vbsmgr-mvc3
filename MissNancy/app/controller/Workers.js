Ext.define('KCCVBS.controller.Workers', {
    extend: 'Ext.app.Controller',

    stores: ['Workers'],

    models: ['Workers'],

    views: ['workers.Edit', 'workers.List'],

    refs: [
        {
            ref: 'workersPanel',
            selector: 'panel'
        }
    ],

    init: function () {
        this.control({
            'workerslist dataview': {
                itemdblclick: this.editWorkers
            },
            'workersedit button[action=save]': {
                click: this.updateWorkers
            }
        });
    },

    displayList: function () {
        // Create grid view and display...
        console.log('Worker displayList clicked');
        var view = Ext.getCmp('center');
        console.log(view);
        view.removeAll();
        view.add({
            xtype: 'workerslist'
        });
    },

    editWorkers: function (grid, record) {
        var edit = Ext.create('KCCVBS.view.workers.Edit').show();

        edit.down('form').loadRecord(record);
    },

    updateWorkers: function (button) {
        var win = button.up('window'),
            form = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        record.set(values);
        win.close();
        this.getWorkersStore().sync();
    }
});

