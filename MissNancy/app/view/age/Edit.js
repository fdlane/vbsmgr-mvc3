Ext.define('KCCVBS.view.age.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.ageedit',

    requires: ['Ext.form.Panel'],

    title: 'Age Add/Edit',
    layout: 'fit',
    autoShow: true,
    autoheight: true,
    width: 600,
    modal: true,

    initComponent: function () {
        this.items = [{
            xtype: 'form',
            padding: '5 5 0 5',
            border: false,
            style: 'background-color: #fff;',

            items: [{
                xtype: 'textfield',
                name: 'AgeKey',
                fieldLabel: 'Age Key',
                hidden: true
            }, {
                xtype: 'checkbox',
                name: 'Active',
                fieldLabel: 'Active'
            }, {
                itemId: 'fistInput',  // using this to denote the first field for focus
                xtype: 'textfield',
                name: 'Age',
                fieldLabel: 'Display'
            }, {
                xtype: 'textfield',
                name: 'Color',
                fieldLabel: 'Color'
            }, {
                xtype: 'textareafield',
                name: 'Notes',
                fieldLabel: 'Notes',
                grow: true,
                anchor: '99%'
            }]
        }];

        this.buttons = [{
            text: 'New',
            action: 'newFromEdit'
        }, {
            xtype: 'tbfill'
        }, {
            text: 'Save',
            action: 'save'
        }, {
            text: 'Cancel',
            scope: this,
            handler: this.close
        }];

        this.callParent(arguments);
    }
});

