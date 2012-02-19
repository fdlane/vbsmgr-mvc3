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
        private Database db;

        public Worker()
        {
            db = MissNancyDB.GetInstance();
        }

        public IList<Worker> Get(Boolean activeOnly)
        {
            var data = db.Query<Worker>("SELECT * FROM tblWorkers WHERE (abs(Active) = 1) OR (abs(Active) = @0) ORDER BY DisplayName", activeOnly).ToList();
            return data;
        }

        public Page<Worker> GetPaged(string query, int page, int limit, Boolean activeOnly)
        {
            var sql = PetaPoco.Sql.Builder
                   .Append("WHERE (abs(Active) = 1) OR (abs(Active) = @0)", activeOnly)
                   .Append("ORDER BY DisplayName");

            if (query != null)
            {
                query += "%";
                sql = PetaPoco.Sql.Builder
                        .Append("WHERE ((abs(Active) = 1 OR abs(Active) = @0)", activeOnly)
                        .Append("AND (DisplayName LIKE @0))", query)
                        .Append("ORDER BY DisplayName");
            }

            var data = db.Page<Worker>(page, limit, sql);

            return data;
        }
    }
}