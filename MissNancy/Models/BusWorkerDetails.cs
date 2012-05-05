using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MissNancy.Data;

namespace MissNancy.Data
{
    public partial class BusWorkerDetail : MissNancyDB.Record<BusWorkerDetail>
    {
        public static IList<BusWorkerDetail> GetWorkers(int busKey)
        {
            var sql = PetaPoco.Sql.Builder
                    .Append("SELECT tblBusWorkerDetails.BusWorkerKey,")
                    .Append("tblBusWorkerDetails.BusKey, tblBusWorkerDetails.WorkerKey,")
                    .Append("tblBusWorkerDetails.CreateDate, tblBusWorkerDetails.CreatedBy, ")
                    .Append("tblBusWorkerDetails.EditDate, tblBusWorkerDetails.EditedBy,")
                    .Append("tblWorkers.LastName, tblWorkers.FirstName, tblWorkers.Phone, tblWorkers.Mobile")
                    .Append("FROM tblBusWorkerDetails INNER JOIN tblWorkers ON ")
                    .Append("tblBusWorkerDetails.WorkerKey = tblWorkers.WorkerKey")
                    .Append("WHERE tblBusWorkerDetails.BusKey = @0", busKey)
                    .Append("ORDER BY tblWorkers.LastName, tblWorkers.FirstName");

            var data = repo.Query<BusWorkerDetail>(sql).ToList();

            return data;
        }

        // The Worker's Name
        [PetaPoco.ResultColumn]
        public string WorkerDisplayName
        {
            get
            {
                return this.LastName + ", " + this.FirstName;
            }
        }

        [PetaPoco.ResultColumn]
        public string FirstName { get; set; }

        [PetaPoco.ResultColumn]
        public string LastName { get; set; }


        // The Worker's Phone
        [PetaPoco.ResultColumn]
        public string Phone { get; set; }

        // The Worker's Mobile 
        [PetaPoco.ResultColumn]
        public string Mobile { get; set; }

    }
}