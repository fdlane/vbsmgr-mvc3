using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MissNancy.Data;
using PetaPoco;

namespace MissNancy.Data
{
    public partial class Bus : MissNancyDB.Record<Bus>
    {

        private Database db;

        public Bus()
        {
            db = MissNancyDB.GetInstance();
        }

        // The display value of for the Route
        [PetaPoco.ResultColumn]
        public string RouteDisplay
        {
            get
            {
                var sql = PetaPoco.Sql.Builder
                    .Append("SELECT RouteDisplay FROM tblRoutes ")
                    .Append("WHERE BusKey=@0", this.BusKey);

                return db.ExecuteScalar<string>(sql);
            }
        }

        // The display value of for the BusDriverKey
        [PetaPoco.ResultColumn]
        public string BusDriver
        {
            get
            {
                var sql = PetaPoco.Sql.Builder
                    .Append("SELECT DisplayName FROM tblWorkers ")
                    .Append("WHERE WorkerKey=@0", this.BusDriverKey);

                return db.ExecuteScalar<string>(sql);
            }
        }

        // The display value of for the Captain
        [PetaPoco.ResultColumn]
        public string Captain
        {
            get
            {
                var sql = PetaPoco.Sql.Builder
                    .Append("SELECT tblWorkers.DisplayName FROM tblBuses INNER JOIN ")
                    .Append("tblRoutes ON tblBuses.BusKey = tblRoutes.BusKey INNER JOIN")
                    .Append("tblWorkers ON tblRoutes.BusCaptainKey = tblWorkers.WorkerKey")
                    .Append("WHERE tblBuses.BusKey=@0", this.BusKey);

                return db.ExecuteScalar<string>(sql);
            }
        }

        // the current number of children assigned to this class
        [PetaPoco.ResultColumn]
        public string Current
        {
            get
            {
                var sql = PetaPoco.Sql.Builder
                    .Append("SELECT Count(tblChildren.ChildrenKey)")
                    .Append("FROM tblNeighborhoods INNER JOIN tblChildren")
                    .Append("ON tblNeighborhoods.NeighborhoodKey = tblChildren.NeighborhoodKey")
                    .Append("WHERE (((tblChildren.NeighborhoodKey)=@0))", this.BusKey)
                    .Append("GROUP BY tblNeighborhoods.RouteKey");

                return db.ExecuteScalar<string>(sql);
            }
        }

        [PetaPoco.ResultColumn]
        public IList<BusWorkerDetail> BusWorkerDetails { get; set; }

        public List<BusWorkerDetail> GetWorkers(int busKey)
        {
            var sql = PetaPoco.Sql.Builder
                    .Append("SELECT tblBusWorkerDetails.BusWorkerKey, tblBusWorkerDetails.BusKey,")
                    .Append("tblBusWorkerDetails.WorkerKey, tblBusWorkerDetails.CreateDate,")
                    .Append("tblBusWorkerDetails.CreatedBy, tblBusWorkerDetails.EditDate,")
                    .Append("tblBusWorkerDetails.EditedBy, tblWorkers.DisplayName, tblWorkers.Phone, tblWorkers.Mobile")
                    .Append("FROM tblBusWorkerDetails")
                    .Append("INNER JOIN tblWorkers ON tblBusWorkerDetails.WorkerKey = tblWorkers.WorkerKey")
                    .Append("WHERE tblBusWorkerDetails.BusKey = @0", busKey);

            var workers = db.Query<BusWorkerDetail>(sql).ToList();

            return workers;
        }

        public Page<Bus> GetPaged(int page, int limit, Boolean activeOnly)
        {
            var data = db.Page<Bus>(page, limit, "WHERE (abs(Active) = 1) OR (abs(Active) = @0)", activeOnly);
            return data;
        }
    }
}