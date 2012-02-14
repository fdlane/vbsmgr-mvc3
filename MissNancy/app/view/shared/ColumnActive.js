Ext.define('KCCVBS.view.shared.ColumnActive', {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.columnactive',
    header: 'Active',
    align: 'center',

    renderer: function (value) {
        if (value) {
            return '<img src="../Content/icons/bullet_green.png">';
        } else {
            return '<img src="../Content/icons/bullet_red.png">';
        }
    }
});


