using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MissNancy.Data;
using PetaPoco;

namespace MissNancy.Data
{
    public partial class WorkerType : MissNancyDB.Record<WorkerType>
    {
        public static IList<WorkerType> Get(Boolean activeOnly)
        {
            var data = repo.Query<WorkerType>("WHERE (abs(Active) = 1) OR (abs(Active) = @0) ORDER BY WorkerTypeDisplay", activeOnly).ToList();
            return data;
        }
        public static Page<WorkerType> GetPaged(int page, int limit, Boolean activeOnly)
        {
            var data = repo.Page<WorkerType>(page, limit, "WHERE (abs(Active) = 1) OR (abs(Active) = @0) ORDER BY WorkerTypeDisplay", activeOnly);
            return data;
        }
    }
}