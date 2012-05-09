Ext.define('KCCVBS.view.age.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.agelist',
    store: 'Ages',
    layout: 'fit',
    header: false,
    autoScroll: true,

    initComponent: function () {

        this.selModel = Ext.create('Ext.selection.CheckboxModel', {
            checkOnly: true
        });

        this.tbar = [{
            iconCls: 'new-item',
            text: 'New',
            action: 'new'
        }, {
            iconCls: 'delete-item',
            text: 'Delete',
            action: 'delete'
        }, {
            xtype: 'tbspacer',
            width: 50
        }, {
            xtype: 'checkbox',
            name: 'Active',
            fieldLabel: 'Show Active Items Only...',
            labelWidth: 130,
            labelSeparator: '',
            checked: true,
            action: 'showActive'
        }];

        this.columns = [{
            header: 'Age',
            dataIndex: 'Age',
            width: 100
        }, {
            header: 'Color Value',
            dataIndex: 'Color',
            width: 100
        }, {
            header: 'Color Display',
            dataIndex: 'Color',
            width: 100
        }, {
            xtype: 'columnactive',
            dataIndex: 'Active',
            width: 50
        }];

        this.callParent(arguments);
    }
});


