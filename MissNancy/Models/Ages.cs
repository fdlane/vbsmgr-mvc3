using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MissNancy.Data;
using PetaPoco;

namespace MissNancy.Data
{
    public partial class Ages : MissNancyDB.Record<Ages>
    {
        private Database db;

        public Ages()
        {
            db = MissNancyDB.GetInstance();
        }

        public IList<Ages> Get(Boolean activeOnly)
        {
            var data = db.Query<Ages>("WHERE (abs(Active) = 1) OR (abs(Active) = @0) ORDER BY Age", activeOnly).ToList();
            return data;
        }
        public Page<Ages> GetPaged(int page, int limit, Boolean activeOnly)
        {

            var data = db.Page<Ages>(page, limit, "WHERE (abs(Active) = 1) OR (abs(Active) = @0) ORDER BY Age", activeOnly);
            return data;
        }
    }
}