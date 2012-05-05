Ext.define('KCCVBS.controller.Buses', {
    extend: 'Ext.app.Controller',

    stores: ['Buses', 'Workers', 'WorkersCombo', 'BusWorkerDetails'],

    models: ['Buses', 'BusWorkerDetails'],

    views: ['buses.List', 'buses.Edit', 'buses.BusWorkerDetailsList'],

    refs: [
        {
            ref: 'panel',
            selector: 'buseslist'
        }
    ],

    init: function () {
        this.control({
            'buseslist dataview': {
                itemdblclick: this.editItem
            },
            'busesedit button[action=newFromEdit]': {
                click: this.createItem
            },
            'busesedit button[action=save]': {
                click: this.updateItem
            },
            'buseslist button[action=new]': {
                click: this.createItem
            },
            'buseslist button[action=delete]': {
                click: this.deleteItem
            },
            'busworkerdetailslist button[action=delete]': {
                click: this.deleteWorkerDetail
            },
            'busworkerdetailslist combo[action=new]': {
                select: this.createWorkerDetails
            }
        });
    },

    displayList: function () {

        var tabs = Ext.getCmp('center');
        var tab = tabs.down('#Buses');
        if (!tab) {
            tab = tabs.add({
                id: 'Buses',
                title: 'Buses',
                xtype: 'buseslist',
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

        var edit = Ext.create('KCCVBS.view.buses.Edit').show();
        var record = Ext.create('KCCVBS.model.Buses');
        record.set('Active', true);

        edit.down('form').loadRecord(record);

        //set focus to speed data entry
        edit.query('#fistInput')[0].focus(true, 10);

        // empty the linking store so details items from the previously viewed item does not show
        this.getBusWorkerDetailsStore().loadData([], false);
    },

    editItem: function (grid, record) {
        var edit = Ext.create('KCCVBS.view.buses.Edit').show();

        //load the combo store with the current worker from the grid, so the loadRecord works
        this.getWorkersComboStore().loadData([
                {
                    WorkerKey: record.data.BusDriverKey,
                    WorkerDisplayName: record.data.BusDriver
                }
            ], false);

        // empty the linking store so details items from the previously viewed item does not show
        this.getBusWorkerDetailsStore().loadData([], false);

        //reload it with the workers currently assigned to this class
        this.getBusWorkerDetailsStore().load({ params: { BusKey: record.data.BusKey} });

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

        // Let's get all the related records from the grid
        var store = this.getBusWorkerDetailsStore();
        var busWorkerDetails = [];

        var workers = store.getRange();
        for (var i = 0; i < workers.length; i++) {
            busWorkerDetails.push(workers[i].data);
        }

        record.set('BusWorkerDetails', busWorkerDetails);

        // check if this is a newly created record and insert into the store
        if (record.phantom) {
            this.getBusesStore().insert(0, record);
        }

        win.close();

        // save to the server and reload after success so grid picks up foreignkey displays
        this.getBusesStore().sync(
            {
                scope: this,
                success: function () {
                    this.getBusesStore().load();
                }
            });
    },

    deleteItem: function (button) {
        Ext.MessageBox.confirm('Delete Selected', 'Are you sure you want to delete', function (confirmButton) {
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
        var grid = combo.up('panel'),
            store = grid.getStore();

        var record = combo.getStore().getById(combo.getValue());

        store.insert(0, {
            WorkerKey: record.data.WorkerKey,
            WorkerDisplayName: record.data.WorkerDisplayName,
            Phone: record.data.Phone,
            Mobile: record.data.Mobile
        });

        // reset the combo to so the user can enter another worker
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

