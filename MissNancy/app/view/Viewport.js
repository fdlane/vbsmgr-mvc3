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
        html: Html = "<div id='header' style='height:32px;'><a style='float:right;margin-right:10px;' href='http://www.knoxvillechristiancenter.org/' target='_blank'><img style='margin-top: 4px;' src='/Content/pics/i_heart_vbs_opt.png'/></a><div class='api-title'>Giant Vaction Bible School (Beta)</div></div>",
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
