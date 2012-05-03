using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MissNancy.Data;

namespace MissNancy.Data
{
    public partial class ClassWorkerDetail : MissNancyDB.Record<ClassWorkerDetail>
    {
        public static IList<ClassWorkerDetail> GetWorkers(int classKey)
        {
            var sql = PetaPoco.Sql.Builder
                    .Append("SELECT tblClassWorkerDetails.ClassWorkerKey,")
                    .Append("tblClassWorkerDetails.ClassKey, tblClassWorkerDetails.WorkerKey,")
                    .Append("tblClassWorkerDetails.CreateDate, tblClassWorkerDetails.CreatedBy, ")
                    .Append("tblClassWorkerDetails.EditDate, tblClassWorkerDetails.EditedBy,")
                    .Append("tblWorkers.DisplayName, tblWorkers.Phone, tblWorkers.Mobile")
                    .Append("FROM tblClassWorkerDetails INNER JOIN tblWorkers ON")
                    .Append("tblClassWorkerDetails.WorkerKey = tblWorkers.WorkerKey")
                    .Append("WHERE tblClassWorkerDetails.ClassKey = @0", classKey)
                    .Append("ORDER BY tblWorkers.DisplayName");

            var data = repo.Query<ClassWorkerDetail>(sql).ToList();

            return data;
        }

        // The Worker's Name
        [PetaPoco.ResultColumn]
        public string DisplayName { get; set; }

        // The Worker's Phone
        [PetaPoco.ResultColumn]
        public string Phone { get; set; }

        // The Worker's Mobile 
        [PetaPoco.ResultColumn]
        public string Mobile { get; set; }

    }
}