Ext.define('KCCVBS.controller.Classes', {
    extend: 'Ext.app.Controller',

    stores: ['Classes', 'Ages', 'Locations', 'Workers', 'ClassWorkerDetails'],

    models: ['Classes'],

    views: ['classes.Edit', 'classes.List', 'classes.ClassWorkerDetailsList', 'menu.Navigation'],

    refs: [

            {
                ref: 'centerPanel',
                selector: 'panel[region=center]'
            }
    ],

    init: function () {
        this.control({
            'classeslist dataview': {
                itemdblclick: this.editItem
            },
            'classesedit button[action=save]': {
                click: this.updateItem
            },
            'classeslist button[action=new]': {
                click: this.createItem
            },
            'classeslist button[action=delete]': {
                click: this.deleteItem
            },
            'classworkerdetailslist button[action=new]': {
                click: this.createWorkerDetails
            },
            'classworkerdetailslist button[action=delete]': {
                click: this.deleteWorkerDetail
            }
        });
    },

    displayList: function () {
        var tabs = Ext.getCmp('center');
        var tab = tabs.down('#Classes');
        if (!tab) {
            tab = tabs.add({
                id: 'Classes',
                title: 'Classes',
                xtype: 'classeslist',
                closable: true
            });
        }

        tabs.setActiveTab(tab);

    },

    createItem: function () {
        console.log('Classes createClass clicked');
        var edit = Ext.create('KCCVBS.view.classes.Edit').show();
        var record = Ext.create('KCCVBS.model.Classes');
        record.set('Active', true);

        edit.down('form').loadRecord(record);

        // empty the linking store so details items from the previously viewed item does not show
        this.getClassWorkerDetailsStore().loadData([], false);
    },
    editItem: function (grid, record) {
        var edit = Ext.create('KCCVBS.view.classes.Edit').show();

        edit.down('form').loadRecord(record);

        //reload it with the current workers
        this.getClassWorkerDetailsStore().load({ params: { ClassKey: record.data.ClassKey} });
        this.getAgesStore().load();

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
        //have seen this too, but wasn't working last time i looked at it
        // form.updateRecord(record);

        var store = this.getClassWorkerDetailsStore();
        var classWorkerDetails = [];

        var workers = store.getRange();
        for (var i = 0; i < workers.length; i++) {
            classWorkerDetails.push(workers[i].data);
        }

        record.set('ClassWorkerDetails', classWorkerDetails);

        // check if this is a newly created record and insert into the store
        if (record.phantom) {
            this.getClassesStore().insert(0, record);
        }
        win.close();
        this.getClassesStore().sync();
    },
    deleteItem: function (button) {
        Ext.MessageBox.confirm('Delete Class', 'Are you sure you want to delete', function (confirmButton) {
            if (confirmButton == 'yes') {
                var grid = button.up('panel');
                var store = grid.getStore();
                Ext.each(grid.getView().getSelectionModel().getSelection(), function (record) {
                    store.remove(record);
                });

                store.sync();
            }

        });
    },
    createWorkerDetails: function (button) {
        var grid = button.up('panel'),
            store = grid.getStore();

        store.insert(0, {});
        var editor = grid.getPlugin('workerCellEditing').startEditByPosition({ row: 0, column: 1 });

    },
    deleteWorkerDetail: function (button) {
        Ext.MessageBox.confirm('Unassign Worker', 'Are you sure you want to unassign Worker(s)?', function (confirmButton) {
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

