using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MissNancy.Data;
using PetaPoco;
using MissNancy.Models;

namespace MissNancy.Data
{
    public partial class Neighborhood : MissNancyDB.Record<Neighborhood>
    {
        public static IList<Neighborhood> Get(Boolean activeOnly)
        {
            var data = repo.Query<Neighborhood>("SELECT * FROM tblNeighborhoods WHERE (abs(Active) = 1) OR (abs(Active) = @0) ORDER BY NeighborhoodDisplay", activeOnly).ToList();
            return data;
        }

        public static Neighborhood GetById(string key)
        {
            return repo.SingleOrDefault<Neighborhood>("SELECT * FROM tblNeighborhoods WHERE NeighborhoodKey = @0", key);
        }

        public static Page<Neighborhood> GetPaged(string query, int page, int limit, Boolean activeOnly)
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

            var data = repo.Page<Neighborhood>(page, limit, sql);

            return data;
        }

        public static Page<Neighborhood> GetPaged(int page, int limit, List<ExtJsFilter> filters, Boolean activeOnly)
        {
            var sql = PetaPoco.Sql.Builder
                   .Append("WHERE (abs(Active) = 1) OR (abs(Active) = @0)", activeOnly)
                   .Append("ORDER BY NeighborhoodDisplay");

            if (filters.Count > 0)
            {
                sql = PetaPoco.Sql.Builder.Append("WHERE ((abs(Active) = 1 OR abs(Active) = @0)", activeOnly);

                foreach (var filter in filters)
                {
                    string criteria = String.Format("AND ({0} = @0))", filter.property);

                    sql.Append(criteria, Convert.ToInt16(filter.value));
                }

                sql.Append("ORDER BY NeighborhoodDisplay");
            }

            var data = repo.Page<Neighborhood>(page, limit, sql);

            return data;
        }

        // The display value of for the Type
        [PetaPoco.ResultColumn]
        public string TypeDisplay
        {
            get
            {
                var sql = PetaPoco.Sql.Builder
                    .Append("SELECT TypeDisplay FROM tblNeighborhoodTypes ")
                    .Append("WHERE NeighborhoodTypeKey=@0", this.NeighborhoodTypeKey);

                return repo.ExecuteScalar<string>(sql);
            }
        }

        // The display value of for the Route
        [PetaPoco.ResultColumn]
        public string RouteDisplay
        {
            get
            {
                var sql = PetaPoco.Sql.Builder
                    .Append("SELECT RouteDisplay FROM tblRoutes ")
                    .Append("WHERE RouteKey=@0", this.RouteKey);

                return repo.ExecuteScalar<string>(sql);
            }
        }

        // The display value of for the Bus
        [PetaPoco.ResultColumn]
        public string BusDisplay
        {
            get
            {
                var sql = PetaPoco.Sql.Builder
                    .Append("SELECT tblBuses.BusDisplay")
                    .Append("FROM tblNeighborhoods INNER JOIN")
                    .Append("tblRoutes ON tblNeighborhoods.RouteKey = tblRoutes.RouteKey INNER JOIN")
                    .Append("tblBuses ON tblRoutes.BusKey = tblBuses.BusKey")
                    .Append("WHERE tblRoutes.RouteKey = @0", this.RouteKey);

                return repo.ExecuteScalar<string>(sql);
            }
        }

        // the current number of children assigned to this Neighborhood
        [PetaPoco.ResultColumn]
        public string Current
        {
            get
            {
                var sql = PetaPoco.Sql.Builder
                    .Append("SELECT Count(tblChildren.ChildrenKey)")
                    .Append("FROM tblChildren")
                    .Append("WHERE tblChildren.Active Not Like 0")
                    .Append("AND tblChildren.NeighborhoodKey =@0", this.NeighborhoodKey)
                    .Append("GROUP BY tblChildren.NeighborhoodKey");

                return repo.ExecuteScalar<string>(sql);
            }
        }
    }
}