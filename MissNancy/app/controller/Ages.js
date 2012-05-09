Ext.define('KCCVBS.controller.Ages', {
    extend: 'Ext.app.Controller',

    stores: ['Ages'],

    models: ['Age'],

    views: ['age.List', 'age.Edit'],

    refs: [
        {
            ref: 'panel',
            selector: 'agelist'
        }
    ],

    init: function () {
        this.control({
            'agelist dataview': {
                itemdblclick: this.editItem
            },
            'ageedit button[action=newFromEdit]': {
                click: this.createItem
            },
            'ageedit button[action=save]': {
                click: this.updateItem
            },
            'agelist button[action=new]': {
                click: this.createItem
            },
            'agelist button[action=delete]': {
                click: this.deleteItem
            },
            'agelist checkbox[action=showActive]': {
                change: this.showActive
            }
        });
    },

    displayList: function () {
        var tabs = Ext.getCmp('center');
        var tab = tabs.down('#Age');
        if (!tab) {
            tab = tabs.add({
                id: 'Age',
                title: 'Age',
                xtype: 'agelist',
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

        var edit = Ext.create('KCCVBS.view.age.Edit').show();
        var record = Ext.create('KCCVBS.model.Age');
        record.set('Active', true);

        edit.down('form').loadRecord(record);
    },

    editItem: function (grid, record) {
        var edit = Ext.create('KCCVBS.view.age.Edit').show();

        edit.down('form').loadRecord(record);
    },

    updateItem: function (button) {
        console.log('button', button);
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
            this.getAgesStore().insert(0, record);
        }

        win.close();

        this.getAgesStore().sync();
    },

    deleteItem: function (button) {
        Ext.MessageBox.confirm('Delete Age', 'Are you sure you want to delete', function (confirmButton) {
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

    showActive: function (checkbox, newValue, oldValue, eOpts) {
        this.getAgesStore().load({ params: { activeOnly: newValue} });
    }
});

