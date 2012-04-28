using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MissNancy.Data;
using PetaPoco;

namespace MissNancy.Data
{
    public partial class Location : MissNancyDB.Record<Location>
    {  
        public static IList<Location> Get(Boolean activeOnly)
        {
            var data = repo.Query<Location>("WHERE (abs(Active) = 1) OR (abs(Active) = @0) ORDER BY LocationDisplay", activeOnly).ToList();
            return data;
        }
        public static Page<Location> GetPaged(int page, int limit, Boolean activeOnly)
        {
            var data = repo.Page<Location>(page, limit, "WHERE (abs(Active) = 1) OR (abs(Active) = @0) ORDER BY LocationDisplay", activeOnly);
            return data;
        }
    }
}