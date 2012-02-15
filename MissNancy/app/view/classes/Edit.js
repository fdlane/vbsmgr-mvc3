Ext.define('KCCVBS.view.classes.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.classesedit',

    requires: ['Ext.form.Panel'],

    title: 'Edit Class',
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
            },
            {
                xtype: 'checkbox',
                name: 'Active',
                fieldLabel: 'Active'
            },
            {
                xtype: 'textfield',
                name: 'ClassDisplay',
                fieldLabel: 'Class Display'
            }
            ,
            {
                xtype: 'combo',
                name: 'AgeKey',
                fieldLabel: 'Age',
                emptyText: 'Please select...',
                store: 'Ages',
                displayField: 'Age',
                valueField: 'AgeKey'
                ,
                forceSelection: true,
                queryMode: 'local',
                selectOnFocus: true
            },
            {
                xtype: 'combo',
                name: 'LocationKey',
                fieldLabel: 'Class Locaiton',
                emptyText: 'Please select...',
                store: 'Locations',
                displayField: 'LocationDisplay',
                valueField: 'LocationKey'
                ,
                forceSelection: true,
                queryMode: 'local'
            },
            {
                xtype: 'combo',
                name: 'MasterTeacherKey',
                fieldLabel: 'Master Teacher',
                emptyText: 'Please select...',
                store: 'Workers',
                displayField: 'DisplayName',
                valueField: 'WorkerKey'
                ,
                forceSelection: true,
                queryMode: 'local'
            },
            {
                xtype: 'textareafield',
                name: 'Notes',
                fieldLabel: 'Notes',
                grow: true,
                anchor: '99%'
            },
            {
                xtype: 'classworkerdetailslist',
                name: 'ClassWorkerDetailsList',
                fieldLabel: 'Class Workers',
                height: 200,
                padding: '5px'
            }
            ]
        }
        ];

        this.buttons = [
                    {
                        text: 'New',
                        action: 'new'
                    }, {
                        xtype: 'tbfill'
                    },
                    {
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

