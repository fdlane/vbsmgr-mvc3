Ext.define('KCCVBS.view.classes.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.classesedit',

    requires: ['Ext.form.Panel'],

    title: 'Class Add/Edit',
    layout: 'fit',
    autoShow: true,
    autoheight: true,
    width: 600,
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
                        name: 'ClassKey',
                        fieldLabel: 'Class Key',
                        hidden: true
                    }, {
                        xtype: 'checkbox',
                        name: 'Active',
                        fieldLabel: 'Active'
                    }, {
                        xtype: 'textfield',
                        itemId: 'fistInput',
                        name: 'ClassDisplay',
                        fieldLabel: 'Class Display',
                        emptyText: 'Name of Class'
                    }, {
                        xtype: 'combo',
                        name: 'AgeKey',
                        fieldLabel: 'Age',
                        emptyText: 'Please select...',
                        store: 'Ages',
                        displayField: 'Age',
                        valueField: 'AgeKey',
                        forceSelection: true,
                        queryMode: 'local',
                        allowBlank: false,
                        editable: false,
                        typeAhead: true

                    }, {
                        xtype: 'combo',
                        name: 'LocationKey',
                        fieldLabel: 'Class Locaiton',
                        emptyText: 'Please select...',
                        store: 'Locations',
                        displayField: 'LocationDisplay',
                        valueField: 'LocationKey',
                        forceSelection: true,
                        queryMode: 'local',
                        allowBlank: false,
                        editable: false,
                        typeAhead: true
                    }, {
                        xtype: 'combo',
                        name: 'MasterTeacherKey',
                        fieldLabel: 'Master Teacher',
                        emptyText: 'Type Last Name...',
                        store: 'WorkersCombo',
                        displayField: 'DisplayName',
                        valueField: 'WorkerKey',
                        queryMode: 'remote',
                        minChars: 2,
                        hideTrigger: true,
                        forceSelection: true,
                        selectOnFocus: true,
                        typeAhead: true

                    }, {
                        xtype: 'textareafield',
                        name: 'Notes',
                        fieldLabel: 'Notes',
                        grow: false,
                        anchor: '99%'
                    }, {
                        xtype: 'classworkerdetailslist',
                        name: 'ClassWorkerDetailsList',
                        fieldLabel: 'Class Workers',
                        height: 220,
                        padding: '5px'
                    }
                ]
            }
        ];

        this.buttons = [
                    {
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
                    }
                ];

        this.callParent(arguments);
    }
});

