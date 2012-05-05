using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MissNancy.Data;

namespace MissNancy.Data
{

    // TODO: Shouldn't this inherit from Worker and then no need for results columns below?
    public partial class ClassWorkerDetail : MissNancyDB.Record<ClassWorkerDetail>
    {
        public static IList<ClassWorkerDetail> GetWorkers(int classKey)
        {
            var sql = PetaPoco.Sql.Builder
                    .Append("SELECT tblClassWorkerDetails.ClassWorkerKey,")
                    .Append("tblClassWorkerDetails.ClassKey, tblClassWorkerDetails.WorkerKey,")
                    .Append("tblClassWorkerDetails.CreateDate, tblClassWorkerDetails.CreatedBy, ")
                    .Append("tblClassWorkerDetails.EditDate, tblClassWorkerDetails.EditedBy,")
                    .Append("tblWorkers.LastName, tblWorkers.FirstName, tblWorkers.Phone, tblWorkers.Mobile")
                    .Append("FROM tblClassWorkerDetails INNER JOIN tblWorkers ON")
                    .Append("tblClassWorkerDetails.WorkerKey = tblWorkers.WorkerKey")
                    .Append("WHERE tblClassWorkerDetails.ClassKey = @0", classKey)
                    .Append("ORDER BY tblWorkers.LastName, tblWorkers.FirstName");

            var data = repo.Query<ClassWorkerDetail>(sql).ToList();

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