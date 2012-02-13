// and this guys...better use of Ext.apply...
// http://stackoverflow.com/questions/7645180/using-more-than-one-controller-with-extjs-4-mvc

Ext.define('KCCVBS.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'Ext.layout.container.Border'
    ],

    layout: 'border',
    items: [{
        region: 'north',
        html: '<h1 class="x-panel-header">Knoxville Christian Center VBS</h1>',
        autoHeight: true,
        border: false,
        margins: '0 0 5 0'
    }, {
        title: 'Navigation',
        region: 'west',
        width: 200,
        collapsible: true,
        collapsed: false,
        xtype: 'navigation'

    }, {
        id: 'center',
        region: 'center',
        xtype: 'tabpanel',
        items: [
        {
            title: 'Home',
            html: 'Put a Welcome page here...'
        }
    ]
    }]

});
