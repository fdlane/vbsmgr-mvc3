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

        // The display value of for the Type
        [PetaPoco.ResultColumn]
        public string TypeDisplay
        {
            get
            {
                var sql = PetaPoco.Sql.Builder
                    .Append("SELECT TypeDisplay FROM tblNeighborhoodTypes ")
                    .Append("WHERE NeighborhoodTypeKey=@0", this.NeighborhoodTypeKey);

                return db.ExecuteScalar<string>(sql);
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

                return db.ExecuteScalar<string>(sql);
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

                return db.ExecuteScalar<string>(sql);
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

                return db.ExecuteScalar<string>(sql);
            }
        }
    }
}