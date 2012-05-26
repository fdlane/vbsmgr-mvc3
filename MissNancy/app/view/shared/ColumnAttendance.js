Ext.define('KCCVBS.view.shared.ColumnAttendance', {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.columnattendance',
    renderer: function (value) {
        if (value) {
            return '<div><img src="./Content/icons/tick.png"></div>';
        }
    }
});


