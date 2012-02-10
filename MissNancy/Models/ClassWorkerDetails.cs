using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MissNancy.Data;

namespace MissNancy.Data
{
    public partial class ClassWorkerDetail : MissNancyDB.Record<ClassWorkerDetail>
    {
        // The Worker's Name
        [PetaPoco.ResultColumn]
        public string DisplayName { get; set; }
       
        // The Worker's Phone
        [PetaPoco.ResultColumn]
        public string Phone { get; set; }

        // The Worker's Mobile 
        [PetaPoco.ResultColumn]
        public string Mobile { get; set; }

    }
}