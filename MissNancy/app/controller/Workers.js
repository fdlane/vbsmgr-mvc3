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
                itemdblclick: this.editItem
            },
            'workersedit button[action=newFromEdit]': {
                click: this.createItem
            },
            'workersedit button[action=save]': {
                click: this.updateItem
            },
            'workerslist button[action=new]': {
                click: this.createItem
            },
            'workerslist button[action=delete]': {
                click: this.deleteItem
            }
        });
    },

    displayList: function () {

        var tabs = Ext.getCmp('center');
        var tab = tabs.down('#Workers');
        if (!tab) {
            tab = tabs.add({
                id: 'Workers',
                title: 'Workers',
                xtype: 'workerslist',
                closable: true
            });
        }

        tabs.setActiveTab(tab);

    },
    createItem: function (button) {

        // if user press New on the edit form, save the current record first
        if (button.action == 'newFromEdit') {
            this.updateItem(button);
        }

        var edit = Ext.create('KCCVBS.view.workers.Edit').show();
        var record = Ext.create('KCCVBS.model.Workers');
        record.set('Active', true);

        edit.down('form').loadRecord(record);

        //set focus to speed data entry
        edit.query('#fistInput')[0].focus(true, 10);

    },
    editItem: function (grid, record) {
        var edit = Ext.create('KCCVBS.view.workers.Edit').show();
        edit.down('form').loadRecord(record);
    },

    updateItem: function (button) {
        var win = button.up('window'),
            form = win.down('form').getForm(),
            record = form.getRecord(),
            values = form.getValues();

        if (!form.isValid()) {
            return;
        };

        record.set(values);

        // check if this is a newly created record and insert into the store
        if (record.phantom) {
            this.getWorkersStore().insert(0, record);
        }

        win.close();
        this.getWorkersStore().sync();
    },
    deleteItem: function (button) {
        Ext.MessageBox.confirm('Delete Worker', 'Are you sure you want to delete', function (confirmButton) {
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

