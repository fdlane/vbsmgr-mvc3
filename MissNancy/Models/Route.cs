using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MissNancy.Data;

namespace MissNancy.Data
{
    public partial class Route : MissNancyDB.Record<Route>
    {
        // TODO I know, not the cool way to do this stuff
        protected PetaPoco.Database db = MissNancyDB.GetInstance();

        // The display value of for the MasterTeacherKey
        [PetaPoco.ResultColumn]
        public string BusDriver
        {
            get
            {
                var sql = PetaPoco.Sql.Builder
                    .Append("SELECT tblRoutes.RouteKey, tblWorkers.DisplayName")
                    .Append("FROM tblRoutes INNER JOIN")
                    .Append("tblBuses ON tblRoutes.BusKey = tblBuses.BusKey INNER JOIN")
                    .Append("tblWorkers ON tblBuses.BusDriverKey = tblWorkers.WorkerKey")
                    .Append("WHERE tblRoutes.RouteKey = @0", this.RouteKey);

                return db.ExecuteScalar<string>(sql);
            }
        }

        // the current number of children assigned to this class
        [PetaPoco.ResultColumn]
        public string Current
        {
            get
            {
                //var sql = PetaPoco.Sql.Builder
                //    .Append("SELECT Count(tblChildren.ChildrenKey)")
                //    .Append("FROM tblNeighborhoods INNER JOIN tblChildren")
                //    .Append("ON tblNeighborhoods.NeighborhoodKey = tblChildren.NeighborhoodKey")
                //    .Append("WHERE (((tblChildren.NeighborhoodKey)=@0))", this.BusKey)
                //    .Append("GROUP BY tblNeighborhoods.RouteKey");

                //return db.ExecuteScalar<string>(sql);
                return "TODO";
            }
        }

        [PetaPoco.ResultColumn]
        public IList<Neighborhood> Neighborhoods { get; set; }

    }
}