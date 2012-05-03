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
    }
}