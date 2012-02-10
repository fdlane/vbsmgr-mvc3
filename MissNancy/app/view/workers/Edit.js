Ext.define('KCCVBS.view.workers.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.workersedit',

    requires: ['Ext.form.Panel'],

    title: 'Edit Worker',
    layout: 'fit',
    autoShow: true,
    height: 250,
    width: 280,
    modal: true,

    initComponent: function () {
        this.items = [
        {
            xtype: 'form',
            padding: '5 5 0 5',
            border: false,
            style: 'background-color: #fff;',

            items: [
            {
                xtype: 'textfield',
                name: 'WorkerKey',
                fieldLabel: 'WorkerKey'
            },
            {
                xtype: 'textfield',
                name: 'DisplayName',
                fieldLabel: 'Display Name'
            }
                ]
        }
        ];

        this.buttons = [
        {
            text: 'Save',
            action: 'save'
        },
        {
            text: 'Cancel',
            scope: this,
            handler: this.close
        }
        ];

        this.callParent(arguments);
    }
});

