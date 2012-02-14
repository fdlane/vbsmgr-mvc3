Ext.define('KCCVBS.controller.Children', {
    extend: 'Ext.app.Controller',

    stores: ['Children', 'Ages'],

    models: ['Children'],

    views: ['children.List', 'children.Edit'],

    refs: [
        {
            ref: 'childrenlist',
            selector: 'panel'
        }
    ],

    init: function () {
        this.control({
            'childrenlist dataview': {
                itemdblclick: this.editItem
            },
            'childrenedit button[action=save]': {
                click: this.updateItem
            },             
            'childrenlist button[action=new]': {
                click: this.createItem
            },
            'childrenlist button[action=delete]': {
                click: this.deleteItem
            }
        });
    },

    displayList: function () {
      var tabs = Ext.getCmp('center');
      var tab = tabs.down('#Children');
      if (!tab) {
        tab = tabs.add({
                id: 'Children',
                title: 'Children',
                xtype: 'childrenlist',
                closable: true
            });
        }
        
        tabs.setActiveTab(tab);
   
    },

    createItem: function () {

        var edit = Ext.create('KCCVBS.view.children.Edit').show();
        var record = Ext.create('KCCVBS.model.Children');
        record.set('Active', true);

        edit.down('form').loadRecord(record);

    },

    editItem: function (grid, record) {

        var view = Ext.getCmp('center');
        var edit = Ext.create('KCCVBS.view.children.Edit').show();

        edit.down('form').loadRecord(record);
    },

    updateItem: function (button) {
     
        var win = button.up('window'),
            form = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        record.set(values);
        win.close();
        this.getChildrenStore().sync();
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
});

