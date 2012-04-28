Ext.define('KCCVBS.view.workertype.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.workertypeedit',

    requires: ['Ext.form.Panel'],

    title: 'Worker Type Add/Edit',
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
                name: 'WorkerTypeKey',
                fieldLabel: 'Worker Type Key',
                hidden: true
            }, {
                xtype: 'checkbox',
                name: 'Active',
                fieldLabel: 'Active'
            }, {
                itemId: 'fistInput',  // using this to denote the first field for focus
                xtype: 'textfield',
                name: 'WorkerTypeDisplay',
                fieldLabel: 'Display'
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

