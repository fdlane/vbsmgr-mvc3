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
                itemdblclick: this.editClasses
            },
            'classesedit button[action=save]': {
                click: this.updateClasses
            },
            'classeslist button[action=new]': {
                click: this.createClass
            },
            'classeslist button[action=delete]': {
                click: this.deleteClass
            },
            'classworkerdetailslist button[action=new]': {
                click: this.createClassWorkerDetails
            },
            'classworkerdetailslist button[action=delete]': {
                click: this.deleteClassWorkerDetail
            }
        });
    },

    displayList: function () {
        // Create grid view and display...
        console.log('Classes displayList clicked');
        var view = Ext.getCmp('center');
        console.log(view);
        view.removeAll();
        view.add({
            xtype: 'classeslist'
        });
    },

    createClass: function () {
        console.log('Classes createClass clicked');
        var edit = Ext.create('KCCVBS.view.classes.Edit').show();
        var record = Ext.create('KCCVBS.model.Classes');
        record.set('Active', true);

        edit.down('form').loadRecord(record);

        // empty the store so workers from the previously viewed class don't show
        this.getClassWorkerDetailsStore().loadData([], false);

        this.getAgesStore().load();
    },
    editClasses: function (grid, record) {
        var edit = Ext.create('KCCVBS.view.classes.Edit').show();

        edit.down('form').loadRecord(record);

        //reload it with the current workers
        this.getClassWorkerDetailsStore().load({ params: { ClassKey: record.data.ClassKey} });
        this.getAgesStore().load();

    },
    updateClasses: function (button) {
        var win = button.up('window'),
            form = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

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
    deleteClass: function (button) {
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
    createClassWorkerDetails: function (button) {
        var grid = button.up('panel'),
            store = grid.getStore();

        store.insert(0, {});

        var editor = grid.getView().getPlugin()[0];
        editor.startEditByPosistion({
            row: 0,
            column: 1
        });

    },
    deleteClassWorkerDetail: function (button) {
        Ext.MessageBox.confirm('Unassign Class Worker', 'Are you sure you want to unassign Worker(s) from this Class?', function (confirmButton) {
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

