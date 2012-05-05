using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MissNancy.Data;
using PetaPoco;

namespace MissNancy.Data
{
    public partial class Route : MissNancyDB.Record<Route>
    {
        public static Page<Route> GetPaged(int page, int limit, Boolean activeOnly)
        {
            var data = repo.Page<Route>(page, limit, "WHERE (abs(Active) = 1) OR (abs(Active) = @0) ORDER BY RouteDisplay", activeOnly);
            return data;
        }

        [PetaPoco.ResultColumn]
        public string BusNumber
        {
            get
            {
                return repo.ExecuteScalar<string>("SELECT BusNumber FROM tblBuses WHERE BusKey=@0", this.BusKey);
            }
        }

        [PetaPoco.ResultColumn]
        public string BusDriver
        {
            get
            {
                var sql = PetaPoco.Sql.Builder
                    .Append("SELECT tblWorkers.LastName + ', ' + tblWorkers.FirstName")
                    .Append("FROM tblRoutes INNER JOIN")
                    .Append("tblBuses ON tblRoutes.BusKey = tblBuses.BusKey INNER JOIN")
                    .Append("tblWorkers ON tblBuses.BusDriverKey = tblWorkers.WorkerKey")
                    .Append("WHERE tblRoutes.RouteKey = @0", this.RouteKey);

                return repo.ExecuteScalar<string>(sql);
            }
        }

        [PetaPoco.ResultColumn]
        public string BusMobileNum
        {
            get
            {
                return repo.ExecuteScalar<string>("SELECT BusMobileNum FROM tblBuses WHERE BusKey=@0", this.BusKey);
            }
        }

        [PetaPoco.ResultColumn]
        public string BusCaptain
        {
            get
            {
                return repo.ExecuteScalar<string>("SELECT tblWorkers.LastName + ', ' + tblWorkers.FirstName FROM tblWorkers WHERE WorkerKey=@0", this.BusCaptainKey);
            }
        }

        [PetaPoco.ResultColumn]
        public string CaptainPhone
        {
            get
            {
                return repo.ExecuteScalar<string>("SELECT Phone FROM tblWorkers WHERE WorkerKey=@0", this.BusCaptainKey);
            }
        }

        [PetaPoco.ResultColumn]
        public string BusCapacity
        {
            get
            {
                return repo.ExecuteScalar<string>("SELECT BusCapacity FROM tblBuses WHERE BusKey=@0", this.BusKey);
            }
        }

        // the current number of children assigned to this Bus/route
        [PetaPoco.ResultColumn]
        public string Current
        {
            get
            {
                var sql = PetaPoco.Sql.Builder
                    .Append("SELECT Count(tblChildren.ChildrenKey)")
                    .Append("FROM tblNeighborhoods INNER JOIN tblChildren")
                    .Append("ON tblNeighborhoods.NeighborhoodKey = tblChildren.NeighborhoodKey")
                    .Append("WHERE (((tblNeighborhoods.RouteKey)=@0))", this.RouteKey)
                    .Append("AND (abs(tblChildren.Active) = 1)")
                    .Append("GROUP BY tblNeighborhoods.RouteKey");

                return repo.ExecuteScalar<string>(sql);
            }
        }

        [PetaPoco.ResultColumn]
        public IList<Neighborhood> Neighborhoods { get; set; }

    }
}