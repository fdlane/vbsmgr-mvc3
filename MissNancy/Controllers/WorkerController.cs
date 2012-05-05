using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MissNancy.Data;

namespace MissNancy.Controllers
{
    public class WorkerController : Controller
    {
        public JsonResult GetPaged(string query, int page, int limit, Boolean activeOnly)
        {
            var data = Worker.GetPaged(query, page, limit, activeOnly);

            return Json(new
            {
                total = data.TotalItems,
                data = data.Items,
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Create(List<Worker> data)
        {
            bool success = false;
            string message = "Create method failed";

            if (data != null)
            {
                using (var db = Worker.repo)
                {
                    foreach (var item in data)
                    {
                        item.CreateDate = DateTime.Now;
                        item.EditDate = DateTime.Now;
                        db.Save("tblWorkers", "WorkerKey", item);
                    }

                    success = true;
                    message = "Jesus Saves and so did this method";
                }
            }

            return Json(new
            {
                data,
                success,
                message
            });

        }

        [HttpPost]
        public JsonResult Update(IList<Worker> data)
        {
            bool success = false;
            string message = "no record found";
            if (data != null)
            {
                using (var db = Worker.repo)
                {
                    foreach (var item in data)
                    {
                        var rec = db.SingleOrDefault<Worker>("WHERE WorkerKey = @0", item.WorkerKey);

                        rec = item;
                        rec.EditDate = DateTime.Now;
                        db.Save("tblWorkers", "WorkerKey", rec);
                    }

                    success = true;
                    message = "Jesus Saves and so did this method";
                }
            }

            return Json(new
            {
                data,
                success,
                message
            });
        }

        public JsonResult Delete(IList<Worker> data)
        {
            bool success = false;
            string message = "Delete method failed";

            if (data != null)
            {
                using (var db = Worker.repo)
                {
                    foreach (var item in data)
                    {
                        // just doing a soft delete of these items
                        item.EditDate = DateTime.Now;
                        item.Active = false;
                        db.Save("tblWorkers", "WorkerKey", item);
                    }

                    success = true;
                    message = "Deleted successfully";
                }
            }

            return Json(new
            {
                success,
                message
            });
        }

        //The method was simply to split the old displayName into First/LastName
        public JsonResult tempSplitDisplayName()
        {
            bool success = false;
            string message = "no record found";

            using (var db = Worker.repo)
            {
                var workers = db.Fetch<Worker>("Select * from tblWorkers");

                foreach (var item in workers)
                {
                    var rec = db.SingleOrDefault<Worker>("WHERE WorkerKey = @0", item.WorkerKey);

                    // only edit this record if lastName is null
                    if (String.IsNullOrEmpty(rec.LastName))
                    {
                        string[] names;
                        string displayName = rec.DisplayName;

                        // if no space or comma, just use displayName as LastName
                        if ((displayName.IndexOf(' ') == -1) && (displayName.IndexOf(',') == -1))
                        {
                            rec.FirstName = "?";
                            rec.LastName = displayName;
                        }
                        else if (displayName.IndexOf(',') != -1) // has a comma
                        {
                            names = rec.DisplayName.Split(',');

                            rec.FirstName = names[1].Trim();
                            rec.LastName = names[0].Trim();
                        }
                        else if (displayName.IndexOf(' ') != -1) // has a space
                        {
                            names = rec.DisplayName.Split(' ');

                            //switch the order...the prob type fn then ln with space
                            rec.FirstName = names[1].Trim();
                            rec.LastName = names[0].Trim();
                        }

                        rec.EditDate = DateTime.Now;
                        rec.EditedBy = "fdlcode";

                        db.Save("tblWorkers", "WorkerKey", rec);
                    }
                }

                success = true;
                message = "Jesus Saves and so did this method";
            }

            return Json(new
            {
                Data = "",
                success = success,
                message = message
            });
        }

        //This temp method is to fuzz deprecated DisplayName field, so I make sure it is not being shown anywhere
        public JsonResult tempFuzzSplitDisplayName()
        {
            bool success = false;
            string message = "no record found";

            using (var db = Worker.repo)
            {
                var workers = db.Fetch<Worker>("Select * from tblWorkers");

                foreach (var item in workers)
                {
                    item.DisplayName = "zzz" + item.DisplayName;
                    item.EditDate = DateTime.Now;
                    item.EditedBy = "fdlfuzz";

                    db.Save("tblWorkers", "WorkerKey", item);                    
                }

                success = true;
                message = "Jesus Saves and so did this method";
            }

            return Json(new
            {
                Data = "",
                success = success,
                message = message
            });
        }
    }
}
