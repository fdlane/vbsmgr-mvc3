using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MissNancy.Data;
using PetaPoco;

namespace MissNancy.Data
{
    public partial class NeighborhoodType : MissNancyDB.Record<NeighborhoodType>
    {
        public static IList<NeighborhoodType> Get(Boolean activeOnly)
        {
            var data = repo.Query<NeighborhoodType>("SELECT * FROM tblNeighborhoodTypes WHERE (abs(Active) = 1) OR (abs(Active) = @0) ORDER BY TypeDisplay", activeOnly).ToList();
            return data;
        }

        public static NeighborhoodType GetById(string key)
        {
            return repo.SingleOrDefault<NeighborhoodType>("SELECT * FROM tblNeighborhoodTypes WHERE NeighborhoodTypeKey = @0", key);
        }

        public static Page<NeighborhoodType> GetPaged(string query, int page, int limit, Boolean activeOnly)
        {
            var sql = PetaPoco.Sql.Builder
                   .Append("WHERE (abs(Active) = 1) OR (abs(Active) = @0)", activeOnly)
                   .Append("ORDER BY TypeDisplay");

            if (query != null)
            {
                query += "%";
                sql = PetaPoco.Sql.Builder
                        .Append("WHERE ((abs(Active) = 1 OR abs(Active) = @0)", activeOnly)
                        .Append("AND (TypeDisplay like @0))", query)
                        .Append("ORDER BY TypeDisplay");
            }

            var data = repo.Page<NeighborhoodType>(page, limit, sql);

            return data;
        }
    }
}