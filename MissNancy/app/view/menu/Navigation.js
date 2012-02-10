Ext.define('KCCVBS.view.menu.Navigation', {
    extend: 'Ext.menu.Menu',
    alias: 'widget.navigation',
    width: 150,

    floating: false,  // usually you want this set to True (default)

    //renderTo: Ext.getBody(),  // usually rendered by it's containing component
    items: [{
        text: 'Children',
        iconCls: 'children',
        action: 'children'
    }, {
        text: 'Workers',
        iconCls: 'workers',
        action: 'workers'
    }, {
        text: 'Classes',
        iconCls: 'classes',
        action: 'classes'
      
    }, {
        text: 'Buses',
        iconCls: 'buses',
        action: 'buses'

    }, {
        text: 'Neighborhoods',
        iconCls: 'neighborhoods',
        action: 'neighborhoods'
    }, {
        text: 'Routes',
        iconCls: 'routes',
        action: 'routes'
    }, {
        text: 'Ages',
        iconCls: 'settings',
        action: 'ages'
    }, {
        text: 'Locations',
        iconCls: 'settings',
        action: 'locations'
    }, {
        text: 'Worker Types',
        iconCls: 'settings',
        action: 'workertypes'
    }]

});


