/// <reference path="../../../extjs/ext-all-dev.js" />

//var sm = Ext.create('Ext.selection.CheckboxModel', {
//    checkOnly: true
//});

// Tried to follow the guys advice
// http: //stackoverflow.com/questions/6871594/best-practices-concerning-initcomponent-in-ext-define
// and this guys...better use of Ext.apply...
// http://stackoverflow.com/questions/7645180/using-more-than-one-controller-with-extjs-4-mvc

Ext.define('KCCVBS.view.classes.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.classeslist',
    store: 'Classes',
    header: false,

    initComponent: function () {

        this.selModel = Ext.create('Ext.selection.CheckboxModel', {
            checkOnly: true
        });

        this.tbar = [
                        {
                            iconCls: 'new-item',
                            text: 'New',
                            action: 'new',
                            pressed: true
                        },
                        {
                            iconCls: 'delete-item',
                            text: 'Delete',
                            action: 'delete'
                        }
                    ];

        this.columns = [
            { header: 'Class', dataIndex: 'ClassDisplay', flex: 1 },
            { header: 'Master Teacher', dataIndex: 'MasterTeacher', flex: 1 },
            { header: 'Location', dataIndex: 'Location', flex: 1 },
            { header: 'Ages', dataIndex: 'Ages', flex: 1 },
            { header: 'Phone', dataIndex: 'Phone', flex: 1 },
            { header: 'Current', dataIndex: 'Current', flex: 1 },
            { header: 'Active', dataIndex: 'Active', flex: 1 }
        ];

        this.callParent(arguments);
    }
});


