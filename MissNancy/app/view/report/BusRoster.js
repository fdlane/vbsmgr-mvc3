Ext.define('KCCVBS.view.report.BusRoster', {
    extend: 'Ext.Panel',
    alias: 'widget.busroster',
//    store: 'Ages',
    layout: 'fit',
    header: false,
    autoScroll: true,
    html: 'Reports will be here',
   

    initComponent: function () {

//        this.selModel = Ext.create('Ext.selection.CheckboxModel', {
//            checkOnly: true
//        });
//                       
//        this.tbar = [
//                        {
//                            iconCls: 'new-item',
//                            text: 'New',
//                            action: 'new',
//                            pressed: true
//                        }, {
//                            iconCls: 'delete-item',
//                            text: 'Delete',
//                            action: 'delete'
//                        }
//                    ];

//        this.columns = [

//                    {
//                        header: 'age',
//                        dataindex: 'age',
//                        width: 100
//                    }, {
//                        header: 'color value',
//                        dataindex: 'color',
//                        width: 100
//                    }, {
//                        header: 'color display',
//                        dataindex: 'color',
//                        width: 100
//                    }, {
//                        xtype: 'columnactive',
//                        dataindex: 'active',
//                        flex: 1
//                    }
//                ];

        this.callParent(arguments);
    }
});


