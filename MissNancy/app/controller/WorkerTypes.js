Ext.define('KCCVBS.controller.WorkerTypes', {
    extend: 'Ext.app.Controller',

    stores: ['WorkerTypes'],

    models: ['WorkerType'],

    views: ['workertype.List', 'workertype.Edit'],

    refs: [
        {
            ref: 'panel',
            selector: 'workertypelist'
        }
    ],

    init: function () {
        this.control({
            'workertypelist dataview': {
                itemdblclick: this.editItem
            },
            'workertypeedit button[action=save]': {
                click: this.updateItem
            },
            'workertypelist button[action=new]': {
                click: this.createItem
            },
            'workertypelist button[action=delete]': {
                click: this.deleteItem
            }
        });
    },

    displayList: function () {
        // Create grid view and display...
        console.log('workertype displayList clicked');
        var view = Ext.getCmp('center');
        console.log(view);
        view.removeAll();
        view.add({
            xtype: 'workertypelist'
        });
    },

    createItem: function () {
        console.log('worktype createItem clicked');
        var edit = Ext.create('KCCVBS.view.workertype.Edit').show();
        var record = Ext.create('KCCVBS.model.WorkerType');
        record.set('Active', true);

        edit.down('form').loadRecord(record);
    },

    editItem: function (grid, record) {
        var edit = Ext.create('KCCVBS.view.workertype.Edit').show();

        edit.down('form').loadRecord(record);
    },

    updateItem: function (button) {
        var win = button.up('window'),
            form = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        record.set(values);
        win.close();
        this.getWorkerTypesStore().sync();
    },
    deleteItem: function (button) {
        Ext.MessageBox.confirm('Delete Worker Type', 'Are you sure you want to delete', function (confirmButton) {
            if (confirmButton == 'yes') {
                var grid = button.up('panel');
                var store = grid.getStore();
                Ext.each(grid.getView().getSelectionModel().getSelection(), function (record) {
                    store.remove(record);
                });

                store.sync();
            }

        });
    }
});

