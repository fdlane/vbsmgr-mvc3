using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MissNancy.Data;
using PetaPoco;

namespace MissNancy.Data
{
    public partial class Children : MissNancyDB.Record<Children>
    {
        public static Page<Children> GetPaged(int page, int limit, Boolean activeOnly)
        {
            var data = repo.Page<Children>(page, limit, "WHERE (abs(Active) = 1) OR (abs(Active) = @0) ORDER BY LastName, FirstName", activeOnly);
            return data;
        }

        [PetaPoco.ResultColumn]
        public string ClassDisplay
        {
            get
            {
                var sql = PetaPoco.Sql.Builder
                    .Append("SELECT ClassDisplay FROM tblClasses ")
                    .Append("WHERE ClassKey=@0", this.ClassKey);

                return repo.ExecuteScalar<string>(sql);
            }
        }

        [PetaPoco.ResultColumn]
        public string RouteDisplay
        {
            get
            {
                var sql = PetaPoco.Sql.Builder
                    .Append("SELECT tblRoutes.RouteDisplay")
                    .Append("FROM tblRoutes INNER JOIN")
                    .Append("tblNeighborhoods ON tblRoutes.RouteKey = tblNeighborhoods.RouteKey ")
                    .Append("WHERE tblNeighborhoods.NeighborhoodKey = @0", this.NeighborhoodKey);

                return repo.ExecuteScalar<string>(sql);
            }
        }
    }
}