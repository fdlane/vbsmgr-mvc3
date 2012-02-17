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

        private Database db;

        public Children()
        {
            db = MissNancyDB.GetInstance();
        }

        public Page<Children> GetPaged(int page, int limit, Boolean activeOnly)
        {
            var data = db.Page<Children>(page, limit, "WHERE (abs(Active) = 1) OR (abs(Active) = @0)", activeOnly);
            return data;
        }
    }
}