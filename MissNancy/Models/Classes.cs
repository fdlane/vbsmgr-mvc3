﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MissNancy.Data;
using PetaPoco;

namespace MissNancy.Data
{
    public partial class Classes : MissNancyDB.Record<Classes>
    {
        public static Page<Classes> GetPaged(int page, int limit, Boolean activeOnly)
        {

            var data = repo.Page<Classes>(page, limit, "WHERE (abs(Active) = 1) OR (abs(Active) = @0) ORDER BY ClassDisplay", activeOnly);
            return data;
        }

        // The display value of for the MasterTeacherKey
        [PetaPoco.ResultColumn]
        public string MasterTeacher
        {
            get
            {
                return repo.ExecuteScalar<string>("SELECT LastName + ', ' + FirstName FROM tblWorkers WHERE WorkerKey=@0", this.MasterTeacherKey);
            }
        }

        // The display value of for the LocationKey
        [PetaPoco.ResultColumn]
        public string Location
        {
            get
            {
                return repo.ExecuteScalar<string>("SELECT LocationDisplay FROM tblLocations WHERE LocationKey=@0", this.LocationKey);
            }
        }

        // The display value of for the AgeKey
        [PetaPoco.ResultColumn]
        public string Ages
        {
            get
            {
                return repo.ExecuteScalar<string>("SELECT Age FROM tblAges WHERE AgeKey=@0", this.AgeKey);
            }
        }

        // Primary phone for the Master Teacher of this Class
        [PetaPoco.ResultColumn]
        public string Phone
        {
            get
            {
                return repo.ExecuteScalar<string>("SELECT Phone FROM tblWorkers WHERE WorkerKey=@0", this.MasterTeacherKey);
            }
        }

        // the current number of children assigned to this class
        [PetaPoco.ResultColumn]
        public string Current
        {
            get
            {
                return repo.ExecuteScalar<string>("SELECT Count(tblChildren.ChildrenKey) FROM tblChildren GROUP BY ClassKey HAVING (((ClassKey)=@0));", this.ClassKey);
            }
        }

        [PetaPoco.ResultColumn]
        public IList<ClassWorkerDetail> ClassWorkerDetails { get; set; }

    }
}