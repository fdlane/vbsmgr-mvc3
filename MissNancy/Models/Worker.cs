using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MissNancy.Data;
using PetaPoco;

namespace MissNancy.Data
{
    public partial class Worker : MissNancyDB.Record<Worker>
    {
        public static IList<Worker> Get(Boolean activeOnly)
        {
            var data = repo.Query<Worker>("SELECT * FROM tblWorkers WHERE (abs(Active) = 1) OR (abs(Active) = @0) ORDER BY LastName, FirstName", activeOnly).ToList();
            return data;
        }

        public static Page<Worker> GetPaged(string query, int page, int limit, Boolean activeOnly)
        {
            var sql = PetaPoco.Sql.Builder
                   .Append("WHERE (abs(Active) = 1) OR (abs(Active) = @0)", activeOnly);
            if (query != null)
            {
                query += "%";
                sql = PetaPoco.Sql.Builder
                        .Append("WHERE ((abs(Active) = 1 OR abs(Active) = @0)", activeOnly)
                        .Append("AND (LastName LIKE @0))", query);
            }

            sql.Append("ORDER BY LastName, FirstName");

            var data = repo.Page<Worker>(page, limit, sql);

            return data;
        }

        [PetaPoco.ResultColumn]
        public string WorkerDisplayName
        {
            get
            {
                return this.LastName + ", " + this.FirstName;
            }
        }

        [PetaPoco.ResultColumn]
        public string WorkerTypeDisplay
        {
            get
            {
                return repo.ExecuteScalar<string>("SELECT WorkerTypeDisplay FROM tblWorkerTypes WHERE WorkerTypeKey=@0", this.WorkerTypeKey);
            }
        }
    }
}