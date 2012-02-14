Ext.define('KCCVBS.view.shared.ColumnActive', {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.columnactive',
    header: 'Active',
    align: 'center',

    renderer: function (value) {
        if (value) {
            return '<div><img src="../Content/icons/bullet_green.png"></div>';
        } else {
            return '<div><img src="../Content/icons/bullet_red.png"></div>';
        }
    }
});


