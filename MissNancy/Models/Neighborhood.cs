using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MissNancy.Data;
using PetaPoco;

namespace MissNancy.Data
{
    public partial class Neighborhood : MissNancyDB.Record<Neighborhood>
    {
        private Database db;

        public Neighborhood()
        {
            db = MissNancyDB.GetInstance();
        }

        public IList<Neighborhood> Get(Boolean activeOnly)
        {
            var data = db.Query<Neighborhood>("SELECT * FROM tblNeighborhoods WHERE (abs(Active) = 1) OR (abs(Active) = @0) ORDER BY NeighborhoodDisplay", activeOnly).ToList();
            return data;
        }

        public Neighborhood GetById(string key)
        {
            return db.SingleOrDefault<Neighborhood>("SELECT * FROM tblNeighborhoods WHERE NeighborhoodKey = @0", key);
        }

        public Page<Neighborhood> GetPaged(string query, int page, int limit, Boolean activeOnly)
        {
            var sql = PetaPoco.Sql.Builder
                   .Append("WHERE (abs(Active) = 1) OR (abs(Active) = @0)", activeOnly)
                   .Append("ORDER BY NeighborhoodDisplay");

            if (query != null)
            {
                query += "%";
                sql = PetaPoco.Sql.Builder
                        .Append("WHERE ((abs(Active) = 1 OR abs(Active) = @0)", activeOnly)
                        .Append("AND (NeighborhoodDisplay like @0))", query)
                        .Append("ORDER BY NeighborhoodDisplay");
            }

            var data = db.Page<Neighborhood>(page, limit, sql);

            return data;
        }
    }
}