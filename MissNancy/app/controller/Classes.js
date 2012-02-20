Ext.define('KCCVBS.controller.Classes', {
    extend: 'Ext.app.Controller',

    stores: ['Classes', 'Ages', 'Locations', 'Workers', 'WorkersCombo', 'ClassWorkerDetails'],

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
            'classesedit button[action=newFromEdit]': {
                click: this.createItem
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
            'classworkerdetailslist button[action=delete]': {
                click: this.deleteWorkerDetail
            },
            'classworkerdetailslist combo[action=new]': {
                select: this.createWorkerDetails
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

    createItem: function (button) {

        if (button.action == 'newFromEdit') {
            this.updateItem(button);
        }

        var edit = Ext.create('KCCVBS.view.classes.Edit').show();
        var record = Ext.create('KCCVBS.model.Classes');
        record.set('Active', true);

        edit.down('form').loadRecord(record);

        // empty the linking store so details items from the previously viewed item does not show
        this.getClassWorkerDetailsStore().loadData([], false);

        //set focus to speed data entry
        edit.query('#fistInput')[0].focus(true, 10);

    },
    editItem: function (grid, record) {

        var edit = Ext.create('KCCVBS.view.classes.Edit').show();

        //load the combo store with the current master teacher, so the loadRecord works
        this.getWorkersComboStore().loadData([
                {
                    WorkerKey: record.data.MasterTeacherKey,
                    DisplayName: record.data.MasterTeacher
                }
            ], false);

        // empty the linking store so details items from the previously viewed item does not show
        this.getClassWorkerDetailsStore().loadData([], false);

        //reload it with the workers currently assigned to this class
        this.getClassWorkerDetailsStore().load({ params: { ClassKey: record.data.ClassKey} });

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
    createWorkerDetails: function (combo) {
        console.log('selected' + combo.getValue());
        var grid = combo.up('panel'),
            store = grid.getStore();

        store.insert(0, { WorkerKey: combo.getValue(), DisplayName: combo.getRawValue() });
        combo.reset();
        // var editor = grid.getPlugin('workerCellEditing').startEditByPosition({ row: 0, column: 1 });

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

